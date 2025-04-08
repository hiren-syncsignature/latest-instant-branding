// import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import {
//   setTitleAlign,
//   setContentAlign,
//   setCtaAlign
// } from '../../store/editorSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faAlignLeft,
//   faAlignCenter,
//   faAlignRight,
//   faArrowUp,
//   faArrowDown,
//   faArrowLeft,
//   faArrowRight
// } from '@fortawesome/free-solid-svg-icons';

// interface PositionControlsProps {
//   elementType: 'title' | 'content' | 'cta';
// }

// const PositionControls: React.FC<PositionControlsProps> = ({ elementType }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const align = useSelector((state: RootState) => state.editor.bannerStyle[`${elementType}Align`]);

//   const handleAlignChange = useCallback((newAlign: 'left' | 'center' | 'right') => {
//     switch (elementType) {
//       case 'title':
//         dispatch(setTitleAlign(newAlign));
//         break;
//       case 'content':
//         dispatch(setContentAlign(newAlign));
//         break;
//       case 'cta':
//         dispatch(setCtaAlign(newAlign));
//         break;
//     }
//   }, [dispatch, elementType]);

//   return (
//     <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
//       <h3 className="font-medium text-gray-700 capitalize">{elementType} Position</h3>

//       <div className="space-y-3">
//         {/* Horizontal Alignment */}
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600">Align:</span>
//           <div className="flex space-x-1">
//             <button
//               onClick={() => handleAlignChange('left')}
//               className={`p-2 rounded ${align === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Left"
//             >
//               <FontAwesomeIcon icon={faAlignLeft} />
//             </button>
//             <button
//               onClick={() => handleAlignChange('center')}
//               className={`p-2 rounded ${align === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Center"
//             >
//               <FontAwesomeIcon icon={faAlignCenter} />
//             </button>
//             <button
//               onClick={() => handleAlignChange('right')}
//               className={`p-2 rounded ${align === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
//               title="Align Right"
//             >
//               <FontAwesomeIcon icon={faAlignRight} />
//             </button>
//           </div>
//         </div>

//         {/* Vertical Position (Grid Layout) */}
//         <div className="grid grid-cols-3 gap-2">
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowUp} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowUp} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowUp} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </button>
//           <div className="p-2 text-center text-gray-400">Center</div>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowRight} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowDown} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowDown} />
//           </button>
//           <button className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
//             <FontAwesomeIcon icon={faArrowDown} />
//           </button>
//         </div>

//         <p className="text-xs text-gray-400 italic">
//           Vertical positioning coming soon
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PositionControls;

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  setTitleAlign,
  setContentAlign,
  setCtaAlign,
  setTitleColor,
  setContentColor,
  setCtaColor,
} from "../../store/editorSlice";

interface PositionControlsProps {
  elementType: "title" | "content" | "cta";
}

const PositionControls: React.FC<PositionControlsProps> = ({ elementType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const align = useSelector(
    (state: RootState) => state.editor.bannerStyle[`${elementType}Align`]
  );
  const color = useSelector(
    (state: RootState) => state.editor.bannerStyle[`${elementType}Color`]
  );

  // Display name map for a more user-friendly UI
  const displayNames = {
    title: "Title",
    content: "Content",
    cta: "Call to Action",
  };

  // Action selector based on element type
  const handleAlignChange = useCallback(
    (newAlign: "left" | "center" | "right") => {
      switch (elementType) {
        case "title":
          dispatch(setTitleAlign(newAlign));
          break;
        case "content":
          dispatch(setContentAlign(newAlign));
          break;
        case "cta":
          dispatch(setCtaAlign(newAlign));
          break;
      }
    },
    [dispatch, elementType]
  );

  // Color change handler
  const handleColorChange = useCallback(
    (newColor: string) => {
      switch (elementType) {
        case "title":
          dispatch(setTitleColor(newColor));
          break;
        case "content":
          dispatch(setContentColor(newColor));
          break;
        case "cta":
          dispatch(setCtaColor(newColor));
          break;
      }
    },
    [dispatch, elementType]
  );

  // Common color presets
  const colorPresets = [
    "#ffffff",
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
  ];

  return (
    <div className="border-t border-gray-200 pt-3 mt-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {displayNames[elementType]} Style
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => handleAlignChange("left")}
            className={`p-1.5 rounded ${
              align === "left"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            title="Align Left"
          >
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
            >
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </button>
          <button
            onClick={() => handleAlignChange("center")}
            className={`p-1.5 rounded ${
              align === "center"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            title="Align Center"
          >
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
            >
              <line x1="18" y1="10" x2="6" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="18" y1="18" x2="6" y2="18"></line>
            </svg>
          </button>
          <button
            onClick={() => handleAlignChange("right")}
            className={`p-1.5 rounded ${
              align === "right"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            title="Align Right"
          >
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
            >
              <line x1="21" y1="10" x2="7" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="21" y1="18" x2="7" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Color picker */}
      <div className="flex items-center space-x-2 mb-2">
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
          className="text-gray-500"
        >
          <circle cx="13.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="10.5" r="2.5"></circle>
          <circle cx="8.5" cy="7.5" r="2.5"></circle>
          <circle cx="6.5" cy="12.5" r="2.5"></circle>
          <path d="M12 22C12 22 20 18 20 12V4L12 2 4 4v8c0 6 8 10 8 10z"></path>
        </svg>
        <span className="text-sm text-gray-600">Color:</span>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-5 h-5 border-none rounded p-0"
          title="Choose color"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="flex-1 text-xs px-2 py-0.5 border border-gray-300 rounded font-mono"
        />
      </div>

      {/* Color presets */}
      <div className="flex flex-wrap gap-1">
        {colorPresets.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => handleColorChange(presetColor)}
            className={`w-5 h-5 rounded-full border ${
              color === presetColor ? "ring-1 ring-blue-500" : ""
            }`}
            style={{ backgroundColor: presetColor }}
            title={presetColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PositionControls;
