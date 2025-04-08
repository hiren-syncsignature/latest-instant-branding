// import React from 'react';

// const MediaUploadSection: React.FC = () => (
//   <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
//     <p className="font-medium text-gray-700 mb-2">Media</p>
//     <div className="flex space-x-2">
//       <button className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
//         Photo Upload
//       </button>
//       <button className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
//         Logo Upload
//       </button>
//     </div>
//     <p className="text-sm text-gray-400 italic mt-1">Upload functionality coming soon.</p>
//   </div>
// );

// export default MediaUploadSection;

import React, { useCallback, useState } from "react";

const MediaUploadSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("photo");
  const [dragActive, setDragActive] = useState(false);

  // Placeholder functions for future implementation
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Future implementation: Handle file drop
  }, []);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "photo"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("photo")}
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Photo
          </span>
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "logo"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("logo")}
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Logo
          </span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-700 mb-3">
          {activeTab === "photo" ? "Background Photo" : "Brand Logo"}
        </h3>

        {/* Upload Area - Future Implementation */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {activeTab === "photo"
                ? "Add a background photo to your banner"
                : "Upload your brand logo"}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Supported formats: PNG, JPG, SVG (max 5MB)
            </p>
            <button
              disabled
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 opacity-50 cursor-not-allowed flex items-center text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              {dragActive ? "Drop to Upload" : "Select File"}
            </button>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-xs text-amber-700 text-center">
            Media upload functionality will be available in the next update.
          </p>
        </div>

        {/* Image Positioning Options - For Future Implementation */}
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Positioning</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              disabled
              className="p-1.5 border rounded text-xs bg-gray-50 text-gray-400 cursor-not-allowed"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
                Left
              </span>
            </button>
            <button
              disabled
              className="p-1.5 border rounded text-xs bg-gray-50 text-gray-400 cursor-not-allowed"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <line x1="18" y1="10" x2="6" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
                Center
              </span>
            </button>
            <button
              disabled
              className="p-1.5 border rounded text-xs bg-gray-50 text-gray-400 cursor-not-allowed"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <line x1="21" y1="10" x2="7" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="7" y2="18"></line>
                </svg>
                Right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadSection;
