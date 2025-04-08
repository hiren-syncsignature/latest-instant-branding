import React, { useCallback } from 'react';
import html2canvas from 'html2canvas';

const DownloadSection: React.FC = () => {
  const handleDownload = useCallback(async () => {
    const bannerElement = document.getElementById('instant-branding-banner');
    if (bannerElement) {
      try {
        const canvas = await html2canvas(bannerElement, {
          logging: true,
          useCORS: true,
          backgroundColor: null
        });
        const image = canvas.toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.href = image;
        link.download = 'instant-branding-banner.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating banner image:", error);
        alert("Could not download the banner. Check the console for details.");
      }
    } else {
      console.warn("Banner element not found");
      alert("Could not find the banner element to download.");
    }
  }, []);

  return (
    <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
      <p className="font-medium text-gray-700 mb-2">Download</p>
      <button
        onClick={handleDownload}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Download Banner (PNG)
      </button>
      <p className="text-sm text-gray-400 italic mt-1">Captures the current banner preview.</p>
    </div>
  );
};

export default DownloadSection; 