// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import html2canvas from 'html2canvas'; // Import html2canvas
// import { RootState, AppDispatch } from '../store'; // Adjust path if needed
// import {
//   setBackgroundColor,
//   setTitle,
//   setOtherContent,
//   setCtaWebsite
// } from '../store/editorSlice'; // Adjust path
// import TextEditor from './components/TextEditor';
// import BannerTemplates from './components/BannerTemplates';
// import PositionControls from './components/PositionControls';
// import BackgroundEditor from './components/BackgroundEditor';
// import MediaUploadSection from './components/MediaUploadSection';
// import DownloadSection from './components/DownloadSection';

// // --- Main Sidebar Component ---

// const Sidebar: React.FC = () => {
//   const manifest = chrome.runtime.getManifest();

//   return (
//     <div
//       className="fixed top-0 right-0 h-screen w-[300px] bg-white text-black p-4 shadow-xl z-[9999] border-l border-gray-300 overflow-y-auto flex flex-col space-y-5 text-base"
//       style={{ zIndex: 9999 }}
//     >
//       <h2 className="text-2xl font-semibold mb-2 border-b pb-3 text-gray-800">Banner Editor</h2>

//       <div className="flex flex-col space-y-5">
//         {/* Banner Templates Section */}
//         <BannerTemplates />

//         {/* Background Section */}
//         <BackgroundEditor />

//         {/* Title Section */}
//         <div className="space-y-3">
//           <TextEditor
//             id="title-editor"
//             label="Title"
//             valueSelector={(state) => state.editor.title}
//             actionCreator={setTitle}
//             isSingleLine={true}
//             templateOptions={[
//               "Professional Title",
//               "Creative Headline",
//               "Catchy Phrase",
//               "Brand Statement"
//             ]}
//           />
//           <PositionControls elementType="title" />
//         </div>

//         {/* Other Content Section */}
//         <div className="space-y-3">
//           <TextEditor
//             id="content-editor"
//             label="Other Content"
//             valueSelector={(state) => state.editor.otherContent}
//             actionCreator={setOtherContent}
//             rows={4}
//             templateOptions={[
//               "Add your professional description here",
//               "Tell your story in a few words",
//               "Highlight your key achievements",
//               "Share your mission statement"
//             ]}
//           />
//           <PositionControls elementType="content" />
//         </div>

//         {/* CTA/Website Section */}
//         <div className="space-y-3">
//           <TextEditor
//             id="cta-editor"
//             label="CTA / Website"
//             valueSelector={(state) => state.editor.ctaWebsite}
//             actionCreator={setCtaWebsite}
//             isSingleLine={true}
//             templateOptions={[
//               "Learn More",
//               "Get Started",
//               "Contact Us",
//               "Visit Website"
//             ]}
//           />
//           <PositionControls elementType="cta" />
//         </div>

//         {/* Media Upload Section */}
//         <MediaUploadSection />

//         {/* Download Section */}
//         <DownloadSection />
//       </div>

//       <div className="flex-grow"></div>
//       <p className="text-sm text-gray-500 text-center mt-4">InstantBranding v{manifest.version}</p>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TextEditor from "./components/TextEditor";
import BannerTemplates from "./components/BannerTemplates";
import PositionControls from "./components/PositionControls";
import BackgroundEditor from "./components/BackgroundEditor";
import MediaUploadSection from "./components/MediaUploadSection";
import DownloadSection from "./components/DownloadSection";

// --- Main Sidebar Component ---
const Sidebar = () => {
  const manifest = chrome.runtime.getManifest();
  const [activeTab, setActiveTab] = useState("design");

  // Get current values from Redux store for preview
  const { title, otherContent, ctaWebsite, backgroundColor } = useSelector(
    (state: RootState) => state.editor
  );

  // Helper function to render rich text for preview
  const renderRichText = (jsonContent) => {
    try {
      // Check if it's a rich text JSON string
      if (
        jsonContent &&
        typeof jsonContent === "string" &&
        jsonContent.startsWith("{") &&
        jsonContent.endsWith("}")
      ) {
        const richContent = JSON.parse(jsonContent);

        if (richContent.text && Array.isArray(richContent.formatting)) {
          // Create a copy of the text
          let html = richContent.text;

          // Apply formatting - we need to process from end to start to avoid index shifting
          const sortedFormats = [...richContent.formatting].sort(
            (a, b) => b.start - a.start
          );

          sortedFormats.forEach((format) => {
            const { start, end, type, color } = format;
            const content = html.substring(start, end);
            let styledContent;

            switch (type) {
              case "bold":
                styledContent = `<b>${content}</b>`;
                break;
              case "italic":
                styledContent = `<i>${content}</i>`;
                break;
              case "underline":
                styledContent = `<u>${content}</u>`;
                break;
              case "highlight":
                styledContent = `<span style="background-color: ${
                  color || "#FFFF00"
                }">${content}</span>`;
                break;
              default:
                styledContent = content;
            }

            html =
              html.substring(0, start) + styledContent + html.substring(end);
          });

          // Apply alignment
          if (richContent.alignment) {
            html = `<div style="text-align: ${richContent.alignment}">${html}</div>`;
          }

          return { __html: html };
        }
      }

      // If not rich content, return as-is
      return { __html: jsonContent };
    } catch (e) {
      console.error("Error rendering rich text:", e);
      return { __html: jsonContent };
    }
  };

  return (
    <div
      className="fixed top-0 right-0 h-screen w-[320px] bg-white text-black shadow-xl z-[9999] border-l border-gray-200 flex flex-col text-base"
      style={{ zIndex: 9999 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
        <h2 className="text-base font-bold text-gray-800">InstantBranding</h2>
        <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
          v{manifest.version}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === "design"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("design")}
        >
          Design
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === "content"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Content
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === "export"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("export")}
        >
          Export
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Live Preview */}
        <div className="mb-2 border rounded-md overflow-hidden shadow-sm">
          <div
            className="relative p-3 flex flex-col items-center justify-center"
            style={{ backgroundColor, minHeight: "80px" }}
          >
            <div className="text-center w-full">
              <p
                className="font-bold text-sm text-white mb-0.5"
                dangerouslySetInnerHTML={renderRichText(title || "Your Title")}
              ></p>
              {otherContent && (
                <p
                  className="text-xs text-white mb-0.5"
                  dangerouslySetInnerHTML={renderRichText(otherContent)}
                ></p>
              )}
              {ctaWebsite && (
                <p
                  className="text-xs text-white underline"
                  dangerouslySetInnerHTML={renderRichText(ctaWebsite)}
                ></p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 py-1 px-2 text-xs text-center text-gray-500">
            Live Preview
          </div>
        </div>

        {activeTab === "design" && (
          <>
            <BannerTemplates />
            <BackgroundEditor />
            <div className="border rounded-md p-3 bg-white shadow-sm">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">
                Element Positioning
              </h3>
              <div className="space-y-2">
                <PositionControls elementType="title" />
                <PositionControls elementType="content" />
                <PositionControls elementType="cta" />
              </div>
            </div>
          </>
        )}

        {activeTab === "content" && (
          <>
            <TextEditor
              id="title-editor"
              label="Title"
              valueSelector={(state) => state.editor.title}
              actionCreator={(title) => ({
                type: "editor/setTitle",
                payload: title,
              })}
              isSingleLine={true}
              templateOptions={[
                "Professional Title",
                "Creative Headline",
                "Catchy Phrase",
                "Brand Statement",
              ]}
            />

            <TextEditor
              id="content-editor"
              label="Description"
              valueSelector={(state) => state.editor.otherContent}
              actionCreator={(content) => ({
                type: "editor/setOtherContent",
                payload: content,
              })}
              rows={3}
              templateOptions={[
                "Add your professional description here",
                "Tell your story in a few words",
                "Highlight your key achievements",
                "Share your mission statement",
              ]}
            />

            <TextEditor
              id="cta-editor"
              label="Call to Action"
              valueSelector={(state) => state.editor.ctaWebsite}
              actionCreator={(cta) => ({
                type: "editor/setCtaWebsite",
                payload: cta,
              })}
              isSingleLine={true}
              templateOptions={[
                "Learn More",
                "Get Started",
                "Contact Us",
                "Visit Website",
              ]}
            />

            <MediaUploadSection />
          </>
        )}

        {activeTab === "export" && (
          <>
            <DownloadSection />
            <div className="border rounded-md p-3 bg-white shadow-sm">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">Share</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled
                  className="p-1.5 border rounded text-xs hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center"
                >
                  LinkedIn
                </button>
                <button
                  disabled
                  className="p-1.5 border rounded text-xs hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center"
                >
                  Twitter
                </button>
                <button
                  disabled
                  className="p-1.5 border rounded text-xs hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center"
                >
                  Facebook
                </button>
              </div>
              <p className="text-xs text-gray-400 italic mt-2">
                Social sharing coming soon
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-2 text-center bg-gray-50">
        <button
          className="text-xs text-gray-500 hover:text-gray-700"
          onClick={() =>
            chrome.runtime.sendMessage({ action: "toggleSidebar" })
          }
        >
          Close Editor
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
