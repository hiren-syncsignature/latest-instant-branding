// // import React, { useCallback } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { RootState, AppDispatch } from '../../store';
// // import { setBackgroundColor } from '../../store/editorSlice';

// // const BackgroundEditor: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const color = useSelector((state: RootState) => state.editor.backgroundColor);

// //   const handleChange = useCallback((newColor: string) => {
// //     dispatch(setBackgroundColor(newColor));
// //   }, [dispatch]);

// //   const generateRandomColor = useCallback(() => {
// //     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
// //     handleChange(randomColor);
// //   }, [handleChange]);

// //   return (
// //     <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
// //       <p className="font-medium text-gray-700 mb-2">Background</p>
// //       <div className="flex items-center space-x-2">
// //         <input
// //           type="color"
// //           value={color}
// //           onChange={(e) => handleChange(e.target.value)}
// //           className="w-8 h-8 border-none cursor-pointer p-0 rounded shadow-inner"
// //         />
// //         <span className="text-sm text-gray-600 font-mono">{color}</span>
// //       </div>
// //       <div className="flex space-x-2 mt-2">
// //         <button
// //           className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50"
// //           disabled
// //         >
// //           Gradient
// //         </button>
// //         <button
// //           onClick={generateRandomColor}
// //           className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100"
// //         >
// //           Random
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BackgroundEditor;

// import React, { useCallback, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../store";
// import { setBackgroundColor } from "../../store/editorSlice";

// const BackgroundEditor = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const color = useSelector((state: RootState) => state.editor.backgroundColor);
//   const [activeTab, setActiveTab] = useState("solid");

//   // Preset colors for quick selection
//   const presetColors = [
//     "#1a365d",
//     "#2563eb",
//     "#4338ca",
//     "#7e22ce",
//     "#be185d",
//     "#dc2626",
//     "#ea580c",
//     "#d97706",
//     "#65a30d",
//     "#0d9488",
//     "#0891b2",
//     "#6b7280",
//     "#1e293b",
//     "#000000",
//     "#ffffff",
//   ];

//   const handleChange = useCallback(
//     (newColor) => {
//       dispatch(setBackgroundColor(newColor));
//     },
//     [dispatch]
//   );

//   const generateRandomColor = useCallback(() => {
//     const randomColor =
//       "#" +
//       Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0");
//     handleChange(randomColor);
//   }, [handleChange]);

//   return (
//     <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
//       <div className="flex border-b border-gray-200">
//         <button
//           className={`flex-1 py-2 text-sm font-medium ${
//             activeTab === "solid"
//               ? "bg-gray-50 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//           onClick={() => setActiveTab("solid")}
//         >
//           Solid Color
//         </button>
//         <button
//           className={`flex-1 py-2 text-sm font-medium ${
//             activeTab === "gradient"
//               ? "bg-gray-50 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//           onClick={() => setActiveTab("gradient")}
//           disabled
//         >
//           Gradient
//         </button>
//         <button
//           className={`flex-1 py-2 text-sm font-medium ${
//             activeTab === "image"
//               ? "bg-gray-50 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//           onClick={() => setActiveTab("image")}
//           disabled
//         >
//           Image
//         </button>
//       </div>

//       <div className="p-4">
//         <h3 className="font-medium text-gray-700 mb-3">Background</h3>

//         {activeTab === "solid" && (
//           <>
//             <div className="flex items-center space-x-3 mb-3">
//               <div
//                 className="w-10 h-10 rounded border shadow-inner"
//                 style={{ backgroundColor: color }}
//               />
//               <div className="flex-1 flex items-center space-x-2">
//                 <input
//                   type="color"
//                   value={color}
//                   onChange={(e) => handleChange(e.target.value)}
//                   className="w-8 h-8 border-none cursor-pointer p-0 rounded"
//                 />
//                 <input
//                   type="text"
//                   value={color}
//                   onChange={(e) => handleChange(e.target.value)}
//                   className="flex-1 text-sm px-3 py-1.5 border border-gray-300 rounded font-mono"
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="text-sm text-gray-600 mb-2">Presets</div>
//               <div className="grid grid-cols-5 gap-2">
//                 {presetColors.map((presetColor) => (
//                   <button
//                     key={presetColor}
//                     className={`w-full h-6 rounded ${
//                       presetColor === color
//                         ? "ring-2 ring-blue-500 ring-offset-1"
//                         : "border border-gray-200"
//                     }`}
//                     style={{ backgroundColor: presetColor }}
//                     onClick={() => handleChange(presetColor)}
//                     title={presetColor}
//                   />
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={generateRandomColor}
//               className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 text-gray-700"
//             >
//               Random Color
//             </button>
//           </>
//         )}

//         {activeTab === "gradient" && (
//           <div className="text-center text-sm text-gray-500 py-4">
//             Gradient backgrounds coming soon
//           </div>
//         )}

//         {activeTab === "image" && (
//           <div className="text-center text-sm text-gray-500 py-4">
//             Image backgrounds coming soon
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BackgroundEditor;
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  setBackgroundColor,
  setBackgroundGradient,
} from "../../store/editorSlice";

const BackgroundEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { backgroundColor, backgroundGradient } = useSelector(
    (state: RootState) => state.editor
  );
  const [activeTab, setActiveTab] = useState(
    backgroundGradient ? "gradient" : "solid"
  );
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [gradientColors, setGradientColors] = useState<string[]>(
    backgroundGradient
      ? backgroundGradient.colors
      : ["#4f46e5", "#2563eb", "#3b82f6"]
  );

  // Theme colors (professional color schemes)
  const themePresets = [
    {
      name: "Blue Professional",
      colors: ["#1e3a8a", "#1d4ed8", "#3b82f6"],
      backgroundColor: "#1e40af",
    },
    {
      name: "Green Nature",
      colors: ["#064e3b", "#059669", "#10b981"],
      backgroundColor: "#047857",
    },
    {
      name: "Purple Creative",
      colors: ["#4c1d95", "#6d28d9", "#8b5cf6"],
      backgroundColor: "#5b21b6",
    },
    {
      name: "Red Dynamic",
      colors: ["#7f1d1d", "#b91c1c", "#ef4444"],
      backgroundColor: "#dc2626",
    },
    {
      name: "Orange Vibrant",
      colors: ["#7c2d12", "#c2410c", "#f97316"],
      backgroundColor: "#ea580c",
    },
    {
      name: "Teal Calm",
      colors: ["#134e4a", "#0f766e", "#14b8a6"],
      backgroundColor: "#0d9488",
    },
  ];

  // Preset gradient combinations
  const gradientPresets = [
    {
      name: "Ocean Blue",
      colors: ["#1e3a8a", "#3b82f6", "#93c5fd"],
      type: "linear",
      direction: "to right",
    },
    {
      name: "Sunset",
      colors: ["#7f1d1d", "#ea580c", "#fcd34d"],
      type: "linear",
      direction: "to right",
    },
    {
      name: "Forest",
      colors: ["#064e3b", "#059669", "#a3e635"],
      type: "linear",
      direction: "to right",
    },
    {
      name: "Berry",
      colors: ["#4c1d95", "#be185d", "#e11d48"],
      type: "linear",
      direction: "to right",
    },
    {
      name: "Sky",
      colors: ["#0c4a6e", "#0ea5e9", "#bae6fd"],
      type: "linear",
      direction: "to bottom right",
    },
    {
      name: "Fire",
      colors: ["#b45309", "#dc2626", "#fbbf24"],
      type: "radial",
      direction: "circle",
    },
  ];

  const handleColorChange = useCallback(
    (newColor: string) => {
      dispatch(setBackgroundColor(newColor));

      // If we're in solid mode, update the color
      if (activeTab === "solid") {
        setActiveTab("solid"); // Ensure we stay in solid mode
      }
    },
    [dispatch, activeTab]
  );

  const handleGradientColorChange = useCallback(
    (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);

      updateGradient(gradientType, gradientDirection, newColors);
    },
    [gradientColors, gradientType, gradientDirection]
  );

  const handleGradientTypeChange = useCallback(
    (type: string) => {
      setGradientType(type);
      updateGradient(type, gradientDirection, gradientColors);
    },
    [gradientDirection, gradientColors]
  );

  const handleGradientDirectionChange = useCallback(
    (direction: string) => {
      setGradientDirection(direction);
      updateGradient(gradientType, direction, gradientColors);
    },
    [gradientType, gradientColors]
  );

  const updateGradient = useCallback(
    (type: string, direction: string, colors: string[]) => {
      const gradientCSS =
        type === "linear"
          ? `linear-gradient(${direction}, ${colors.join(", ")})`
          : `radial-gradient(${direction}, ${colors.join(", ")})`;

      dispatch(
        setBackgroundGradient({
          type,
          direction,
          colors,
          css: gradientCSS,
        })
      );

      // Also switch to gradient tab
      setActiveTab("gradient");
    },
    [dispatch]
  );

  const applyThemePreset = (preset: (typeof themePresets)[0]) => {
    if (activeTab === "solid") {
      handleColorChange(preset.backgroundColor);
    } else {
      updateGradient("linear", "to right", preset.colors);
    }
  };

  const applyGradientPreset = (preset: (typeof gradientPresets)[0]) => {
    updateGradient(preset.type, preset.direction, preset.colors);
    setGradientType(preset.type);
    setGradientDirection(preset.direction);
    setGradientColors(preset.colors);
    setActiveTab("gradient");
  };

  const generateRandomColor = useCallback(() => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    handleColorChange(randomColor);
  }, [handleColorChange]);

  const generateRandomGradient = useCallback(() => {
    // Create 2-3 random colors
    const numColors = Math.floor(Math.random() * 2) + 2; // 2-3 colors
    const colors = Array(numColors)
      .fill("")
      .map(
        () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
      );

    // Random type and direction
    const types = ["linear", "radial"];
    const linearDirections = [
      "to right",
      "to bottom",
      "to left",
      "to top",
      "to bottom right",
      "to bottom left",
      "to top right",
      "to top left",
    ];
    const radialDirections = ["circle", "ellipse"];

    const type = types[Math.floor(Math.random() * types.length)];
    const direction =
      type === "linear"
        ? linearDirections[Math.floor(Math.random() * linearDirections.length)]
        : radialDirections[Math.floor(Math.random() * radialDirections.length)];

    updateGradient(type, direction, colors);
    setGradientType(type);
    setGradientDirection(direction);
    setGradientColors(colors);
    setActiveTab("gradient");
  }, [updateGradient]);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === "solid"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("solid")}
        >
          Solid Color
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === "gradient"
              ? "bg-gray-50 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("gradient")}
        >
          Gradient
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
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

      <div className="p-3">
        <h3 className="font-medium text-gray-700 mb-2 text-sm">Background</h3>

        {/* Theme Presets */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Theme Colors</span>
            <button
              onClick={
                activeTab === "solid"
                  ? generateRandomColor
                  : generateRandomGradient
              }
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Randomize
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {themePresets.map((preset, index) => (
              <button
                key={index}
                className="h-8 rounded border overflow-hidden relative hover:border-blue-500 transition-colors"
                onClick={() => applyThemePreset(preset)}
                title={preset.name}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(to right, ${preset.colors.join(
                      ", "
                    )})`,
                  }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "solid" && (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-10 h-10 rounded border shadow-inner"
                style={{ backgroundColor: backgroundColor }}
              />
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-8 border-none cursor-pointer p-0 rounded"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 text-sm px-3 py-1.5 border border-gray-300 rounded font-mono"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "gradient" && (
          <>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Gradient Presets</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {gradientPresets.map((preset, index) => (
                  <button
                    key={index}
                    className="h-8 rounded border overflow-hidden relative hover:border-blue-500 transition-colors"
                    onClick={() => applyGradientPreset(preset)}
                    title={preset.name}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          preset.type === "linear"
                            ? `linear-gradient(${
                                preset.direction
                              }, ${preset.colors.join(", ")})`
                            : `radial-gradient(${
                                preset.direction
                              }, ${preset.colors.join(", ")})`,
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Gradient Type</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleGradientTypeChange("linear")}
                  className={`flex-1 px-3 py-1.5 text-xs border rounded ${
                    gradientType === "linear"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => handleGradientTypeChange("radial")}
                  className={`flex-1 px-3 py-1.5 text-xs border rounded ${
                    gradientType === "radial"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>

            {gradientType === "linear" && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Direction</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "to right",
                    "to bottom",
                    "to bottom right",
                    "to bottom left",
                  ].map((direction) => (
                    <button
                      key={direction}
                      onClick={() => handleGradientDirectionChange(direction)}
                      className={`p-1 border rounded text-xs ${
                        gradientDirection === direction
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {direction.replace("to ", "").replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gradientType === "radial" && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Shape</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleGradientDirectionChange("circle")}
                    className={`flex-1 px-3 py-1.5 text-xs border rounded ${
                      gradientDirection === "circle"
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    Circle
                  </button>
                  <button
                    onClick={() => handleGradientDirectionChange("ellipse")}
                    className={`flex-1 px-3 py-1.5 text-xs border rounded ${
                      gradientDirection === "ellipse"
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    Ellipse
                  </button>
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Gradient Colors</span>
                <div className="flex space-x-1">
                  {gradientColors.length < 5 && (
                    <button
                      onClick={() => {
                        const newColors = [...gradientColors, "#ffffff"];
                        setGradientColors(newColors);
                        updateGradient(
                          gradientType,
                          gradientDirection,
                          newColors
                        );
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      + Add
                    </button>
                  )}
                  {gradientColors.length > 2 && (
                    <button
                      onClick={() => {
                        const newColors = [...gradientColors];
                        newColors.pop();
                        setGradientColors(newColors);
                        updateGradient(
                          gradientType,
                          gradientDirection,
                          newColors
                        );
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      - Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-none">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) =>
                          handleGradientColorChange(index, e.target.value)
                        }
                        className="w-6 h-6 border-none cursor-pointer p-0 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) =>
                        handleGradientColorChange(index, e.target.value)
                      }
                      className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="h-10 rounded-md border overflow-hidden mb-3"
              style={{
                background:
                  backgroundGradient?.css ||
                  `linear-gradient(to right, ${gradientColors.join(", ")})`,
              }}
            ></div>
          </>
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
