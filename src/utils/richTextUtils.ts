/**
 * Rich Text Utilities
 * Handles parsing, rendering, and manipulating text with formatting.
 */

/**
 * Main interface for rich text content
 */
export interface RichTextContent {
    text: string;
    formatting: Array<TextFormatting>;
    alignment: "left" | "center" | "right";
}

/**
 * Text formatting interface - defines a single formatting operation
 */
export interface TextFormatting {
    type: "bold" | "italic" | "underline" | "highlight";
    start: number;
    end: number;
    color?: string; // Primarily for highlight
}

/**
 * Default rich text content
 */
export const DEFAULT_RICH_TEXT: RichTextContent = {
    text: "",
    formatting: [],
    alignment: "left"
};

/**
 * Validate a formatting object
 * @param format The formatting object to validate
 * @returns True if valid, false otherwise
 */
function isValidFormatting(format: any): boolean {
    return (
        format &&
        typeof format === "object" &&
        typeof format.type === "string" &&
        ["bold", "italic", "underline", "highlight"].includes(format.type) &&
        typeof format.start === "number" &&
        typeof format.end === "number" &&
        format.start >= 0 &&
        format.end > format.start && // End must be strictly greater than start
        // Optionally check for color property if type is highlight
        (format.type !== "highlight" || typeof format.color === "string" || typeof format.color === "undefined")
    );
}

/**
 * Validate an alignment value
 * @param alignment The alignment to validate
 * @returns True if valid, false otherwise
 */
function isValidAlignment(alignment: any): boolean {
    return typeof alignment === "string" && ["left", "center", "right"].includes(alignment);
}


/**
 * Parse a string into rich text content
 * @param value The string to parse, potentially containing JSON
 * @returns A RichTextContent object
 */
export function parseRichText(value: string): RichTextContent {
    if (!value || typeof value !== 'string') return { ...DEFAULT_RICH_TEXT };

    try {
        // Check if it looks like a JSON object representing our rich text structure
        if (value.trim().startsWith('{') && value.trim().endsWith('}')) {
            const parsed = JSON.parse(value);

            // Validate the parsed object has the expected structure
            if (parsed && parsed.text !== undefined && Array.isArray(parsed.formatting)) {
                return {
                    text: typeof parsed.text === 'string' ? parsed.text : '', // Ensure text is a string
                    formatting: parsed.formatting.filter(isValidFormatting), // Filter out invalid formats
                    alignment: isValidAlignment(parsed.alignment) ? parsed.alignment : "left" // Validate alignment
                };
            }
        }

        // If it's not valid rich text JSON, treat it as plain text
        return {
            text: value,
            formatting: [],
            alignment: "left"
        };
    } catch (error) {
        // console.error("Error parsing rich text, treating as plain text:", error);
        // Return the original string as plain text on parsing error
        return {
            text: value,
            formatting: [],
            alignment: "left"
        };
    }
}


/**
 * Escape HTML special characters to prevent XSS
 * @param text The text to escape
 * @returns Escaped text
 */
function escapeHtml(text: string): string {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, "&amp;")   // Must be first
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Interface for processed text segments used in rendering
 */
interface TextSegment {
    text: string;
    formats: Set<string>; // Set of format types ('bold', 'italic', etc.)
    highlightColor?: string;
}

/**
 * Creates processed text segments from RichTextContent.
 * This function handles splitting the text based on overlapping formatting rules.
 * @param content RichTextContent object
 * @returns Array of TextSegment
 */
function createTextSegments(content: RichTextContent): TextSegment[] {
    if (!content || !content.text) return [];

    // Escape the raw text first for safety
    let safeText = escapeHtml(content.text);
    const textLength = safeText.length;

    // Start with the entire text as one segment with no formats
    let segments: TextSegment[] = [{ text: safeText, formats: new Set<string>() }];

    // Filter and sort formatting rules: by start position, then by end position descending (longer formats first)
    const sortedFormats = content.formatting
        .filter(fmt => isValidFormatting(fmt) && fmt.start < textLength && fmt.end <= textLength) // Filter invalid/out-of-bounds formats
        .sort((a, b) => {
            if (a.start !== b.start) {
                return a.start - b.start;
            }
            return b.end - a.end; // Apply longer formats first if they start at the same position
        });

    // Process each format rule
    for (const fmt of sortedFormats) {
        let currentTextPos = 0; // Track position in the original string across segments
        const nextSegments: TextSegment[] = []; // Build the next state of segments

        for (const currentSegment of segments) {
            const segmentStart = currentTextPos;
            const segmentEnd = segmentStart + currentSegment.text.length;
            currentTextPos = segmentEnd; // Move position marker

            // Calculate overlap range between the current format and segment
            const overlapStart = Math.max(segmentStart, fmt.start);
            const overlapEnd = Math.min(segmentEnd, fmt.end);

            // If there's no overlap, keep the segment as is
            if (overlapStart >= overlapEnd) {
                nextSegments.push(currentSegment);
                continue;
            }

            // If there's overlap, we might need to split the segment

            // 1. Part of the segment BEFORE the overlap
            if (overlapStart > segmentStart) {
                nextSegments.push({
                    text: currentSegment.text.substring(0, overlapStart - segmentStart),
                    formats: currentSegment.formats, // Inherit existing formats
                    highlightColor: currentSegment.highlightColor,
                });
            }

            // 2. The OVERLAPPING part of the segment
            const newFormats = new Set(currentSegment.formats);
            newFormats.add(fmt.type); // Add the new format type
            nextSegments.push({
                text: currentSegment.text.substring(overlapStart - segmentStart, overlapEnd - segmentStart),
                formats: newFormats,
                // Apply highlight color if this is a highlight format, otherwise inherit
                highlightColor: fmt.type === 'highlight' ? (fmt.color || '#FFF176') : currentSegment.highlightColor,
            });

            // 3. Part of the segment AFTER the overlap
            if (overlapEnd < segmentEnd) {
                nextSegments.push({
                    text: currentSegment.text.substring(overlapEnd - segmentStart),
                    formats: currentSegment.formats, // Inherit existing formats (without the new one)
                    highlightColor: currentSegment.highlightColor,
                });
            }
        }
        // Update segments for the next formatting rule iteration
        segments = nextSegments.filter(s => s.text.length > 0); // Remove empty segments
    }

    return segments;
}


/**
 * Render rich text content to HTML using Tailwind CSS classes.
 * Suitable for environments where Tailwind is loaded (like the Shadow DOM UI).
 * @param content The rich text content to render
 * @returns HTML string with Tailwind classes
 */
export function renderRichTextToHtml(content: RichTextContent): string {
    const segments = createTextSegments(content);
    if (!segments.length) return escapeHtml(content?.text || ""); // Return escaped plain text if no segments

    let html = segments.map(segment => {
        let segmentHtml = segment.text; // Already escaped text
        let classes: string[] = [];
        let styles: string[] = []; // Keep styles minimal for class-based rendering

        // Apply formatting classes/styles
        if (segment.formats.has('bold')) { classes.push('font-bold'); }
        if (segment.formats.has('italic')) { classes.push('italic'); }
        if (segment.formats.has('underline')) { classes.push('underline'); }
        if (segment.formats.has('highlight')) {
            classes.push('px-0.5', 'rounded'); // Basic styling classes
            styles.push(`background-color: ${segment.highlightColor || '#FFF176'}`); // Inline style for color
        }

        // Wrap in span only if needed
        if (classes.length > 0 || styles.length > 0) {
            const classAttr = classes.length > 0 ? ` class="${classes.join(' ')}"` : "";
            const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : "";
            segmentHtml = `<span${classAttr}${styleAttr}>${segmentHtml}</span>`;
        }

        return segmentHtml;
    }).join('');

    // Apply alignment wrapper using classes if needed
    if (content.alignment && content.alignment !== "left") {
        html = `<div class="text-${content.alignment} w-full">${html}</div>`; // Added w-full for block behavior
    }

    return html;
}


/**
 * Render rich text content to HTML using INLINE STYLES only.
 * Suitable for injecting into external elements (like the LinkedIn banner).
 * @param content The rich text content to render
 * @returns HTML string with inline styles
 */
export function renderRichTextToInlineStyleHtml(content: RichTextContent): string {
    const segments = createTextSegments(content);
    if (!segments.length) return escapeHtml(content?.text || ""); // Return escaped plain text if no segments

    let html = segments.map(segment => {
        let segmentHtml = segment.text; // Already escaped text
        let styles: string[] = [];

        // Apply formatting styles
        if (segment.formats.has('bold')) { styles.push('font-weight: bold'); }
        if (segment.formats.has('italic')) { styles.push('font-style: italic'); }
        if (segment.formats.has('underline')) { styles.push('text-decoration: underline'); }
        if (segment.formats.has('highlight')) {
            styles.push(`background-color: ${segment.highlightColor || '#FFF176'}`);
            // Add padding for visual appearance of highlight
            styles.push('padding-left: 0.125rem');
            styles.push('padding-right: 0.125rem');
            styles.push('border-radius: 0.25rem'); // Optional rounding
            // Ensure inline display for span highlights unless they are the only content
            styles.push('display: inline');
        }

        // Wrap in span if there are styles
        if (styles.length > 0) {
            // Check if the segment contains only whitespace, spans might collapse it undesirably
            if (segmentHtml.trim().length > 0) {
                segmentHtml = `<span style="${styles.join('; ')}">${segmentHtml}</span>`;
            }
            // If it's just whitespace, don't wrap it, or handle differently if needed
            // else { segmentHtml = segmentHtml; } // Keep whitespace as is
        }

        return segmentHtml;
    }).join('');

    // Apply alignment wrapper using inline style if needed
    if (content.alignment && content.alignment !== "left") {
        html = `<div style="text-align: ${content.alignment}; width: 100%;">${html}</div>`;
    }

    return html;
}

/**
 * Render rich text content for use with React's dangerouslySetInnerHTML.
 * Uses the class-based rendering intended for the sidebar UI.
 * @param content The rich text content object or string to render
 * @returns An object { __html: string }
 */
export function renderForReact(content: RichTextContent | string): { __html: string } {
    const richContent = typeof content === "string" ? parseRichText(content) : content;
    // Ensure richContent is valid before rendering
    if (!richContent || typeof richContent.text === 'undefined') {
        return { __html: '' };
    }
    return { __html: renderRichTextToHtml(richContent) };
}

/**
 * Apply formatting to a range in rich text content. Toggles if exact format exists.
 * @param content The rich text content to modify
 * @param type The formatting type to apply
 * @param start The start index (inclusive)
 * @param end The end index (exclusive)
 * @param color Optional color for highlight formatting
 * @returns Updated rich text content
 */
export function applyFormatting(
    content: RichTextContent,
    type: "bold" | "italic" | "underline" | "highlight",
    start: number,
    end: number,
    color?: string
): RichTextContent {
    if (start >= end || start < 0 || end > content.text.length) {
        console.warn("Invalid range for applying formatting:", { start, end, textLength: content.text.length });
        return content; // Invalid range
    }

    // Check if this exact formatting already exists
    const existingIndex = content.formatting.findIndex(
        (format) =>
            format.type === type &&
            format.start === start &&
            format.end === end
    );

    let newFormatting: TextFormatting[];

    if (existingIndex >= 0) {
        // Remove existing formatting (toggle off)
        newFormatting = content.formatting.filter((_, i) => i !== existingIndex);
    } else {
        // Remove any *conflicting* formats of the same type within the range first
        // Example: If applying bold 5-10, remove existing bold 6-8 or 4-12 that overlaps
        const conflictingFormats = content.formatting.filter(format =>
            format.type === type &&
            Math.max(format.start, start) < Math.min(format.end, end)
        );

        // Filter out the conflicting ones before adding the new one
        let baseFormatting = content.formatting.filter(format => !conflictingFormats.includes(format));


        // Add new formatting entry
        const newFormat: TextFormatting = {
            type,
            start,
            end,
            ...(type === "highlight" && color ? { color } : {})
        };
        // Ensure the new format itself is valid before adding
        if (!isValidFormatting(newFormat)) {
            console.warn("Attempted to add invalid format:", newFormat);
            return { ...content, formatting: baseFormatting }; // Return with only conflicting removed
        }

        newFormatting = [...baseFormatting, newFormat];
    }

    // Optional: Clean up/merge overlapping/adjacent formats of the same type here
    // For simplicity, this is omitted, but could be added for cleaner state.

    return {
        ...content,
        formatting: newFormatting
    };
}

/**
 * Set alignment for rich text content
 * @param content The rich text content to modify
 * @param alignment The new alignment
 * @returns Updated rich text content
 */
export function setAlignment(
    content: RichTextContent,
    alignment: "left" | "center" | "right"
): RichTextContent {
    if (!isValidAlignment(alignment)) return content;
    return {
        ...content,
        alignment
    };
}

/**
 * Clear all formatting from rich text content
 * @param content The rich text content to modify
 * @param keepAlignment Whether to preserve the existing alignment (default: true)
 * @returns Updated rich text content
 */
export function clearFormatting(
    content: RichTextContent,
    keepAlignment = true
): RichTextContent {
    return {
        ...content,
        formatting: [],
        alignment: keepAlignment ? content.alignment : "left" // Reset or keep alignment
    };
}

/**
 * Update text content while attempting to preserve compatible formatting.
 * Removes formatting that becomes invalid due to text length changes.
 * @param content The rich text content to modify
 * @param newText The new text content
 * @returns Updated rich text content
 */
export function updateText(
    content: RichTextContent,
    newText: string
): RichTextContent {
    const newLength = newText.length;

    // Filter out formatting rules that are no longer valid with the new text length
    const validFormatting = content.formatting.filter(
        format => format.start < newLength && format.end <= newLength && format.start < format.end
    );

    // Potential future enhancement: Adjust formatting indices if text is inserted/deleted within formatted ranges.
    // This basic version just removes invalid formats.

    return {
        ...content,
        text: newText,
        formatting: validFormatting
        // Alignment is preserved
    };
}