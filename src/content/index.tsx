// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from '../store';
// // import { loadState } from '../store/editorSlice';
// import Sidebar from './Sidebar';
// import tailwindCss from '../index.css?inline'; // For Shadow DOM styles

// console.log("Content script loaded.");

// const SHADOW_HOST_ID = 'instantbranding-shadow-host';
// // Attempt to find the container usually holding the banner image
// const LINKEDIN_BANNER_SELECTOR = 'div.top-card-background-hero-image';
// const LIVE_TITLE_ID = 'instantbranding-live-title';
// const LIVE_CONTENT_ID = 'instantbranding-live-content'; // ID for content element
// const LIVE_CTA_ID = 'instantbranding-live-cta';         // ID for CTA element

// let sidebarRoot: ReactDOM.Root | null = null;
// let shadowHost: HTMLDivElement | null = null;
// // Will reference the actual LinkedIn banner element if found
// let liveBannerElement: HTMLElement | null = null;
// let liveTitleElement: HTMLParagraphElement | null = null;
// let liveContentElement: HTMLParagraphElement | null = null; // Ref for content
// let liveCtaElement: HTMLParagraphElement | null = null;     // Ref for CTA
// let originalBannerHTML: string | null = null; // Store original content
// let originalBannerStyles: { [key: string]: string } = {}; // Store some original styles if needed
// let storeUnsubscribe: (() => void) | null = null; // To hold the unsubscribe function

// // --- Redux State Update Handler ---
// // This function will run whenever the Redux store changes
// function handleStoreUpdate() {
//   if (!liveBannerElement || !liveTitleElement || !liveContentElement || !liveCtaElement) return;

//   const currentState = store.getState().editor;

//   // Update banner background
//   liveBannerElement.style.backgroundColor = currentState.backgroundColor;
//   liveBannerElement.style.backgroundImage = 'none';

//   // Update title
//   liveTitleElement.textContent = currentState.title;
//   liveTitleElement.style.textAlign = currentState.bannerStyle.titleAlign;
//   liveTitleElement.style.color = currentState.bannerStyle.titleColor;

//   // Update content
//   liveContentElement.textContent = currentState.otherContent;
//   liveContentElement.style.textAlign = currentState.bannerStyle.contentAlign;
//   liveContentElement.style.color = currentState.bannerStyle.contentColor;
//   liveContentElement.style.display = currentState.otherContent ? 'block' : 'none';

//   // Update CTA
//   liveCtaElement.textContent = currentState.ctaWebsite;
//   liveCtaElement.style.textAlign = currentState.bannerStyle.ctaAlign;
//   liveCtaElement.style.color = currentState.bannerStyle.ctaColor;
//   liveCtaElement.style.display = currentState.ctaWebsite ? 'block' : 'none';
// }

// // --- Mount/Unmount Logic ---
// function mountSidebar() {
//   if (shadowHost || liveBannerElement) {
//     console.log("Sidebar or banner modification already active.");
//     return;
//   }

//   // --- Find and Prepare LinkedIn Banner ---
//   const targetBanner = document.querySelector<HTMLElement>(LINKEDIN_BANNER_SELECTOR);

//   if (!targetBanner) {
//     console.warn(`InstantBranding: LinkedIn banner element ('${LINKEDIN_BANNER_SELECTOR}') not found on this page. Sidebar will not activate.`);
//     // Optionally, notify the user or background script
//     // chrome.runtime.sendMessage({ error: "Banner not found" });
//     return; // Stop if banner isn't found
//   }

//   console.log("InstantBranding: Found LinkedIn banner element. Replacing content for live preview.");
//   liveBannerElement = targetBanner; // Reference the found element

//   // Store original state
//   originalBannerHTML = liveBannerElement.innerHTML;
//   originalBannerStyles.display = liveBannerElement.style.display || ''; // Store original display style
//   originalBannerStyles.backgroundColor = liveBannerElement.style.backgroundColor || '';
//   originalBannerStyles.backgroundImage = liveBannerElement.style.backgroundImage || '';

//   // Clear and style the original banner for preview
//   const initialState = store.getState().editor; // Get initial state from store
//   liveBannerElement.innerHTML = ''; // Clear existing content
//   liveBannerElement.style.backgroundColor = initialState.backgroundColor; // Use initial state color
//   liveBannerElement.style.backgroundImage = 'none'; // Remove any background image
//   liveBannerElement.style.display = 'flex'; // Use flex to center content
//   liveBannerElement.style.flexDirection = 'column'; // Changed to column
//   liveBannerElement.style.alignItems = 'center';
//   liveBannerElement.style.justifyContent = 'center'; // Center vertically too
//   liveBannerElement.style.padding = '10px'; // Add some padding
//   liveBannerElement.style.textAlign = 'center'; // Center text by default

//   // Create the title element inside the banner
//   liveTitleElement = document.createElement('p');
//   liveTitleElement.id = LIVE_TITLE_ID;
//   liveTitleElement.textContent = initialState.title;
//   liveTitleElement.style.color = '#333';
//   liveTitleElement.style.fontSize = '28px'; // Increased size
//   liveTitleElement.style.fontWeight = 'bold';
//   liveTitleElement.style.margin = '10px 0 5px 0'; // Increased vertical margin
//   liveBannerElement.appendChild(liveTitleElement);

//   // Create the content element
//   liveContentElement = document.createElement('p');
//   liveContentElement.id = LIVE_CONTENT_ID;
//   liveContentElement.textContent = initialState.otherContent;
//   liveContentElement.style.color = '#555';
//   liveContentElement.style.fontSize = '18px'; // Increased size
//   liveContentElement.style.margin = '5px 0';  // Added margin
//   liveContentElement.style.whiteSpace = 'pre-wrap'; // Respect line breaks from textarea
//   liveContentElement.style.display = initialState.otherContent ? 'block' : 'none';
//   liveBannerElement.appendChild(liveContentElement);

//   // Create the CTA element
//   liveCtaElement = document.createElement('p');
//   liveCtaElement.id = LIVE_CTA_ID;
//   liveCtaElement.textContent = initialState.ctaWebsite;
//   liveCtaElement.style.color = '#1a0dab';
//   liveCtaElement.style.fontSize = '16px'; // Increased size
//   liveCtaElement.style.margin = '5px 0 10px 0'; // Increased vertical margin
//   liveCtaElement.style.textDecoration = 'underline';
//   liveCtaElement.style.display = initialState.ctaWebsite ? 'block' : 'none';
//   liveBannerElement.appendChild(liveCtaElement);

//   // --- Create Sidebar in Shadow DOM ---
//   shadowHost = document.createElement('div');
//   shadowHost.id = SHADOW_HOST_ID;
//   document.body.appendChild(shadowHost);

//   const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
//   const styleElement = document.createElement('style');
//   styleElement.textContent = tailwindCss;
//   shadowRoot.appendChild(styleElement);
//   const reactRootContainer = document.createElement('div');
//   shadowRoot.appendChild(reactRootContainer);

//   // Render the Sidebar wrapped in the Redux Provider
//   sidebarRoot = ReactDOM.createRoot(reactRootContainer);
//   sidebarRoot.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <Sidebar />
//       </Provider>
//     </React.StrictMode>
//   );

//   // Subscribe to store updates to keep the banner preview synced
//   storeUnsubscribe = store.subscribe(handleStoreUpdate);

//   console.log("Sidebar mounted. Redux store provided. Live preview active in LinkedIn banner.");
// }

// function unmountSidebar() {
//   // Unsubscribe from store updates first
//   if (storeUnsubscribe) {
//     storeUnsubscribe();
//     storeUnsubscribe = null;
//     console.log("Unsubscribed from Redux store.");
//   }

//   // Unmount React sidebar first
//   if (sidebarRoot && shadowHost) {
//     sidebarRoot.unmount();
//     shadowHost.remove();
//     sidebarRoot = null;
//     shadowHost = null;
//     console.log("Sidebar unmounted.");
//   }

//   // Restore original LinkedIn banner content
//   if (liveBannerElement && originalBannerHTML !== null) {
//     console.log("Restoring original LinkedIn banner content.");
//     liveBannerElement.innerHTML = originalBannerHTML;
//     // Restore original styles
//     liveBannerElement.style.display = originalBannerStyles.display;
//     liveBannerElement.style.backgroundColor = originalBannerStyles.backgroundColor;
//     liveBannerElement.style.backgroundImage = originalBannerStyles.backgroundImage;
//     liveBannerElement.style.padding = '';
//     liveBannerElement.style.alignItems = '';
//     liveBannerElement.style.justifyContent = '';

//     liveBannerElement = null;
//     liveTitleElement = null;
//     liveContentElement = null; // Clear ref
//     liveCtaElement = null;     // Clear ref
//     originalBannerHTML = null;
//     originalBannerStyles = {};
//   } else if (liveBannerElement) {
//     console.warn("Attempted to unmount, but original banner content was not stored.");
//     liveBannerElement = null;
//     liveTitleElement = null;
//     liveContentElement = null; // Clear ref
//     liveCtaElement = null;     // Clear ref
//   }
// }

// // --- Message Listener ---
// chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
//   console.log("Message received in content script:", message);
//   if (message.action === "toggleSidebar") {
//     if (shadowHost || liveBannerElement) {
//       unmountSidebar();
//       sendResponse({ status: "Sidebar and banner preview deactivated" });
//     } else {
//       mountSidebar(); // This will now check if the banner exists
//       // Check if mounting was successful before sending response
//       if (shadowHost || liveBannerElement) {
//         sendResponse({ status: "Sidebar and banner preview activated" });
//       } else {
//         sendResponse({ status: "Failed to activate: Banner not found or already active." });
//       }
//     }
//     return true; // Indicate async response
//   }
// });

// console.log("Content script listener added.");

// // Optional: Add cleanup if the page navigates away while sidebar is open
// // window.addEventListener('beforeunload', unmountSidebar);

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../store";
// import { loadState } from '../store/editorSlice';
import Sidebar from "./Sidebar";
import tailwindCss from "../index.css?inline"; // For Shadow DOM styles

console.log("Content script loaded.");

const SHADOW_HOST_ID = "instantbranding-shadow-host";
// Attempt to find the container usually holding the banner image
const LINKEDIN_BANNER_SELECTOR = "div.top-card-background-hero-image";
const LIVE_TITLE_ID = "instantbranding-live-title";
const LIVE_CONTENT_ID = "instantbranding-live-content"; // ID for content element
const LIVE_CTA_ID = "instantbranding-live-cta"; // ID for CTA element

let sidebarRoot: ReactDOM.Root | null = null;
let shadowHost: HTMLDivElement | null = null;
// Will reference the actual LinkedIn banner element if found
let liveBannerElement: HTMLElement | null = null;
let liveTitleElement: HTMLParagraphElement | null = null;
let liveContentElement: HTMLParagraphElement | null = null; // Ref for content
let liveCtaElement: HTMLParagraphElement | null = null; // Ref for CTA
let originalBannerHTML: string | null = null; // Store original content
let originalBannerStyles: { [key: string]: string } = {}; // Store some original styles if needed
let storeUnsubscribe: (() => void) | null = null; // To hold the unsubscribe function

/**
 * Renders rich text content from JSON format to HTML
 * @param jsonContent The JSON string containing rich text information
 * @returns HTML string with formatting applied
 */
function renderRichText(jsonContent: string): string {
  try {
    // If it's an empty string, just return empty string
    if (!jsonContent || jsonContent.trim() === "") {
      return "";
    }

    // Handle case where raw JSON object is passed
    if (typeof jsonContent === "object") {
      return processRichTextContent(jsonContent);
    }

    // Check if it appears to be JSON
    if (jsonContent.startsWith("{") && jsonContent.endsWith("}")) {
      try {
        const richContent = JSON.parse(jsonContent);
        return processRichTextContent(richContent);
      } catch (e) {
        // If it's not valid JSON but looks like it might contain HTML tags
        if (jsonContent.includes("<") && jsonContent.includes(">")) {
          // It's likely showing raw HTML - remove the tags
          return jsonContent.replace(/<[^>]*>/g, "");
        }
        // If it's not valid JSON, just return the original string
        return jsonContent;
      }
    }

    // Otherwise, just return the original content
    return jsonContent;
  } catch (e) {
    console.error("Error rendering rich text:", e);
    // In case of error, strip any potential HTML tags for safety
    if (
      typeof jsonContent === "string" &&
      (jsonContent.includes("<") || jsonContent.includes(">"))
    ) {
      return jsonContent.replace(/<[^>]*>/g, "");
    }
    return String(jsonContent);
  }
}

/**
 * Processes a rich text content object into HTML
 */
function processRichTextContent(richContent: any): string {
  if (!richContent || typeof richContent !== "object") {
    return "";
  }

  // If it's an empty object or doesn't have text property
  if (!richContent.text && richContent.text !== "") {
    return "";
  }

  // Create a copy of the text
  let html = richContent.text;

  // If there are no formatting instructions, just return the text
  if (
    !Array.isArray(richContent.formatting) ||
    richContent.formatting.length === 0
  ) {
    // Only apply alignment if specified
    if (richContent.alignment && richContent.alignment !== "left") {
      return `<div style="text-align: ${richContent.alignment}">${html}</div>`;
    }
    return html;
  }

  // Apply formatting - process from end to start to avoid index shifting
  const sortedFormats = [...richContent.formatting].sort(
    (a: any, b: any) => b.start - a.start
  );

  sortedFormats.forEach((format: any) => {
    // Skip invalid formats
    if (
      typeof format !== "object" ||
      format.start === undefined ||
      format.end === undefined ||
      !format.type
    ) {
      return;
    }

    const { start, end, type, color } = format;

    // Validate indices are within text bounds
    if (start < 0 || end > html.length || start >= end) {
      return;
    }

    const content = html.substring(start, end);
    let styledContent;

    switch (type) {
      case "bold":
        styledContent = `<strong>${content}</strong>`;
        break;
      case "italic":
        styledContent = `<em>${content}</em>`;
        break;
      case "underline":
        styledContent = `<span style="text-decoration: underline">${content}</span>`;
        break;
      case "highlight":
        styledContent = `<span style="background-color: ${
          color || "#FFFF00"
        }">${content}</span>`;
        break;
      default:
        styledContent = content;
    }

    // Replace the content with styled version
    html = html.substring(0, start) + styledContent + html.substring(end);
  });

  // Apply alignment wrapper if needed
  if (richContent.alignment && richContent.alignment !== "left") {
    html = `<div style="text-align: ${richContent.alignment}">${html}</div>`;
  }

  return html;
}

// --- Redux State Update Handler ---
// This function will run whenever the Redux store changes
function handleStoreUpdate() {
  if (
    !liveBannerElement ||
    !liveTitleElement ||
    !liveContentElement ||
    !liveCtaElement
  )
    return;

  const currentState = store.getState().editor;

  // Update banner background
  liveBannerElement.style.backgroundColor = currentState.backgroundColor;
  liveBannerElement.style.backgroundImage = "none";

  // Update title with rich text support
  try {
    const titleContent = currentState.title || "";

    // Check if it's already a raw object
    if (typeof titleContent === "object" && titleContent !== null) {
      liveTitleElement.innerHTML = processRichTextContent(titleContent);
    } else {
      liveTitleElement.innerHTML = renderRichText(titleContent);
    }
  } catch (e) {
    console.error("Error updating title:", e);
    // Set safe text content as fallback
    liveTitleElement.textContent = String(currentState.title || "");
  }

  liveTitleElement.style.textAlign = currentState.bannerStyle.titleAlign;
  liveTitleElement.style.color = currentState.bannerStyle.titleColor;

  // Update content with rich text support
  try {
    const contentValue = currentState.otherContent || "";

    // Check if it's already a raw object
    if (typeof contentValue === "object" && contentValue !== null) {
      liveContentElement.innerHTML = processRichTextContent(contentValue);
    } else {
      liveContentElement.innerHTML = renderRichText(contentValue);
    }
  } catch (e) {
    console.error("Error updating content:", e);
    // Set safe text content as fallback
    liveContentElement.textContent = String(currentState.otherContent || "");
  }

  liveContentElement.style.textAlign = currentState.bannerStyle.contentAlign;
  liveContentElement.style.color = currentState.bannerStyle.contentColor;
  liveContentElement.style.display = currentState.otherContent
    ? "block"
    : "none";

  // Update CTA with rich text support
  try {
    const ctaValue = currentState.ctaWebsite || "";

    // Check if it's already a raw object
    if (typeof ctaValue === "object" && ctaValue !== null) {
      liveCtaElement.innerHTML = processRichTextContent(ctaValue);
    } else {
      liveCtaElement.innerHTML = renderRichText(ctaValue);
    }
  } catch (e) {
    console.error("Error updating CTA:", e);
    // Set safe text content as fallback
    liveCtaElement.textContent = String(currentState.ctaWebsite || "");
  }

  liveCtaElement.style.textAlign = currentState.bannerStyle.ctaAlign;
  liveCtaElement.style.color = currentState.bannerStyle.ctaColor;
  liveCtaElement.style.display = currentState.ctaWebsite ? "block" : "none";
}

// --- Mount/Unmount Logic ---
function mountSidebar() {
  if (shadowHost || liveBannerElement) {
    console.log("Sidebar or banner modification already active.");
    return;
  }

  // --- Find and Prepare LinkedIn Banner ---
  const targetBanner = document.querySelector<HTMLElement>(
    LINKEDIN_BANNER_SELECTOR
  );

  if (!targetBanner) {
    console.warn(
      `InstantBranding: LinkedIn banner element ('${LINKEDIN_BANNER_SELECTOR}') not found on this page. Sidebar will not activate.`
    );
    // Optionally, notify the user or background script
    // chrome.runtime.sendMessage({ error: "Banner not found" });
    return; // Stop if banner isn't found
  }

  console.log(
    "InstantBranding: Found LinkedIn banner element. Replacing content for live preview."
  );
  liveBannerElement = targetBanner; // Reference the found element

  // Store original state
  originalBannerHTML = liveBannerElement.innerHTML;
  originalBannerStyles.display = liveBannerElement.style.display || ""; // Store original display style
  originalBannerStyles.backgroundColor =
    liveBannerElement.style.backgroundColor || "";
  originalBannerStyles.backgroundImage =
    liveBannerElement.style.backgroundImage || "";

  // Clear and style the original banner for preview
  const initialState = store.getState().editor; // Get initial state from store
  liveBannerElement.innerHTML = ""; // Clear existing content
  liveBannerElement.style.backgroundColor = initialState.backgroundColor; // Use initial state color
  liveBannerElement.style.backgroundImage = "none"; // Remove any background image
  liveBannerElement.style.display = "flex"; // Use flex to center content
  liveBannerElement.style.flexDirection = "column"; // Changed to column
  liveBannerElement.style.alignItems = "center";
  liveBannerElement.style.justifyContent = "center"; // Center vertically too
  liveBannerElement.style.padding = "10px"; // Add some padding
  liveBannerElement.style.textAlign = "center"; // Center text by default

  // Create the title element inside the banner
  liveTitleElement = document.createElement("p");
  liveTitleElement.id = LIVE_TITLE_ID;
  liveTitleElement.className = "instantbranding-element"; // Add class for styling

  // Safely render initial text
  try {
    liveTitleElement.innerHTML = renderRichText(initialState.title || "");
  } catch (e) {
    liveTitleElement.textContent = String(initialState.title || "");
  }

  liveTitleElement.style.color = "#333";
  liveTitleElement.style.fontSize = "28px"; // Increased size
  liveTitleElement.style.fontWeight = "bold";
  liveTitleElement.style.margin = "10px 0 5px 0"; // Increased vertical margin
  liveTitleElement.style.width = "100%"; // Full width
  liveTitleElement.style.maxWidth = "600px"; // Max width for readability
  liveBannerElement.appendChild(liveTitleElement);

  // Create the content element
  liveContentElement = document.createElement("p");
  liveContentElement.id = LIVE_CONTENT_ID;
  liveContentElement.className = "instantbranding-element"; // Add class for styling

  // Safely render initial text
  try {
    liveContentElement.innerHTML = renderRichText(
      initialState.otherContent || ""
    );
  } catch (e) {
    liveContentElement.textContent = String(initialState.otherContent || "");
  }

  liveContentElement.style.color = "#555";
  liveContentElement.style.fontSize = "18px"; // Increased size
  liveContentElement.style.margin = "5px 0"; // Added margin
  liveContentElement.style.whiteSpace = "pre-wrap"; // Respect line breaks from textarea
  liveContentElement.style.width = "100%"; // Full width
  liveContentElement.style.maxWidth = "600px"; // Max width for readability
  liveContentElement.style.display = initialState.otherContent
    ? "block"
    : "none";
  liveBannerElement.appendChild(liveContentElement);

  // Create the CTA element
  liveCtaElement = document.createElement("p");
  liveCtaElement.id = LIVE_CTA_ID;
  liveCtaElement.className = "instantbranding-element"; // Add class for styling

  // Safely render initial text
  try {
    liveCtaElement.innerHTML = renderRichText(initialState.ctaWebsite || "");
  } catch (e) {
    liveCtaElement.textContent = String(initialState.ctaWebsite || "");
  }

  liveCtaElement.style.color = "#1a0dab";
  liveCtaElement.style.fontSize = "16px"; // Increased size
  liveCtaElement.style.margin = "5px 0 10px 0"; // Increased vertical margin
  liveCtaElement.style.textDecoration = "underline";
  liveCtaElement.style.width = "100%"; // Full width
  liveCtaElement.style.maxWidth = "600px"; // Max width for readability
  liveCtaElement.style.display = initialState.ctaWebsite ? "block" : "none";
  liveBannerElement.appendChild(liveCtaElement);

  // --- Create Sidebar in Shadow DOM ---
  shadowHost = document.createElement("div");
  shadowHost.id = SHADOW_HOST_ID;
  document.body.appendChild(shadowHost);

  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    ${tailwindCss}
    
    /* Additional styling for rich text elements */
    .instantbranding-element {
      width: 100%;
      max-width: 600px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .instantbranding-element strong, 
    .instantbranding-element b {
      font-weight: bold;
    }
    
    .instantbranding-element em,
    .instantbranding-element i {
      font-style: italic;
    }
    
    .instantbranding-element u,
    .instantbranding-element span[style*="text-decoration: underline"] {
      text-decoration: underline;
    }
    
    .instantbranding-element span[style*="background-color"] {
      padding: 0 2px;
      border-radius: 2px;
    }
  `;
  shadowRoot.appendChild(styleElement);
  const reactRootContainer = document.createElement("div");
  shadowRoot.appendChild(reactRootContainer);

  // Render the Sidebar wrapped in the Redux Provider
  sidebarRoot = ReactDOM.createRoot(reactRootContainer);
  sidebarRoot.render(
    <React.StrictMode>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </React.StrictMode>
  );

  // Subscribe to store updates to keep the banner preview synced
  storeUnsubscribe = store.subscribe(handleStoreUpdate);

  console.log(
    "Sidebar mounted. Redux store provided. Live preview active in LinkedIn banner."
  );
}

function unmountSidebar() {
  // Unsubscribe from store updates first
  if (storeUnsubscribe) {
    storeUnsubscribe();
    storeUnsubscribe = null;
    console.log("Unsubscribed from Redux store.");
  }

  // Unmount React sidebar first
  if (sidebarRoot && shadowHost) {
    sidebarRoot.unmount();
    shadowHost.remove();
    sidebarRoot = null;
    shadowHost = null;
    console.log("Sidebar unmounted.");
  }

  // Restore original LinkedIn banner content
  if (liveBannerElement && originalBannerHTML !== null) {
    console.log("Restoring original LinkedIn banner content.");
    liveBannerElement.innerHTML = originalBannerHTML;
    // Restore original styles
    liveBannerElement.style.display = originalBannerStyles.display;
    liveBannerElement.style.backgroundColor =
      originalBannerStyles.backgroundColor;
    liveBannerElement.style.backgroundImage =
      originalBannerStyles.backgroundImage;
    liveBannerElement.style.padding = "";
    liveBannerElement.style.alignItems = "";
    liveBannerElement.style.justifyContent = "";

    liveBannerElement = null;
    liveTitleElement = null;
    liveContentElement = null; // Clear ref
    liveCtaElement = null; // Clear ref
    originalBannerHTML = null;
    originalBannerStyles = {};
  } else if (liveBannerElement) {
    console.warn(
      "Attempted to unmount, but original banner content was not stored."
    );
    liveBannerElement = null;
    liveTitleElement = null;
    liveContentElement = null; // Clear ref
    liveCtaElement = null; // Clear ref
  }
}

// --- Message Listener ---
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("Message received in content script:", message);
  if (message.action === "toggleSidebar") {
    if (shadowHost || liveBannerElement) {
      unmountSidebar();
      sendResponse({ status: "Sidebar and banner preview deactivated" });
    } else {
      mountSidebar(); // This will now check if the banner exists
      // Check if mounting was successful before sending response
      if (shadowHost || liveBannerElement) {
        sendResponse({ status: "Sidebar and banner preview activated" });
      } else {
        sendResponse({
          status: "Failed to activate: Banner not found or already active.",
        });
      }
    }
    return true; // Indicate async response
  }
});

console.log("Content script listener added.");

// Optional: Add cleanup if the page navigates away while sidebar is open
// window.addEventListener('beforeunload', unmountSidebar);
