// import React, { useCallback } from 'react';
// import html2canvas from 'html2canvas';

// const DownloadSection: React.FC = () => {
//   const handleDownload = useCallback(async () => {
//     const bannerElement = document.getElementById('instant-branding-banner');
//     if (bannerElement) {
//       try {
//         const canvas = await html2canvas(bannerElement, {
//           logging: true,
//           useCORS: true,
//           backgroundColor: null
//         });
//         const image = canvas.toDataURL('image/png', 1.0);

//         const link = document.createElement('a');
//         link.href = image;
//         link.download = 'instant-branding-banner.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (error) {
//         console.error("Error generating banner image:", error);
//         alert("Could not download the banner. Check the console for details.");
//       }
//     } else {
//       console.warn("Banner element not found");
//       alert("Could not find the banner element to download.");
//     }
//   }, []);

//   return (
//     <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
//       <p className="font-medium text-gray-700 mb-2">Download</p>
//       <button
//         onClick={handleDownload}
//         className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//       >
//         Download Banner (PNG)
//       </button>
//       <p className="text-sm text-gray-400 italic mt-1">Captures the current banner preview.</p>
//     </div>
//   );
// };

// export default DownloadSection;

import React, { useCallback, useState } from "react";
import html2canvas from "html2canvas";

const DownloadSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [downloadQuality, setDownloadQuality] = useState("high");

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    const bannerElement = document.querySelector(
      ".top-card-background-hero-image"
    );

    if (!bannerElement) {
      console.warn("Banner element not found");
      alert("Could not find the banner element to download.");
      setIsDownloading(false);
      return;
    }

    try {
      // Configure quality settings
      const scale = downloadQuality === "high" ? 20 : 10;

      const canvas = await html2canvas(bannerElement as HTMLElement, {
        logging: false,
        useCORS: true,
        backgroundColor: null,
        scale: scale,
        allowTaint: true,
      });

      // Different formats logic
      let downloadUrl, filename;
      if (selectedFormat === "png") {
        downloadUrl = canvas.toDataURL("image/png", 1.0);
        filename = "linkedin-banner.png";
      } else if (selectedFormat === "jpg") {
        downloadUrl = canvas.toDataURL("image/jpeg", 0.9);
        filename = "linkedin-banner.jpg";
      } else {
        // Fallback to PNG
        downloadUrl = canvas.toDataURL("image/png", 1.0);
        filename = "linkedin-banner.png";
      }

      // Create download link
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success feedback could be added here
    } catch (error) {
      console.error("Error generating banner image:", error);
      alert("Could not download the banner. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [selectedFormat, downloadQuality]);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium text-gray-700">Export Banner</h3>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedFormat("png")}
                className={`flex items-center justify-center px-3 py-1.5 border rounded-md text-xs ${
                  selectedFormat === "png"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                PNG
              </button>
              <button
                onClick={() => setSelectedFormat("jpg")}
                className={`flex items-center justify-center px-3 py-1.5 border rounded-md text-xs ${
                  selectedFormat === "jpg"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                JPG
              </button>
              <button
                disabled
                className="flex items-center justify-center px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-400 cursor-not-allowed bg-gray-50"
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
                  <polyline points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polyline>
                </svg>
                HTML
              </button>
              <button
                disabled
                className="flex items-center justify-center px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-400 cursor-not-allowed bg-gray-50"
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
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                  <line x1="12" y1="22" x2="12" y2="15.5"></line>
                  <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                </svg>
                CSS
              </button>
            </div>
          </div>

          {/* Quality Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality
            </label>
            <div className="flex">
              <button
                onClick={() => setDownloadQuality("standard")}
                className={`flex-1 px-3 py-1.5 text-xs border-t border-b border-l rounded-l-md ${
                  downloadQuality === "standard"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setDownloadQuality("high")}
                className={`flex-1 px-3 py-1.5 text-xs border rounded-r-md ${
                  downloadQuality === "high"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                High
              </button>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center text-sm"
          >
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export Banner
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-1">
            The banner will be exported as shown in the LinkedIn preview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
