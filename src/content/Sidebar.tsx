import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas'; // Import html2canvas
import { RootState, AppDispatch } from '../store'; // Adjust path if needed
import {
  setBackgroundColor,
  setTitle,
  setOtherContent,
  setCtaWebsite
} from '../store/editorSlice'; // Adjust path
import TextEditor from './components/TextEditor';
import BannerTemplates from './components/BannerTemplates';
import PositionControls from './components/PositionControls';
import BackgroundEditor from './components/BackgroundEditor';
import MediaUploadSection from './components/MediaUploadSection';
import DownloadSection from './components/DownloadSection';

// --- Main Sidebar Component ---

const Sidebar: React.FC = () => {
  const manifest = chrome.runtime.getManifest();

  return (
    <div
      className="fixed top-0 right-0 h-screen w-[300px] bg-white text-black p-4 shadow-xl z-[9999] border-l border-gray-300 overflow-y-auto flex flex-col space-y-5 text-base"
      style={{ zIndex: 9999 }}
    >
      <h2 className="text-2xl font-semibold mb-2 border-b pb-3 text-gray-800">Banner Editor</h2>

      <div className="flex flex-col space-y-5">
        {/* Banner Templates Section */}
        <BannerTemplates />

        {/* Background Section */}
        <BackgroundEditor />

        {/* Title Section */}
        <div className="space-y-3">
          <TextEditor
            id="title-editor"
            label="Title"
            valueSelector={(state) => state.editor.title}
            actionCreator={setTitle}
            isSingleLine={true}
            templateOptions={[
              "Professional Title",
              "Creative Headline",
              "Catchy Phrase",
              "Brand Statement"
            ]}
          />
          <PositionControls elementType="title" />
        </div>

        {/* Other Content Section */}
        <div className="space-y-3">
          <TextEditor
            id="content-editor"
            label="Other Content"
            valueSelector={(state) => state.editor.otherContent}
            actionCreator={setOtherContent}
            rows={4}
            templateOptions={[
              "Add your professional description here",
              "Tell your story in a few words",
              "Highlight your key achievements",
              "Share your mission statement"
            ]}
          />
          <PositionControls elementType="content" />
        </div>

        {/* CTA/Website Section */}
        <div className="space-y-3">
          <TextEditor
            id="cta-editor"
            label="CTA / Website"
            valueSelector={(state) => state.editor.ctaWebsite}
            actionCreator={setCtaWebsite}
            isSingleLine={true}
            templateOptions={[
              "Learn More",
              "Get Started",
              "Contact Us",
              "Visit Website"
            ]}
          />
          <PositionControls elementType="cta" />
        </div>

        {/* Media Upload Section */}
        <MediaUploadSection />

        {/* Download Section */}
        <DownloadSection />
      </div>

      <div className="flex-grow"></div>
      <p className="text-sm text-gray-500 text-center mt-4">InstantBranding v{manifest.version}</p>
    </div>
  );
};

export default Sidebar;