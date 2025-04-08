// import React, { useCallback, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faBold,
//   faItalic,
//   faUnderline,
//   faAlignLeft,
//   faAlignCenter,
//   faAlignRight,
//   faHighlighter,
//   faFont
// } from '@fortawesome/free-solid-svg-icons';

// interface TextEditorProps {
//   id: string;
//   label: string;
//   valueSelector: (state: RootState) => string;
//   actionCreator: (text: string) => { type: string; payload: string };
//   rows?: number;
//   isSingleLine?: boolean;
//   placeholder?: string;
//   templateOptions?: string[];
// }

// const TextEditor: React.FC<TextEditorProps> = ({
//   id,
//   label,
//   valueSelector,
//   actionCreator,
//   rows = 3,
//   isSingleLine = false,
//   placeholder,
//   templateOptions = []
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const value = useSelector(valueSelector);
//   const [showTemplates, setShowTemplates] = useState(false);
//   const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [highlightColor, setHighlightColor] = useState<string | null>(null);

//   const handleChange = useCallback((newText: string) => {
//     dispatch(actionCreator(newText));
//   }, [dispatch, actionCreator]);

//   const handleTemplateSelect = (template: string) => {
//     handleChange(template);
//     setShowTemplates(false);
//   };

//   const toggleTextAlign = (align: 'left' | 'center' | 'right') => {
//     setTextAlign(align);
//     // Dispatch alignment change to store if needed
//   };

//   const InputComponent = isSingleLine ? 'input' : 'textarea';
//   const inputType = isSingleLine ? 'text' : undefined;

//   return (
//     <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
//       <div className="flex justify-between items-center">
//         <label className="block font-medium text-gray-700" htmlFor={id}>{label}</label>
//         {templateOptions.length > 0 && (
//           <button
//             onClick={() => setShowTemplates(!showTemplates)}
//             className="text-sm text-blue-600 hover:text-blue-800"
//           >
//             {showTemplates ? 'Hide Templates' : 'Show Templates'}
//           </button>
//         )}
//       </div>

//       {showTemplates && templateOptions.length > 0 && (
//         <div className="mb-2 p-2 border rounded bg-white">
//           <p className="text-sm text-gray-600 mb-1">Select a template:</p>
//           <div className="flex flex-wrap gap-2">
//             {templateOptions.map((template, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleTemplateSelect(template)}
//                 className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
//               >
//                 {template}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="relative">
//         <InputComponent
//           id={id}
//           rows={!isSingleLine ? rows : undefined}
//           type={inputType}
//           className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner
//             ${isBold ? 'font-bold' : ''}
//             ${isItalic ? 'italic' : ''}
//             ${isUnderline ? 'underline' : ''}
//             ${highlightColor ? `bg-${highlightColor}-100` : ''}
//             text-${textAlign}`}
//           placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
//           value={value}
//           onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e.target.value)}
//         />
//       </div>

//       {!isSingleLine && (
//         <div className="flex flex-wrap gap-2 pt-2">
//           <button
//             onClick={() => setIsBold(!isBold)}
//             className={`p-2 rounded ${isBold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//             title="Bold"
//           >
//             <FontAwesomeIcon icon={faBold} />
//           </button>
//           <button
//             onClick={() => setIsItalic(!isItalic)}
//             className={`p-2 rounded ${isItalic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//             title="Italic"
//           >
//             <FontAwesomeIcon icon={faItalic} />
//           </button>
//           <button
//             onClick={() => setIsUnderline(!isUnderline)}
//             className={`p-2 rounded ${isUnderline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//             title="Underline"
//           >
//             <FontAwesomeIcon icon={faUnderline} />
//           </button>
//           <button
//             onClick={() => setHighlightColor(highlightColor ? null : 'yellow')}
//             className={`p-2 rounded ${highlightColor ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//             title="Highlight"
//           >
//             <FontAwesomeIcon icon={faHighlighter} />
//           </button>
//           <div className="flex gap-1">
//             <button
//               onClick={() => toggleTextAlign('left')}
//               className={`p-2 rounded ${textAlign === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Left"
//             >
//               <FontAwesomeIcon icon={faAlignLeft} />
//             </button>
//             <button
//               onClick={() => toggleTextAlign('center')}
//               className={`p-2 rounded ${textAlign === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Center"
//             >
//               <FontAwesomeIcon icon={faAlignCenter} />
//             </button>
//             <button
//               onClick={() => toggleTextAlign('right')}
//               className={`p-2 rounded ${textAlign === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Right"
//             >
//               <FontAwesomeIcon icon={faAlignRight} />
//             </button>
//           </div>
//           <button
//             className="p-2 rounded hover:bg-gray-100"
//             title="Font Family"
//           >
//             <FontAwesomeIcon icon={faFont} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextEditor;

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";

// Rich text content interface
interface RichTextContent {
  text: string;
  formatting: Array<{
    type: "bold" | "italic" | "underline" | "highlight";
    start: number;
    end: number;
    color?: string;
  }>;
  alignment: "left" | "center" | "right";
}

interface TextEditorProps {
  id: string;
  label: string;
  valueSelector: (state: RootState) => string;
  actionCreator: (text: string) => { type: string; payload: string };
  rows?: number;
  isSingleLine?: boolean;
  placeholder?: string;
  templateOptions?: string[];
}

const TextEditor: React.FC<TextEditorProps> = ({
  id,
  label,
  valueSelector,
  actionCreator,
  rows = 3,
  isSingleLine = false,
  placeholder,
  templateOptions = [],
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const rawValue = useSelector(valueSelector);
  const [showTemplates, setShowTemplates] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [richContent, setRichContent] = useState<RichTextContent>({
    text: "",
    formatting: [],
    alignment: "left",
  });
  const editorRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [selectedRange, setSelectedRange] = useState<{
    start: number;
    end: number;
  } | null>(null);

  // Parse JSON from Redux store if available, or set default values
  useEffect(() => {
    try {
      if (rawValue && rawValue.startsWith("{") && rawValue.endsWith("}")) {
        const parsed = JSON.parse(rawValue);
        if (parsed.text !== undefined && parsed.formatting !== undefined) {
          setRichContent(parsed);
          setTextValue(parsed.text);
          return;
        }
      }
      // If not valid JSON or doesn't have the expected structure
      setTextValue(rawValue);
      setRichContent({
        text: rawValue,
        formatting: [],
        alignment: "left",
      });
    } catch (e) {
      // If there's an error parsing, just use raw value
      setTextValue(rawValue);
      setRichContent({
        text: rawValue,
        formatting: [],
        alignment: "left",
      });
    }
  }, [rawValue]);

  // Save the formatted content back to Redux
  const saveRichContent = useCallback(
    (newContent: RichTextContent) => {
      // Store as JSON in the Redux store
      dispatch(actionCreator(JSON.stringify(newContent)));
    },
    [dispatch, actionCreator]
  );

  // Handle text changes in the editor
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setTextValue(newText);

      // Update the rich content object
      const newRichContent = {
        ...richContent,
        text: newText,
        // We need to adjust formatting positions if text length changes
        formatting: richContent.formatting.filter(
          (fmt) => fmt.start < newText.length && fmt.end <= newText.length
        ),
      };

      setRichContent(newRichContent);
      saveRichContent(newRichContent);
    },
    [richContent, saveRichContent]
  );

  // Selection change handler
  const handleSelectionChange = () => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;

    if (start !== end) {
      setSelectedRange({ start, end });
    } else {
      setSelectedRange(null);
    }
  };

  // Set up event listeners for selection
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("select", handleSelectionChange);
      editor.addEventListener("mouseup", handleSelectionChange);
      editor.addEventListener("keyup", handleSelectionChange);

      return () => {
        editor.removeEventListener("select", handleSelectionChange);
        editor.removeEventListener("mouseup", handleSelectionChange);
        editor.removeEventListener("keyup", handleSelectionChange);
      };
    }
  }, []);

  // Format the currently selected text
  const formatSelection = (
    formatType: "bold" | "italic" | "underline" | "highlight"
  ) => {
    if (!selectedRange || !editorRef.current) return;

    // Create a new formatting entry
    const newFormatting = {
      type: formatType,
      start: selectedRange.start,
      end: selectedRange.end,
      color: formatType === "highlight" ? highlightColor : undefined,
    };

    // Check if this formatting already exists
    const existingFormatIndex = richContent.formatting.findIndex(
      (fmt) =>
        fmt.type === formatType &&
        fmt.start === selectedRange.start &&
        fmt.end === selectedRange.end
    );

    let newFormattingArray;
    if (existingFormatIndex >= 0) {
      // Remove the formatting if it already exists (toggle behavior)
      newFormattingArray = richContent.formatting.filter(
        (_, index) => index !== existingFormatIndex
      );
    } else {
      // Add the new formatting
      newFormattingArray = [...richContent.formatting, newFormatting];
    }

    // Update rich content
    const newRichContent = {
      ...richContent,
      formatting: newFormattingArray,
    };

    setRichContent(newRichContent);
    saveRichContent(newRichContent);

    // Restore focus
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        try {
          (editorRef.current as HTMLTextAreaElement).setSelectionRange(
            selectedRange.start,
            selectedRange.end
          );
        } catch (e) {
          console.error("Error restoring selection:", e);
        }
      }
    }, 0);
  };

  // Change text alignment
  const setAlignment = (alignment: "left" | "center" | "right") => {
    const newRichContent = {
      ...richContent,
      alignment,
    };

    setRichContent(newRichContent);
    saveRichContent(newRichContent);
  };

  // Clear all formatting
  const clearFormatting = () => {
    const newRichContent = {
      text: richContent.text,
      formatting: [],
      alignment: "left",
    };

    setRichContent(newRichContent);
    saveRichContent(newRichContent);
  };

  // Handle template selection
  const handleTemplateSelect = (template: string) => {
    setTextValue(template);
    const newRichContent = {
      text: template,
      formatting: [],
      alignment: "left",
    };

    setRichContent(newRichContent);
    saveRichContent(newRichContent);
    setShowTemplates(false);
  };

  // Render the rich text for preview
  const renderRichText = () => {
    if (!richContent.text) return "";

    // Create spans for each formatting
    const segments: Array<{
      start: number;
      end: number;
      formats: Array<{ type: string; color?: string }>;
    }> = [];

    // First, create a segment for the entire text with no formatting
    segments.push({
      start: 0,
      end: richContent.text.length,
      formats: [],
    });

    // Split segments based on formatting boundaries
    richContent.formatting.forEach((format) => {
      const { start, end, type, color } = format;

      // Find all segments that overlap with this formatting
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        // Skip non-overlapping segments
        if (segment.end <= start || segment.start >= end) continue;

        // If the segment fully contains the formatting
        if (segment.start < start && segment.end > end) {
          // Split into three segments: before, formatted, after
          segments.splice(
            i,
            1,
            { start: segment.start, end: start, formats: [...segment.formats] },
            { start, end, formats: [...segment.formats, { type, color }] },
            { start: end, end: segment.end, formats: [...segment.formats] }
          );
          i += 2; // Skip the two new segments we just added
        }
        // If the segment starts before the formatting
        else if (segment.start < start) {
          // Split into two: before, partial formatted
          segments.splice(
            i,
            1,
            { start: segment.start, end: start, formats: [...segment.formats] },
            {
              start,
              end: segment.end,
              formats: [...segment.formats, { type, color }],
            }
          );
          i++; // Skip the new segment
        }
        // If the segment ends after the formatting
        else if (segment.end > end) {
          // Split into two: partial formatted, after
          segments.splice(
            i,
            1,
            {
              start: segment.start,
              end,
              formats: [...segment.formats, { type, color }],
            },
            { start: end, end: segment.end, formats: [...segment.formats] }
          );
          i++; // Skip the new segment
        }
        // If the segment is fully contained in the formatting
        else {
          // Just add the formatting to this segment
          segment.formats.push({ type, color });
        }
      }
    });

    // Sort segments by start position
    segments.sort((a, b) => a.start - b.start);

    // Generate HTML for each segment
    const html = segments
      .map((segment) => {
        let content = richContent.text.substring(segment.start, segment.end);

        // Apply formatting from inside to outside
        let styledContent = content;

        segment.formats.forEach((format) => {
          switch (format.type) {
            case "bold":
              styledContent = `<b>${styledContent}</b>`;
              break;
            case "italic":
              styledContent = `<i>${styledContent}</i>`;
              break;
            case "underline":
              styledContent = `<u>${styledContent}</u>`;
              break;
            case "highlight":
              styledContent = `<span style="background-color: ${
                format.color || "#FFFF00"
              }">${styledContent}</span>`;
              break;
          }
        });

        return styledContent;
      })
      .join("");

    // Apply alignment to the whole content
    return `<div style="text-align: ${richContent.alignment}">${html}</div>`;
  };

  const InputComponent = isSingleLine ? "input" : "textarea";
  const inputType = isSingleLine ? "text" : undefined;

  // Highlight color options
  const highlightColors = [
    "#FFFF00",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
  ];

  // Check if a formatting is active for the current selection
  const isFormatActive = (formatType: string) => {
    if (!selectedRange) return false;

    return richContent.formatting.some(
      (fmt) =>
        fmt.type === formatType &&
        fmt.start === selectedRange.start &&
        fmt.end === selectedRange.end
    );
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <label
            className="block font-medium text-gray-700 text-sm"
            htmlFor={id}
          >
            {label}
          </label>
          {templateOptions.length > 0 && (
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
            >
              Ideas {showTemplates ? "▲" : "▼"}
            </button>
          )}
        </div>

        {showTemplates && templateOptions.length > 0 && (
          <div className="mb-3 p-2 border rounded bg-gray-50 shadow-inner">
            <div className="flex flex-wrap gap-1.5">
              {templateOptions.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateSelect(template)}
                  className="px-2 py-1 text-xs bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 rounded transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative mb-2">
          <InputComponent
            ref={editorRef}
            id={id}
            rows={!isSingleLine ? rows : undefined}
            type={inputType}
            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            value={textValue}
            onChange={handleTextChange}
          />
        </div>

        {!isSingleLine && (
          <>
            <div className="flex flex-wrap gap-1 border-t pt-2 mt-2 pb-1">
              <button
                onClick={() => formatSelection("bold")}
                className={`p-1.5 rounded hover:bg-blue-50 border ${
                  isFormatActive("bold")
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                } text-xs font-bold`}
                title="Bold"
                disabled={!selectedRange}
              >
                B
              </button>
              <button
                onClick={() => formatSelection("italic")}
                className={`p-1.5 rounded hover:bg-blue-50 border ${
                  isFormatActive("italic")
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                } text-xs italic`}
                title="Italic"
                disabled={!selectedRange}
              >
                I
              </button>
              <button
                onClick={() => formatSelection("underline")}
                className={`p-1.5 rounded hover:bg-blue-50 border ${
                  isFormatActive("underline")
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                } text-xs underline`}
                title="Underline"
                disabled={!selectedRange}
              >
                U
              </button>
              <button
                onClick={() => formatSelection("highlight")}
                className={`p-1.5 rounded hover:bg-blue-50 border ${
                  isFormatActive("highlight")
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                } text-xs flex items-center justify-center`}
                style={{ backgroundColor: highlightColor }}
                title="Highlight"
                disabled={!selectedRange}
              >
                H
              </button>

              {/* Highlight color picker */}
              {isFormatActive("highlight") && (
                <div className="flex border border-gray-200 rounded p-1 ml-1">
                  <div className="flex flex-wrap max-w-[84px]">
                    {highlightColors.slice(0, 8).map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setHighlightColor(color);
                          // Update existing highlight formatting
                          if (selectedRange) {
                            const newFormatting = richContent.formatting.map(
                              (fmt) => {
                                if (
                                  fmt.type === "highlight" &&
                                  fmt.start === selectedRange.start &&
                                  fmt.end === selectedRange.end
                                ) {
                                  return { ...fmt, color };
                                }
                                return fmt;
                              }
                            );

                            const newRichContent = {
                              ...richContent,
                              formatting: newFormatting,
                            };

                            setRichContent(newRichContent);
                            saveRichContent(newRichContent);
                          }
                        }}
                        className={`w-5 h-5 m-0.5 rounded-sm ${
                          highlightColor === color ? "ring-1 ring-blue-500" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex ml-auto">
                <button
                  onClick={() => setAlignment("left")}
                  className={`p-1.5 rounded hover:bg-blue-50 border ${
                    richContent.alignment === "left"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  } text-xs`}
                  title="Align Left"
                >
                  ←
                </button>
                <button
                  onClick={() => setAlignment("center")}
                  className={`p-1.5 rounded hover:bg-blue-50 border ${
                    richContent.alignment === "center"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  } text-xs`}
                  title="Align Center"
                >
                  ↔
                </button>
                <button
                  onClick={() => setAlignment("right")}
                  className={`p-1.5 rounded hover:bg-blue-50 border ${
                    richContent.alignment === "right"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  } text-xs`}
                  title="Align Right"
                >
                  →
                </button>
                <button
                  onClick={clearFormatting}
                  className="p-1.5 rounded hover:bg-blue-50 border border-gray-200 text-xs ml-1"
                  title="Clear Formatting"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mt-2 border rounded-md bg-gray-50 p-2">
              <div className="text-xs text-gray-500 mb-1">Preview:</div>
              <div
                className="text-xs bg-white p-2 rounded border border-gray-200 min-h-[40px] max-h-[80px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: renderRichText() }}
              />
            </div>

            {selectedRange && (
              <div className="text-xs text-blue-600 mt-1">
                Selected:{" "}
                {richContent.text.substring(
                  selectedRange.start,
                  selectedRange.end
                )}
                (chars {selectedRange.start}-{selectedRange.end})
              </div>
            )}
          </>
        )}

        <div className="text-xs text-gray-400 mt-1">
          {isSingleLine
            ? `${textValue.length} characters`
            : `${textValue.split(/\s+/).filter(Boolean).length} words, ${
                textValue.length
              } characters`}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
