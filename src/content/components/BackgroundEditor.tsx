// import React, { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import { setBackgroundColor } from '../../store/editorSlice';

// const BackgroundEditor: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const color = useSelector((state: RootState) => state.editor.backgroundColor);

//   const handleChange = useCallback((newColor: string) => {
//     dispatch(setBackgroundColor(newColor));
//   }, [dispatch]);

//   const generateRandomColor = useCallback(() => {
//     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
//     handleChange(randomColor);
//   }, [handleChange]);

//   return (
//     <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
//       <p className="font-medium text-gray-700 mb-2">Background</p>
//       <div className="flex items-center space-x-2">
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => handleChange(e.target.value)}
//           className="w-8 h-8 border-none cursor-pointer p-0 rounded shadow-inner"
//         />
//         <span className="text-sm text-gray-600 font-mono">{color}</span>
//       </div>
//       <div className="flex space-x-2 mt-2">
//         <button
//           className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50"
//           disabled
//         >
//           Gradient
//         </button>
//         <button
//           onClick={generateRandomColor}
//           className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100"
//         >
//           Random
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BackgroundEditor;

import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setBackgroundColor } from "../../store/editorSlice";

const BackgroundEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const color = useSelector((state: RootState) => state.editor.backgroundColor);
  const [activeTab, setActiveTab] = useState("solid");

  // Preset colors for quick selection
  const presetColors = [
    "#1a365d",
    "#2563eb",
    "#4338ca",
    "#7e22ce",
    "#be185d",
    "#dc2626",
    "#ea580c",
    "#d97706",
    "#65a30d",
    "#0d9488",
    "#0891b2",
    "#6b7280",
    "#1e293b",
    "#000000",
    "#ffffff",
  ];

  const handleChange = useCallback(
    (newColor) => {
      dispatch(setBackgroundColor(newColor));
    },
    [dispatch]
  );

  const generateRandomColor = useCallback(() => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    handleChange(randomColor);
  }, [handleChange]);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "solid"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("solid")}
        >
          Solid Color
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "gradient"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("gradient")}
          disabled
        >
          Gradient
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "image"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("image")}
          disabled
        >
          Image
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-700 mb-3">Background</h3>

        {activeTab === "solid" && (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-10 h-10 rounded border shadow-inner"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-8 h-8 border-none cursor-pointer p-0 rounded"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleChange(e.target.value)}
                  className="flex-1 text-sm px-3 py-1.5 border border-gray-300 rounded font-mono"
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-600 mb-2">Presets</div>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-full h-6 rounded ${
                      presetColor === color
                        ? "ring-2 ring-blue-500 ring-offset-1"
                        : "border border-gray-200"
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleChange(presetColor)}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={generateRandomColor}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 text-gray-700"
            >
              Random Color
            </button>
          </>
        )}

        {activeTab === "gradient" && (
          <div className="text-center text-sm text-gray-500 py-4">
            Gradient backgrounds coming soon
          </div>
        )}

        {activeTab === "image" && (
          <div className="text-center text-sm text-gray-500 py-4">
            Image backgrounds coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundEditor;
