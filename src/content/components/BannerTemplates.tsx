// // // import React, { useCallback } from 'react';
// // // import { useDispatch } from 'react-redux';
// // // import { AppDispatch } from '../../store';
// // // import {
// // //   setBackgroundColor,
// // //   setTitle,
// // //   setOtherContent,
// // //   setCtaWebsite,
// // //   setBannerStyle
// // // } from '../../store/editorSlice';

// // // interface BannerTemplate {
// // //   id: string;
// // //   name: string;
// // //   backgroundColor: string;
// // //   title: string;
// // //   content: string;
// // //   cta: string;
// // //   style: {
// // //     titleAlign: 'left' | 'center' | 'right';
// // //     contentAlign: 'left' | 'center' | 'right';
// // //     ctaAlign: 'left' | 'center' | 'right';
// // //     titleColor: string;
// // //     contentColor: string;
// // //     ctaColor: string;
// // //   };
// // // }

// // // const templates: BannerTemplate[] = [
// // //   {
// // //     id: 'professional',
// // //     name: 'Professional',
// // //     backgroundColor: '#1a365d',
// // //     title: 'Professional Title',
// // //     content: 'Add your professional description here. Keep it concise and impactful.',
// // //     cta: 'Learn More',
// // //     style: {
// // //       titleAlign: 'center',
// // //       contentAlign: 'center',
// // //       ctaAlign: 'center',
// // //       titleColor: '#ffffff',
// // //       contentColor: '#e2e8f0',
// // //       ctaColor: '#60a5fa'
// // //     }
// // //   },
// // //   {
// // //     id: 'modern',
// // //     name: 'Modern',
// // //     backgroundColor: '#4f46e5',
// // //     title: 'Modern Design',
// // //     content: 'A contemporary approach to your message. Clean and stylish.',
// // //     cta: 'Explore',
// // //     style: {
// // //       titleAlign: 'left',
// // //       contentAlign: 'left',
// // //       ctaAlign: 'right',
// // //       titleColor: '#ffffff',
// // //       contentColor: '#e2e8f0',
// // //       ctaColor: '#fbbf24'
// // //     }
// // //   },
// // //   {
// // //     id: 'minimal',
// // //     name: 'Minimal',
// // //     backgroundColor: '#f3f4f6',
// // //     title: 'Minimal Style',
// // //     content: 'Less is more. Simple and elegant design.',
// // //     cta: 'Discover',
// // //     style: {
// // //       titleAlign: 'center',
// // //       contentAlign: 'center',
// // //       ctaAlign: 'center',
// // //       titleColor: '#1f2937',
// // //       contentColor: '#4b5563',
// // //       ctaColor: '#3b82f6'
// // //     }
// // //   },
// // //   {
// // //     id: 'bold',
// // //     name: 'Bold',
// // //     backgroundColor: '#dc2626',
// // //     title: 'Make a Statement',
// // //     content: 'Bold colors for bold messages. Stand out from the crowd.',
// // //     cta: 'Get Started',
// // //     style: {
// // //       titleAlign: 'center',
// // //       contentAlign: 'center',
// // //       ctaAlign: 'center',
// // //       titleColor: '#ffffff',
// // //       contentColor: '#fecaca',
// // //       ctaColor: '#ffffff'
// // //     }
// // //   }
// // // ];

// // // const BannerTemplates: React.FC = () => {
// // //   const dispatch = useDispatch<AppDispatch>();

// // //   const applyTemplate = useCallback((template: BannerTemplate) => {
// // //     dispatch(setBackgroundColor(template.backgroundColor));
// // //     dispatch(setTitle(template.title));
// // //     dispatch(setOtherContent(template.content));
// // //     dispatch(setCtaWebsite(template.cta));
// // //     dispatch(setBannerStyle(template.style));
// // //   }, [dispatch]);

// // //   const randomizeTemplate = useCallback(() => {
// // //     const randomIndex = Math.floor(Math.random() * templates.length);
// // //     applyTemplate(templates[randomIndex]);
// // //   }, [applyTemplate]);

// // //   return (
// // //     <div className="space-y-4 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
// // //       <div className="flex justify-between items-center">
// // //         <h3 className="font-medium text-gray-700">Banner Templates</h3>
// // //         <button
// // //           onClick={randomizeTemplate}
// // //           className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// // //         >
// // //           Randomize
// // //         </button>
// // //       </div>

// // //       <div className="grid grid-cols-2 gap-3">
// // //         {templates.map((template) => (
// // //           <button
// // //             key={template.id}
// // //             onClick={() => applyTemplate(template)}
// // //             className="p-3 border rounded hover:border-blue-500 transition-colors"
// // //             style={{ backgroundColor: template.backgroundColor }}
// // //           >
// // //             <div className="space-y-1">
// // //               <h4 className="text-sm font-medium" style={{ color: template.style.titleColor }}>
// // //                 {template.name}
// // //               </h4>
// // //               <p className="text-xs" style={{ color: template.style.contentColor }}>
// // //                 {template.content.substring(0, 30)}...
// // //               </p>
// // //             </div>
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BannerTemplates;

// // import React, { useCallback } from "react";
// // import { useDispatch } from "react-redux";
// // import { AppDispatch } from "../../store";
// // import {
// //   setBackgroundColor,
// //   setTitle,
// //   setOtherContent,
// //   setCtaWebsite,
// //   setBannerStyle,
// // } from "../../store/editorSlice";

// // // Interface for banner template structure
// // interface BannerTemplate {
// //   id: string;
// //   name: string;
// //   backgroundColor: string;
// //   title: string;
// //   content: string;
// //   cta: string;
// //   style: {
// //     titleAlign: "left" | "center" | "right";
// //     contentAlign: "left" | "center" | "right";
// //     ctaAlign: "left" | "center" | "right";
// //     titleColor: string;
// //     contentColor: string;
// //     ctaColor: string;
// //   };
// // }

// // // Enhanced templates with more variety
// // const templates: BannerTemplate[] = [
// //   {
// //     id: "professional",
// //     name: "Professional",
// //     backgroundColor: "#1e40af",
// //     title: "Professional Title",
// //     content:
// //       "Add your professional description here. Keep it concise and impactful.",
// //     cta: "Learn More",
// //     style: {
// //       titleAlign: "center",
// //       contentAlign: "center",
// //       ctaAlign: "center",
// //       titleColor: "#ffffff",
// //       contentColor: "#e2e8f0",
// //       ctaColor: "#93c5fd",
// //     },
// //   },
// //   {
// //     id: "modern",
// //     name: "Modern",
// //     backgroundColor: "#4f46e5",
// //     title: "Modern Design",
// //     content: "A contemporary approach to your message. Clean and stylish.",
// //     cta: "Explore",
// //     style: {
// //       titleAlign: "left",
// //       contentAlign: "left",
// //       ctaAlign: "left",
// //       titleColor: "#ffffff",
// //       contentColor: "#e2e8f0",
// //       ctaColor: "#fbbf24",
// //     },
// //   },
// //   {
// //     id: "minimal",
// //     name: "Minimal",
// //     backgroundColor: "#f8fafc",
// //     title: "Minimal Style",
// //     content: "Less is more. Simple and elegant design.",
// //     cta: "Discover",
// //     style: {
// //       titleAlign: "center",
// //       contentAlign: "center",
// //       ctaAlign: "center",
// //       titleColor: "#0f172a",
// //       contentColor: "#475569",
// //       ctaColor: "#3b82f6",
// //     },
// //   },
// //   {
// //     id: "bold",
// //     name: "Bold",
// //     backgroundColor: "#dc2626",
// //     title: "Make a Statement",
// //     content: "Bold colors for bold messages. Stand out from the crowd.",
// //     cta: "Get Started",
// //     style: {
// //       titleAlign: "center",
// //       contentAlign: "center",
// //       ctaAlign: "center",
// //       titleColor: "#ffffff",
// //       contentColor: "#fecaca",
// //       ctaColor: "#ffffff",
// //     },
// //   },
// //   {
// //     id: "creative",
// //     name: "Creative",
// //     backgroundColor: "#7e22ce",
// //     title: "Creative Solutions",
// //     content: "Innovative ideas deserve beautiful presentation.",
// //     cta: "Let's Create",
// //     style: {
// //       titleAlign: "right",
// //       contentAlign: "right",
// //       ctaAlign: "right",
// //       titleColor: "#ffffff",
// //       contentColor: "#e9d5ff",
// //       ctaColor: "#a5b4fc",
// //     },
// //   },
// //   {
// //     id: "corporate",
// //     name: "Corporate",
// //     backgroundColor: "#1e293b",
// //     title: "Corporate Excellence",
// //     content: "Professional solutions for business growth and success.",
// //     cta: "Contact Us",
// //     style: {
// //       titleAlign: "left",
// //       contentAlign: "left",
// //       ctaAlign: "right",
// //       titleColor: "#ffffff",
// //       contentColor: "#cbd5e1",
// //       ctaColor: "#38bdf8",
// //     },
// //   },
// // ];

// // const BannerTemplates = () => {
// //   const dispatch = useDispatch<AppDispatch>();

// //   const applyTemplate = useCallback(
// //     (template: BannerTemplate) => {
// //       dispatch(setBackgroundColor(template.backgroundColor));
// //       dispatch(setTitle(template.title));
// //       dispatch(setOtherContent(template.content));
// //       dispatch(setCtaWebsite(template.cta));
// //       dispatch(setBannerStyle(template.style));
// //     },
// //     [dispatch]
// //   );

// //   const randomizeTemplate = useCallback(() => {
// //     const randomIndex = Math.floor(Math.random() * templates.length);
// //     applyTemplate(templates[randomIndex]);
// //   }, [applyTemplate]);

// //   return (
// //     <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
// //       <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
// //         <h3 className="font-medium text-gray-700">Templates</h3>
// //         <button
// //           onClick={randomizeTemplate}
// //           className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
// //         >
// //           Randomize
// //         </button>
// //       </div>

// //       <div className="p-4">
// //         <div className="grid grid-cols-2 gap-3">
// //           {templates.map((template) => (
// //             <button
// //               key={template.id}
// //               onClick={() => applyTemplate(template)}
// //               className="group p-3 border rounded-md hover:border-blue-500 transition-all hover:shadow-md"
// //               style={{ backgroundColor: template.backgroundColor }}
// //             >
// //               <div className="space-y-1">
// //                 <h4
// //                   className="text-sm font-medium truncate"
// //                   style={{ color: template.style.titleColor }}
// //                 >
// //                   {template.name}
// //                 </h4>
// //                 <p
// //                   className="text-xs opacity-80 line-clamp-2"
// //                   style={{ color: template.style.contentColor }}
// //                 >
// //                   {template.content.substring(0, 30)}...
// //                 </p>
// //                 <p
// //                   className="text-xs opacity-0 group-hover:opacity-100 transition-opacity underline"
// //                   style={{ color: template.style.ctaColor }}
// //                 >
// //                   {template.cta}
// //                 </p>
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BannerTemplates;

// const BannerTemplates = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const applyTemplate = useCallback(
//     (template: BannerTemplate) => {
//       // Apply background (gradient or solid color)
//       if (template.gradient) {
//         dispatch(setBackgroundGradient(template.gradient));
//       } else {
//         dispatch(setBackgroundColor(template.backgroundColor));
//       }

//       dispatch(setTitle(template.title));
//       dispatch(setOtherContent(template.content));
//       dispatch(setCtaWebsite(template.cta));
//       dispatch(setBannerStyle(template.style));
//     },
//     [dispatch]
//   );

//   const randomizeTemplate = useCallback(() => {
//     const randomIndex = Math.floor(Math.random() * templates.length);
//     applyTemplate(templates[randomIndex]);
//   }, [applyTemplate]);

//   return (
//     <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
//       <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="font-medium text-gray-700 text-sm">Theme Selection</h3>
//         <button
//           onClick={randomizeTemplate}
//           className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors flex items-center"
//         >
//           Randomize
//         </button>
//       </div>

//       <div className="p-3">
//         <div className="grid grid-cols-4 gap-2">
//           {templates.map((template) => (
//             <button
//               key={template.id}
//               onClick={() => applyTemplate(template)}
//               className="relative h-12 rounded overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
//               title={template.name}
//             >
//               <div
//                 className="absolute inset-0 w-full h-full"
//                 style={{
//                   background: template.gradient
//                     ? template.gradient.css
//                     : template.backgroundColor,
//                 }}
//               ></div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerTemplates;
// import React, { useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store";
// import {
//   setBackgroundColor,
//   setBackgroundGradient,
//   setTitle,
//   setOtherContent,
//   setCtaWebsite,
//   setBannerStyle,
// } from "../../store/editorSlice";

// // Interface for banner template structure
// interface BannerTemplate {
//   id: string;
//   name: string;
//   backgroundColor: string;
//   gradient?: {
//     type: "linear" | "radial";
//     direction: string;
//     colors: string[];
//     css: string;
//   };
//   title: string;
//   content: string;
//   cta: string;
//   style: {
//     titleAlign: "left" | "center" | "right";
//     contentAlign: "left" | "center" | "right";
//     ctaAlign: "left" | "center" | "right";
//     titleColor: string;
//     contentColor: string;
//     ctaColor: string;
//   };
// }

// // Enhanced templates with more variety and gradient support
// const templates: BannerTemplate[] = [
//   {
//     id: "professional-1",
//     name: "Professional Blue",
//     backgroundColor: "#1e40af", // Fallback for non-gradient
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#1e3a8a", "#1d4ed8", "#3b82f6"],
//       css: "linear-gradient(to right, #1e3a8a, #1d4ed8, #3b82f6)",
//     },
//     title: "Professional Title",
//     content:
//       "Add your professional description here. Keep it concise and impactful.",
//     cta: "Learn More",
//     style: {
//       titleAlign: "center",
//       contentAlign: "center",
//       ctaAlign: "center",
//       titleColor: "#ffffff",
//       contentColor: "#e2e8f0",
//       ctaColor: "#93c5fd",
//     },
//   },
//   {
//     id: "modern-1",
//     name: "Modern Indigo",
//     backgroundColor: "#4f46e5",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#4338ca", "#4f46e5", "#818cf8"],
//       css: "linear-gradient(to right, #4338ca, #4f46e5, #818cf8)",
//     },
//     title: "Modern Design",
//     content: "A contemporary approach to your message. Clean and stylish.",
//     cta: "Explore",
//     style: {
//       titleAlign: "left",
//       contentAlign: "left",
//       ctaAlign: "left",
//       titleColor: "#ffffff",
//       contentColor: "#e2e8f0",
//       ctaColor: "#fbbf24",
//     },
//   },
//   {
//     id: "minimal-1",
//     name: "Minimal White",
//     backgroundColor: "#f8fafc",
//     title: "Minimal Style",
//     content: "Less is more. Simple and elegant design.",
//     cta: "Discover",
//     style: {
//       titleAlign: "center",
//       contentAlign: "center",
//       ctaAlign: "center",
//       titleColor: "#0f172a",
//       contentColor: "#475569",
//       ctaColor: "#3b82f6",
//     },
//   },
//   {
//     id: "bold-1",
//     name: "Bold Red",
//     backgroundColor: "#dc2626",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#991b1b", "#dc2626", "#ef4444"],
//       css: "linear-gradient(to right, #991b1b, #dc2626, #ef4444)",
//     },
//     title: "Make a Statement",
//     content: "Bold colors for bold messages. Stand out from the crowd.",
//     cta: "Get Started",
//     style: {
//       titleAlign: "center",
//       contentAlign: "center",
//       ctaAlign: "center",
//       titleColor: "#ffffff",
//       contentColor: "#fecaca",
//       ctaColor: "#ffffff",
//     },
//   },
//   {
//     id: "creative-1",
//     name: "Creative Purple",
//     backgroundColor: "#7e22ce",
//     gradient: {
//       type: "linear",
//       direction: "to bottom right",
//       colors: ["#6b21a8", "#7e22ce", "#a855f7"],
//       css: "linear-gradient(to bottom right, #6b21a8, #7e22ce, #a855f7)",
//     },
//     title: "Creative Solutions",
//     content: "Innovative ideas deserve beautiful presentation.",
//     cta: "Let's Create",
//     style: {
//       titleAlign: "right",
//       contentAlign: "right",
//       ctaAlign: "right",
//       titleColor: "#ffffff",
//       contentColor: "#e9d5ff",
//       ctaColor: "#a5b4fc",
//     },
//   },
//   {
//     id: "corporate-1",
//     name: "Corporate Dark",
//     backgroundColor: "#1e293b",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#0f172a", "#1e293b", "#334155"],
//       css: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
//     },
//     title: "Corporate Excellence",
//     content: "Professional solutions for business growth and success.",
//     cta: "Contact Us",
//     style: {
//       titleAlign: "left",
//       contentAlign: "left",
//       ctaAlign: "right",
//       titleColor: "#ffffff",
//       contentColor: "#cbd5e1",
//       ctaColor: "#38bdf8",
//     },
//   },
//   {
//     id: "sunset-1",
//     name: "Sunset Gradient",
//     backgroundColor: "#ea580c",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#b91c1c", "#ea580c", "#fbbf24"],
//       css: "linear-gradient(to right, #b91c1c, #ea580c, #fbbf24)",
//     },
//     title: "Vibrant Impact",
//     content:
//       "Make your message as vibrant as your vision. Stand out with color.",
//     cta: "Learn More",
//     style: {
//       titleAlign: "center",
//       contentAlign: "center",
//       ctaAlign: "center",
//       titleColor: "#ffffff",
//       contentColor: "#ffedd5",
//       ctaColor: "#fef3c7",
//     },
//   },
//   {
//     id: "forest-1",
//     name: "Forest Green",
//     backgroundColor: "#166534",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#14532d", "#166534", "#22c55e"],
//       css: "linear-gradient(to right, #14532d, #166534, #22c55e)",
//     },
//     title: "Natural Growth",
//     content: "Sustainable solutions for your growing business needs.",
//     cta: "Grow With Us",
//     style: {
//       titleAlign: "left",
//       contentAlign: "left",
//       ctaAlign: "left",
//       titleColor: "#ffffff",
//       contentColor: "#dcfce7",
//       ctaColor: "#ffffff",
//     },
//   },
//   {
//     id: "dsfsdf-1",
//     name: "sdfsdf dfsdf",
//     backgroundColor: "#sdfsdf",
//     gradient: {
//       type: "linear",
//       direction: "to right",
//       colors: ["#sdfsdfa", "#dsdasd", "#sssfff"],
//       css: "linear-gradient(to right, #fffff, #sssss, #sssss)",
//     },
//     title: "Nasdfsdfsdfth",
//     content: "dcccccccccccccc.",
//     cta: "Grow With Us",
//     style: {
//       titleAlign: "left",
//       contentAlign: "left",
//       ctaAlign: "left",
//       titleColor: "#ffffff",
//       contentColor: "#dcfce7",
//       ctaColor: "#ffffff",
//     },
//   },
// ];

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setBackgroundColor,
  setBackgroundGradient,
  setTitle,
  setOtherContent,
  setCtaWebsite,
  setBannerStyle,
  setCustomFields,
  setActiveTemplate,
} from "../../store/editorSlice";

// Interface for banner template structure
interface BannerTemplate {
  id: string;
  name: string;
  backgroundColor: string;
  gradient?: {
    type: "linear" | "radial";
    direction: string;
    colors: string[];
    css: string;
  };
  title: string;
  content: string;
  cta: string;
  style: {
    titleAlign: "left" | "center" | "right";
    contentAlign: "left" | "center" | "right";
    ctaAlign: "left" | "center" | "right";
    titleColor: string;
    contentColor: string;
    ctaColor: string;
  };
  fields?: Array<{
    id: string;
    type: "title" | "subtitle" | "description" | "cta" | "custom";
    label: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
  }>;
}

// Enhanced templates with more variety, gradient support, and field definitions
const templates: BannerTemplate[] = [
  {
    id: "professional-1",
    name: "Professional Blue",
    backgroundColor: "#1e40af", // Fallback for non-gradient
    gradient: {
      type: "linear",
      direction: "to right",
      colors: ["#1e3a8a", "#1d4ed8", "#3b82f6"],
      css: "linear-gradient(to right, #1e3a8a, #1d4ed8, #3b82f6)",
    },
    title: "Professional Title",
    content:
      "Add your professional description here. Keep it concise and impactful.",
    cta: "Learn More",
    style: {
      titleAlign: "center",
      contentAlign: "center",
      ctaAlign: "center",
      titleColor: "#ffffff",
      contentColor: "#e2e8f0",
      ctaColor: "#93c5fd",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        value: "Professional Title",
        placeholder: "Enter your professional title",
        required: true,
      },
      {
        id: "description",
        type: "description",
        label: "Description",
        value:
          "Add your professional description here. Keep it concise and impactful.",
        placeholder: "Add a brief professional description",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Learn More",
        placeholder: "Enter your call to action",
      },
    ],
  },
  {
    id: "modern-1",
    name: "Modern Indigo",
    backgroundColor: "#4f46e5",
    gradient: {
      type: "linear",
      direction: "to right",
      colors: ["#4338ca", "#4f46e5", "#818cf8"],
      css: "linear-gradient(to right, #4338ca, #4f46e5, #818cf8)",
    },
    title: "Modern Design",
    content: "A contemporary approach to your message. Clean and stylish.",
    cta: "Explore",
    style: {
      titleAlign: "left",
      contentAlign: "left",
      ctaAlign: "left",
      titleColor: "#ffffff",
      contentColor: "#e2e8f0",
      ctaColor: "#fbbf24",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        value: "Modern Design",
        placeholder: "Enter your title",
        required: true,
      },
      {
        id: "subtitle",
        type: "subtitle",
        label: "Tagline",
        value: "Est. 2025",
        placeholder: "Add a tagline or year",
        required: false,
      },
      {
        id: "description",
        type: "description",
        label: "Description",
        value: "A contemporary approach to your message. Clean and stylish.",
        placeholder: "Add your description",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Explore",
        placeholder: "Add call to action",
      },
    ],
  },
  {
    id: "minimal-1",
    name: "Minimal White",
    backgroundColor: "#f8fafc",
    title: "Minimal Style",
    content: "Less is more. Simple and elegant design.",
    cta: "Discover",
    style: {
      titleAlign: "center",
      contentAlign: "center",
      ctaAlign: "center",
      titleColor: "#0f172a",
      contentColor: "#475569",
      ctaColor: "#3b82f6",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        value: "Minimal Style",
        placeholder: "Enter your title",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Discover",
        placeholder: "Enter your call to action",
      },
    ],
  },
  {
    id: "bold-1",
    name: "Bold Red",
    backgroundColor: "#dc2626",
    gradient: {
      type: "linear",
      direction: "to right",
      colors: ["#991b1b", "#dc2626", "#ef4444"],
      css: "linear-gradient(to right, #991b1b, #dc2626, #ef4444)",
    },
    title: "Make a Statement",
    content: "Bold colors for bold messages. Stand out from the crowd.",
    cta: "Get Started",
    style: {
      titleAlign: "center",
      contentAlign: "center",
      ctaAlign: "center",
      titleColor: "#ffffff",
      contentColor: "#fecaca",
      ctaColor: "#ffffff",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Bold Title",
        value: "Make a Statement",
        placeholder: "Enter a bold title",
        required: true,
      },
      {
        id: "description",
        type: "description",
        label: "Impact Statement",
        value: "Bold colors for bold messages. Stand out from the crowd.",
        placeholder: "Add your impact statement",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Get Started",
        placeholder: "Enter your call to action",
      },
    ],
  },
  {
    id: "creative-1",
    name: "Creative Purple",
    backgroundColor: "#7e22ce",
    gradient: {
      type: "linear",
      direction: "to bottom right",
      colors: ["#6b21a8", "#7e22ce", "#a855f7"],
      css: "linear-gradient(to bottom right, #6b21a8, #7e22ce, #a855f7)",
    },
    title: "Creative Solutions",
    content: "Innovative ideas deserve beautiful presentation.",
    cta: "Let's Create",
    style: {
      titleAlign: "right",
      contentAlign: "right",
      ctaAlign: "right",
      titleColor: "#ffffff",
      contentColor: "#e9d5ff",
      ctaColor: "#a5b4fc",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Creative Title",
        value: "Creative Solutions",
        placeholder: "Enter your creative title",
        required: true,
      },
      {
        id: "subtitle",
        type: "subtitle",
        label: "Specialties",
        value: "Design • Development • Strategy",
        placeholder: "List your specialties or skills",
        required: false,
      },
      {
        id: "description",
        type: "description",
        label: "Description",
        value: "Innovative ideas deserve beautiful presentation.",
        placeholder: "Describe your creative approach",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Let's Create",
        placeholder: "Enter your call to action",
      },
    ],
  },
  {
    id: "corporate-1",
    name: "Corporate Dark",
    backgroundColor: "#1e293b",
    gradient: {
      type: "linear",
      direction: "to right",
      colors: ["#0f172a", "#1e293b", "#334155"],
      css: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
    },
    title: "Corporate Excellence",
    content: "Professional solutions for business growth and success.",
    cta: "Contact Us",
    style: {
      titleAlign: "left",
      contentAlign: "left",
      ctaAlign: "right",
      titleColor: "#ffffff",
      contentColor: "#cbd5e1",
      ctaColor: "#38bdf8",
    },
    fields: [
      {
        id: "title",
        type: "title",
        label: "Company Name",
        value: "Corporate Excellence",
        placeholder: "Enter your company name",
        required: true,
      },
      {
        id: "subtitle",
        type: "subtitle",
        label: "Industry",
        value: "Business Solutions",
        placeholder: "Enter your industry or sector",
        required: false,
      },
      {
        id: "description",
        type: "description",
        label: "Value Proposition",
        value: "Professional solutions for business growth and success.",
        placeholder: "Enter your value proposition",
        required: true,
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        value: "Contact Us",
        placeholder: "Enter your call to action",
      },
    ],
  },
];

const BannerTemplates = () => {
  const dispatch = useDispatch<AppDispatch>();

  const applyTemplate = useCallback(
    (template: BannerTemplate) => {
      // Apply background (gradient or solid color)
      if (template.gradient) {
        dispatch(setBackgroundGradient(template.gradient));
      } else {
        dispatch(setBackgroundColor(template.backgroundColor));
      }

      // Apply standard fields
      dispatch(setTitle(template.title));
      dispatch(setOtherContent(template.content));
      dispatch(setCtaWebsite(template.cta));
      dispatch(setBannerStyle(template.style));

      // Apply custom fields if present
      if (template.fields && template.fields.length > 0) {
        const customFields = template.fields.map((field) => ({
          id: field.id,
          type: field.type,
          label: field.label,
          value: field.value || "",
          placeholder: field.placeholder,
          required: field.required,
        }));

        dispatch(setCustomFields(customFields));

        // Set active template ID
        dispatch(setActiveTemplate(template.id));
      }
    },
    [dispatch]
  );

  const randomizeTemplate = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    applyTemplate(templates[randomIndex]);
  }, [applyTemplate]);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-700 text-sm">Templates</h3>
        <button
          onClick={randomizeTemplate}
          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors flex items-center"
        >
          Randomize
        </button>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-4 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template)}
              className="relative h-12 rounded overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
              title={template.name}
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: template.gradient
                    ? template.gradient.css
                    : template.backgroundColor,
                }}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerTemplates;
