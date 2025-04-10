/* eslint-disable @typescript-eslint/no-explicit-any */
// Banner components for content script
// These components directly manipulate the DOM of the LinkedIn banner element

import { parseRichText, renderRichTextToInlineStyleHtml } from "../utils/richTextUtils"; // USE INLINE STYLE RENDERER

/**
 * Interface for props passed to banner component constructors or update methods
 */
export interface BannerComponentProps {
    parent: HTMLElement;
    state: any; // Represents the current editor state slice
}

/**
 * Interface for a component instance that manipulates the banner DOM
 */
export interface BannerComponent {
    element: HTMLElement; // The DOM element managed by this component
    update: (state: any) => void; // Function to update the element based on state
    unmount: () => void; // Function to clean up the element
}

// Helper to check if a color is light or dark for determining text shadow contrast
function isColorLight(color: string): boolean {
    if (!color || typeof color !== 'string') return false; // Default to not light

    try {
        let r: number, g: number, b: number;
        // Handle HEX colors (# RRGGBB or # RGB)
        if (color.startsWith('#')) {
            let hex = color.substring(1);
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) return false; // Invalid hex length
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        // Handle RGB/RGBA colors (ignore alpha)
        else if (color.startsWith('rgb')) {
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!match) return false;
            r = parseInt(match[1], 10);
            g = parseInt(match[2], 10);
            b = parseInt(match[3], 10);
        }
        // Handle HSL/HSLA (approximation - convert to RGB or use luminance formula)
        // Simple check: if L is high, assume light (this is very basic)
        else if (color.startsWith('hsl')) {
            const match = color.match(/hsla?\([^,]+,\s*[^,]+%?,\s*([\d.]+)%?/);
            if (match && parseFloat(match[1]) > 65) return true; // Arbitrary threshold for lightness
            return false; // Default to dark if HSL parsing fails or L is low/mid
        }
        else {
            // Unsupported color format (e.g., named colors 'red', 'blue')
            // We could add a lookup table, but defaulting to dark is safer for visibility.
            return false;
        }

        // Check for NaN values after parsing
        if (isNaN(r) || isNaN(g) || isNaN(b)) return false;

        // Calculate relative luminance (standard formula)
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        // console.log(`Color: ${color}, Luminance: ${luminance}`); // Debugging
        return luminance > 0.5; // Threshold for light color (adjust 0.5 as needed)
    } catch (e) {
        console.error("Error parsing color:", color, e);
        return false; // Default to not light on error
    }
}


/**
 * Base class for all banner components manipulating the DOM
 */
export abstract class BaseBannerComponent implements BannerComponent {
    element: HTMLElement;

    constructor(public parent: HTMLElement) {
        // Each subclass will create its specific element type
        this.element = document.createElement('div'); // Default, override in subclass
        // Append logic moved to subclasses to control order/placement
    }

    // Abstract update method to be implemented by subclasses
    abstract update(state: any): void;

    // Default unmount implementation
    unmount(): void {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        // Subclasses might need to override if they create multiple elements or listeners
    }

    /**
     * Calculates an appropriate text shadow based on the text color for better contrast.
     * @param textColor The CSS color string of the text.
     * @returns A CSS text-shadow string or an empty string.
     */
    protected getTextShadow(textColor: string): string {
        if (isColorLight(textColor)) {
            // Light text, use a dark shadow
            return "0 1px 3px rgba(0, 0, 0, 0.6)"; // Slightly stronger dark shadow
        } else {
            // Dark text, use a very subtle light shadow (optional)
            return "0 1px 1px rgba(255, 255, 255, 0.25)";
            // Or return "" if no shadow is desired for dark text:
            // return "";
        }
    }
}

/**
 * Banner Container Component: The main flex container holding profile image and content block.
 */
export class BannerContainer extends BaseBannerComponent {
    constructor(parent: HTMLElement) {
        super(parent);
        this.element = document.createElement('div');
        this.element.className = "instantbranding-elements-container"; // For potential targeting
        this.element.style.display = "flex";
        this.element.style.alignItems = "center"; // Default alignment
        this.element.style.justifyContent = "center"; // Default justification
        this.element.style.width = "100%";
        this.element.style.height = "100%"; // Take full height of parent
        this.element.style.padding = "0 20px"; // Add some horizontal padding
        this.element.style.boxSizing = "border-box";
        this.element.style.maxWidth = "1200px"; // Max width for content
        this.element.style.margin = "0 auto"; // Center container
        this.element.style.position = "relative"; // For z-index stacking
        this.element.style.zIndex = "2"; // Above overlay
        this.element.style.transition = "all 0.3s ease";

        // Clear parent and append this container
        // parent.innerHTML = ''; // Clear existing content - moved to BannerManager.setup
        parent.appendChild(this.element);
    }

    update(state: any): void {
        // Update flex direction based on profile image position
        if (state.profileImage && state.profileImage.position !== "center") {
            this.element.style.flexDirection = "row";
            this.element.style.justifyContent = "space-between"; // Space out image and text
        } else {
            this.element.style.flexDirection = "column";
            this.element.style.justifyContent = "center"; // Center vertically
        }
        // Potentially adjust padding or alignment further based on state if needed
    }
}

/**
 * Content Container Component: Holds the text elements (Title, Content, CTA).
 */
export class ContentContainer extends BaseBannerComponent {
    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";
        this.element.style.alignItems = "center"; // Default alignment for text blocks
        this.element.style.justifyContent = "center";
        this.element.style.width = "100%"; // Default width
        // this.element.style.maxWidth = "900px"; // Max width for text readability
        this.element.style.textAlign = "center"; // Default text alignment
        this.element.style.transition = "all 0.3s ease";
        this.element.style.boxSizing = "border-box";
        this.element.style.padding = "0 15px"; // Padding within the content block

        parent.appendChild(this.element);
    }

    update(state: any): void {
        // Adjust width and alignment if profile image is positioned left/right
        if (state.profileImage && state.profileImage.position !== "center") {
            // Calculate width dynamically, e.g., 70% or based on image size?
            // For simplicity, let's assume image takes roughly 25-30%
            this.element.style.width = "70%";
            // Align text block based on image position
            this.element.style.alignItems = state.profileImage.position === 'left' ? 'flex-start' : 'flex-end';
            this.element.style.textAlign = state.profileImage.position === 'left' ? 'left' : 'right';

        } else {
            // Full width and centered when image is centered or absent
            this.element.style.width = "100%";
            this.element.style.alignItems = "center";
            this.element.style.textAlign = "center"; // Reset to center
        }

        // Specific alignments for individual elements (title, content, cta) are handled
        // within their respective update methods and the rich text renderer.
        // This container sets the overall block alignment.
    }
}

/**
 * Title component - Renders the main title text.
 */
export class TitleComponent extends BaseBannerComponent {
    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div'); // Use a div to contain the rich text
        this.element.id = id;
        this.element.className = "instantbranding-element instantbranding-title"; // Add specific class
        // Base styles (can be overridden by rich text)
        this.element.style.fontSize = "clamp(1.8rem, 4vw, 2.8rem)"; // Responsive font size
        this.element.style.fontWeight = "bold";
        this.element.style.margin = "0 0 10px 0"; // Reduced margin
        this.element.style.width = "100%";
        this.element.style.lineHeight = "1.25"; // Tighter line height for titles
        this.element.style.wordWrap = "break-word";
        this.element.style.overflowWrap = "break-word";
        this.element.style.transition = "color 0.3s ease, text-shadow 0.3s ease"; // Transition color/shadow

        parent.appendChild(this.element);
    }

    update(state: any): void {
        try {
            const titleData = parseRichText(state.title || "Your Title");
            // Render using INLINE STYLES for compatibility with external DOM
            this.element.innerHTML = renderRichTextToInlineStyleHtml(titleData);

            // Apply overall text color and calculated shadow directly to the container element
            this.element.style.color = state.bannerStyle.titleColor;
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.titleColor);

            // NOTE: Alignment (left/center/right) is now primarily handled *inside*
            // renderRichTextToInlineStyleHtml by adding a wrapper div if alignment is not 'left'.
            // We ensure the outer container respects this.
            // We could force the outer alignment, but letting the inner div handle it is cleaner.
            this.element.style.textAlign = ''; // Let inner content dictate alignment


        } catch (e) {
            console.error("Error updating title:", e);
            // Fallback to plain text
            this.element.textContent = state.title || "Your Title";
            this.element.style.color = state.bannerStyle.titleColor;
            this.element.style.textAlign = state.bannerStyle.titleAlign; // Apply state alignment as fallback
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.titleColor);
        }
    }
}

/**
 * Content component - Renders the description/body text.
 */
export class ContentComponent extends BaseBannerComponent {
    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = "instantbranding-element instantbranding-content";
        this.element.style.fontSize = "clamp(1rem, 2.5vw, 1.5rem)"; // Responsive font size
        this.element.style.lineHeight = "1.5";
        this.element.style.margin = "0 0 12px 0"; // Adjusted margin
        this.element.style.width = "100%";
        this.element.style.wordWrap = "break-word";
        this.element.style.overflowWrap = "break-word";
        this.element.style.transition = "color 0.3s ease, text-shadow 0.3s ease";

        parent.appendChild(this.element);
    }

    update(state: any): void {
        // Hide element if content is empty
        this.element.style.display = state.otherContent ? "block" : "none";
        if (!state.otherContent) return;

        try {
            const contentData = parseRichText(state.otherContent);
            // Render using INLINE STYLES
            this.element.innerHTML = renderRichTextToInlineStyleHtml(contentData);

            // Apply overall color and shadow
            this.element.style.color = state.bannerStyle.contentColor;
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.contentColor);

            // Let inner content dictate alignment
            this.element.style.textAlign = '';


        } catch (e) {
            console.error("Error updating content:", e);
            // Fallback
            this.element.textContent = state.otherContent || "";
            this.element.style.color = state.bannerStyle.contentColor;
            this.element.style.textAlign = state.bannerStyle.contentAlign; // Fallback alignment
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.contentColor);
        }
    }
}

/**
 * CTA component - Renders the call to action text.
 */
export class CTAComponent extends BaseBannerComponent {
    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = "instantbranding-element instantbranding-cta";
        this.element.style.fontSize = "clamp(0.9rem, 2vw, 1.25rem)"; // Responsive font size
        this.element.style.margin = "8px 0 0 0"; // Margin top
        this.element.style.width = "100%";
        // Text decoration is handled by rich text (underline format)
        this.element.style.wordWrap = "break-word";
        this.element.style.overflowWrap = "break-word";
        this.element.style.transition = "color 0.3s ease, text-shadow 0.3s ease";

        parent.appendChild(this.element);
    }

    update(state: any): void {
        // Hide element if CTA text is empty
        this.element.style.display = state.ctaWebsite ? "block" : "none";
        if (!state.ctaWebsite) return;

        try {
            const ctaData = parseRichText(state.ctaWebsite);
            // Render using INLINE STYLES
            this.element.innerHTML = renderRichTextToInlineStyleHtml(ctaData);

            // Apply overall color and shadow
            this.element.style.color = state.bannerStyle.ctaColor;
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.ctaColor);

            // Let inner content dictate alignment
            this.element.style.textAlign = '';

            // Ensure it's clickable (consider adding an actual link if appropriate)
            this.element.style.cursor = "pointer"; // Indicate interactivity

        } catch (e) {
            console.error("Error updating CTA:", e);
            // Fallback
            this.element.textContent = state.ctaWebsite || "";
            this.element.style.color = state.bannerStyle.ctaColor;
            this.element.style.textAlign = state.bannerStyle.ctaAlign; // Fallback alignment
            this.element.style.textShadow = this.getTextShadow(state.bannerStyle.ctaColor);
            this.element.style.textDecoration = "underline"; // Fallback underline
            this.element.style.cursor = "pointer";
        }
    }
}


/**
 * Profile image component - Renders the user's profile picture overlay.
 */
export class ProfileImageComponent extends BaseBannerComponent {
    private imageElement: HTMLImageElement | null = null;

    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = "instantbranding-element instantbranding-profile-image-container";
        // Styles for the container div
        this.element.style.transition = "all 0.3s ease";
        this.element.style.flexShrink = "0"; // Prevent image container from shrinking excessively
        this.element.style.display = "none"; // Initially hidden

        parent.appendChild(this.element); // Append container to parent
    }

    update(state: any): void {
        if (!state.profileImage || !state.profileImage.src) {
            this.element.style.display = "none";
            if (this.imageElement) {
                this.imageElement.style.display = "none"; // Hide image element too
            }
            return;
        }

        // Make container visible
        this.element.style.display = "flex"; // Use flex for centering image inside if needed
        this.element.style.alignItems = "center";
        this.element.style.justifyContent = "center";


        // Create or update the actual image element
        if (!this.imageElement) {
            this.imageElement = document.createElement('img');
            this.imageElement.style.display = "block"; // Img is block inside flex container
            this.imageElement.style.borderRadius = "8px"; // Slightly more rounded
            this.imageElement.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)"; // Softer shadow
            this.imageElement.style.objectFit = "cover"; // Ensure image covers area well
            this.imageElement.style.transition = "all 0.3s ease";
            this.imageElement.alt = "Profile Photo";
            this.element.appendChild(this.imageElement); // Append image to container
        }

        // Make image visible
        this.imageElement.style.display = "block";
        this.imageElement.src = state.profileImage.src;

        // Calculate size based on state
        let imageSizePx: number;
        switch (state.profileImage.size) {
            case "small": imageSizePx = 60; break;
            case "large": imageSizePx = 100; break;
            case "medium":
            default: imageSizePx = 80; break;
        }

        this.imageElement.style.width = `${imageSizePx}px`;
        this.imageElement.style.height = `${imageSizePx}px`;
        this.imageElement.style.maxHeight = `${imageSizePx}px`; // Ensure max size constraint
        this.imageElement.style.maxWidth = `${imageSizePx}px`;

        // Reset container margins/order before applying new ones
        this.element.style.margin = "0";
        this.element.style.order = "0";
        this.element.style.width = 'auto'; // Let image size dictate container width usually

        // Update container position based on state
        const marginSize = "25px"; // Space between image and content
        if (state.profileImage.position === "center") {
            this.element.style.order = "-1"; // Place it before content container in flex column
            this.element.style.marginBottom = marginSize;
        } else if (state.profileImage.position === "left") {
            this.element.style.order = "0"; // First item in flex row
            this.element.style.marginRight = marginSize;
        } else { // Right
            this.element.style.order = "1"; // Last item in flex row
            this.element.style.marginLeft = marginSize;
        }
    }

    unmount(): void {
        // Override base unmount to ensure imageElement is also handled if necessary
        if (this.imageElement && this.imageElement.parentNode) {
            // Optional: Explicitly remove image if container removal isn't enough
            // this.imageElement.parentNode.removeChild(this.imageElement);
        }
        this.imageElement = null; // Clear reference
        super.unmount(); // Call base unmount for the container element
    }
}


/**
 * Background overlay component - Adds a semi-transparent overlay over background images/gradients.
 */
export class OverlayComponent extends BaseBannerComponent {
    constructor(parent: HTMLElement, id: string) {
        super(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.style.position = "absolute";
        this.element.style.inset = "0"; // Cover entire parent
        this.element.style.backgroundColor = "black"; // Default overlay color
        this.element.style.opacity = "0"; // Default to transparent
        this.element.style.zIndex = "1"; // Below content (z=2), above background (z=0)
        this.element.style.transition = "opacity 0.3s ease";
        this.element.style.pointerEvents = "none"; // Make sure it doesn't block interactions

        parent.appendChild(this.element);
    }

    update(state: any): void {
        let opacity = 0;
        // Check if there's a background image with an overlay setting
        if (state.backgroundImage && state.backgroundImage.overlay && state.backgroundImage.overlay > 0) {
            opacity = state.backgroundImage.overlay / 100;
        }
        // Optional: Add overlay for gradients too?
        // else if (state.backgroundGradient && state.someGradientOverlaySetting) {
        //   opacity = state.someGradientOverlaySetting / 100;
        // }

        this.element.style.opacity = opacity.toString();
        this.element.style.display = opacity > 0 ? "block" : "none"; // Hide if fully transparent
    }
}


/**
 * Banner Manager Class: Orchestrates all the DOM components within the target banner element.
 */
export class BannerManager {
    private components: BannerComponent[] = [];
    private bannerElement: HTMLElement; // The actual LinkedIn banner element
    private originalStyle: CSSStyleDeclaration | null = null; // Store original inline styles
    private originalHTML: string = ''; // Store original inner HTML

    constructor(bannerElement: HTMLElement) {
        this.bannerElement = bannerElement;
        // Deep clone the original style object to preserve initial state
        this.originalStyle = bannerElement.style ? window.getComputedStyle(bannerElement).cssText as any : null; // Get computed styles as fallback
        this.originalHTML = bannerElement.innerHTML; // Store original content
    }

    /**
     * Sets up the banner structure with initial state.
     */
    setup(initialState: any): void {
        // Clear existing banner content safely
        this.bannerElement.innerHTML = "";

        // Apply base styles necessary for our layout
        this.bannerElement.style.display = "flex"; // Use flex for layout control
        this.bannerElement.style.alignItems = "center";
        this.bannerElement.style.justifyContent = "center";
        this.bannerElement.style.position = "relative"; // Needed for overlay absolute positioning
        this.bannerElement.style.overflow = "hidden"; // Prevent content overflow
        // Ensure minimum height if needed, or let content dictate
        // this.bannerElement.style.minHeight = "200px";
        this.bannerElement.style.padding = "0"; // Reset padding, handle inside components
        this.bannerElement.style.background = ""; // Clear potential inline background


        // --- Create Components in Order ---

        // 1. Background Overlay (added first, lowest z-index visually)
        const overlay = new OverlayComponent(this.bannerElement, "instantbranding-overlay");
        this.components.push(overlay);

        // 2. Main Container (holds image and text block)
        const container = new BannerContainer(this.bannerElement);
        this.components.push(container); // Container is the direct child after overlay

        // 3. Profile Image (appended to container)
        const profileImage = new ProfileImageComponent(container.element, "instantbranding-live-profile");
        this.components.push(profileImage);

        // 4. Content Container (appended to container, holds text)
        const contentContainer = new ContentContainer(container.element, "instantbranding-content-container");
        this.components.push(contentContainer);

        // 5. Text Components (appended to contentContainer)
        const title = new TitleComponent(contentContainer.element, "instantbranding-live-title");
        const content = new ContentComponent(contentContainer.element, "instantbranding-live-content");
        const cta = new CTAComponent(contentContainer.element, "instantbranding-live-cta");
        this.components.push(title, content, cta);


        // Perform initial update with the starting state
        this.update(initialState);
    }

    /**
     * Updates all managed components with the new state.
     */
    update(state: any): void {
        // Update background first as other elements might depend on it (e.g., text shadow)
        this.updateBackground(state);

        // Update all registered components
        // The order matters if updates have dependencies (e.g., container first)
        for (const component of this.components) {
            try {
                component.update(state);
            } catch (error) {
                console.error(`Error updating component ${component.element?.id}:`, error);
            }
        }
    }

    /**
     * Cleans up all managed components and restores the original banner state.
     */
    unmount(): void {
        // Unmount components (removes elements from DOM)
        // Iterate in reverse order? Usually doesn't matter for removal.
        for (const component of this.components) {
            try {
                component.unmount();
            } catch (error) {
                console.error(`Error unmounting component ${component.element?.id}:`, error);
            }
        }
        this.components = []; // Clear the array

        // Restore original banner content and styles
        this.bannerElement.innerHTML = this.originalHTML;

        // Reset inline styles modified by the manager/components
        // Simple approach: clear common styles we set
        this.bannerElement.style.display = '';
        this.bannerElement.style.alignItems = '';
        this.bannerElement.style.justifyContent = '';
        this.bannerElement.style.position = '';
        this.bannerElement.style.overflow = '';
        this.bannerElement.style.padding = '';
        this.bannerElement.style.background = ''; // Clear background set by us
        this.bannerElement.style.backgroundColor = '';
        this.bannerElement.style.backgroundImage = '';
        this.bannerElement.style.minHeight = '';

        // More robust: Re-apply original computed styles (can be complex)
        // if (this.originalStyle) {
        //     this.bannerElement.style.cssText = this.originalStyle;
        // }

        console.log("BannerManager unmounted and restored original state.");
    }

    /**
     * Updates the background style of the main banner element.
     */
    private updateBackground(state: any): void {
        const backgroundStyle = getBackgroundStyle(state);
        // Apply styles individually for better control and potential transitions
        this.bannerElement.style.backgroundColor = backgroundStyle.backgroundColor || '';
        this.bannerElement.style.backgroundImage = backgroundStyle.backgroundImage || '';
        this.bannerElement.style.backgroundSize = backgroundStyle.backgroundSize || '';
        this.bannerElement.style.backgroundPosition = backgroundStyle.backgroundPosition || '';
        this.bannerElement.style.backgroundRepeat = backgroundStyle.backgroundRepeat || '';
        // Add transition for smooth background changes
        this.bannerElement.style.transition = 'background 0.4s ease-in-out';
    }
}

/**
 * Generates CSS properties for the background based on editor state.
 */
export function getBackgroundStyle(state: any): { [key: string]: string } {
    const { backgroundColor, backgroundGradient, backgroundImage } = state;

    if (backgroundImage && backgroundImage.src) {
        return {
            backgroundColor: backgroundColor || '#ffffff', // Fallback color behind image
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: backgroundImage.position || "center center", // Default to center
            backgroundRepeat: "no-repeat",
        };
    } else if (backgroundGradient && backgroundGradient.css) {
        return {
            backgroundColor: '', // Clear solid color if gradient is active
            backgroundImage: backgroundGradient.css, // Use the pre-formatted CSS gradient string
            backgroundSize: '',
            backgroundPosition: '',
            backgroundRepeat: '',
        };
    } else {
        // Solid color
        return {
            backgroundColor: backgroundColor || '#1e40af', // Default solid color
            backgroundImage: '', // Ensure no image or gradient
            backgroundSize: '',
            backgroundPosition: '',
            backgroundRepeat: '',
        };
    }
}