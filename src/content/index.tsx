import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store';
// import { loadState } from '../store/editorSlice';
import Sidebar from './Sidebar';
import tailwindCss from '../index.css?inline'; // For Shadow DOM styles

console.log("Content script loaded.");

const SHADOW_HOST_ID = 'instantbranding-shadow-host';
// Attempt to find the container usually holding the banner image
const LINKEDIN_BANNER_SELECTOR = 'div.top-card-background-hero-image';
const LIVE_TITLE_ID = 'instantbranding-live-title';
const LIVE_CONTENT_ID = 'instantbranding-live-content'; // ID for content element
const LIVE_CTA_ID = 'instantbranding-live-cta';         // ID for CTA element

let sidebarRoot: ReactDOM.Root | null = null;
let shadowHost: HTMLDivElement | null = null;
// Will reference the actual LinkedIn banner element if found
let liveBannerElement: HTMLElement | null = null;
let liveTitleElement: HTMLParagraphElement | null = null;
let liveContentElement: HTMLParagraphElement | null = null; // Ref for content
let liveCtaElement: HTMLParagraphElement | null = null;     // Ref for CTA
let originalBannerHTML: string | null = null; // Store original content
let originalBannerStyles: { [key: string]: string } = {}; // Store some original styles if needed
let storeUnsubscribe: (() => void) | null = null; // To hold the unsubscribe function

// --- Redux State Update Handler ---
// This function will run whenever the Redux store changes
function handleStoreUpdate() {
  if (!liveBannerElement || !liveTitleElement || !liveContentElement || !liveCtaElement) return;

  const currentState = store.getState().editor;

  // Update banner background
  liveBannerElement.style.backgroundColor = currentState.backgroundColor;
  liveBannerElement.style.backgroundImage = 'none';

  // Update title
  liveTitleElement.textContent = currentState.title;
  liveTitleElement.style.textAlign = currentState.bannerStyle.titleAlign;
  liveTitleElement.style.color = currentState.bannerStyle.titleColor;

  // Update content
  liveContentElement.textContent = currentState.otherContent;
  liveContentElement.style.textAlign = currentState.bannerStyle.contentAlign;
  liveContentElement.style.color = currentState.bannerStyle.contentColor;
  liveContentElement.style.display = currentState.otherContent ? 'block' : 'none';

  // Update CTA
  liveCtaElement.textContent = currentState.ctaWebsite;
  liveCtaElement.style.textAlign = currentState.bannerStyle.ctaAlign;
  liveCtaElement.style.color = currentState.bannerStyle.ctaColor;
  liveCtaElement.style.display = currentState.ctaWebsite ? 'block' : 'none';
}

// --- Mount/Unmount Logic ---
function mountSidebar() {
  if (shadowHost || liveBannerElement) {
    console.log("Sidebar or banner modification already active.");
    return;
  }

  // --- Find and Prepare LinkedIn Banner ---
  const targetBanner = document.querySelector<HTMLElement>(LINKEDIN_BANNER_SELECTOR);

  if (!targetBanner) {
    console.warn(`InstantBranding: LinkedIn banner element ('${LINKEDIN_BANNER_SELECTOR}') not found on this page. Sidebar will not activate.`);
    // Optionally, notify the user or background script
    // chrome.runtime.sendMessage({ error: "Banner not found" });
    return; // Stop if banner isn't found
  }

  console.log("InstantBranding: Found LinkedIn banner element. Replacing content for live preview.");
  liveBannerElement = targetBanner; // Reference the found element

  // Store original state
  originalBannerHTML = liveBannerElement.innerHTML;
  originalBannerStyles.display = liveBannerElement.style.display || ''; // Store original display style
  originalBannerStyles.backgroundColor = liveBannerElement.style.backgroundColor || '';
  originalBannerStyles.backgroundImage = liveBannerElement.style.backgroundImage || '';


  // Clear and style the original banner for preview
  const initialState = store.getState().editor; // Get initial state from store
  liveBannerElement.innerHTML = ''; // Clear existing content
  liveBannerElement.style.backgroundColor = initialState.backgroundColor; // Use initial state color
  liveBannerElement.style.backgroundImage = 'none'; // Remove any background image
  liveBannerElement.style.display = 'flex'; // Use flex to center content
  liveBannerElement.style.flexDirection = 'column'; // Changed to column
  liveBannerElement.style.alignItems = 'center';
  liveBannerElement.style.justifyContent = 'center'; // Center vertically too
  liveBannerElement.style.padding = '10px'; // Add some padding
  liveBannerElement.style.textAlign = 'center'; // Center text by default

  // Create the title element inside the banner
  liveTitleElement = document.createElement('p');
  liveTitleElement.id = LIVE_TITLE_ID;
  liveTitleElement.textContent = initialState.title;
  liveTitleElement.style.color = '#333';
  liveTitleElement.style.fontSize = '28px'; // Increased size
  liveTitleElement.style.fontWeight = 'bold';
  liveTitleElement.style.margin = '10px 0 5px 0'; // Increased vertical margin
  liveBannerElement.appendChild(liveTitleElement);

  // Create the content element
  liveContentElement = document.createElement('p');
  liveContentElement.id = LIVE_CONTENT_ID;
  liveContentElement.textContent = initialState.otherContent;
  liveContentElement.style.color = '#555';
  liveContentElement.style.fontSize = '18px'; // Increased size
  liveContentElement.style.margin = '5px 0';  // Added margin
  liveContentElement.style.whiteSpace = 'pre-wrap'; // Respect line breaks from textarea
  liveContentElement.style.display = initialState.otherContent ? 'block' : 'none';
  liveBannerElement.appendChild(liveContentElement);

  // Create the CTA element
  liveCtaElement = document.createElement('p');
  liveCtaElement.id = LIVE_CTA_ID;
  liveCtaElement.textContent = initialState.ctaWebsite;
  liveCtaElement.style.color = '#1a0dab';
  liveCtaElement.style.fontSize = '16px'; // Increased size
  liveCtaElement.style.margin = '5px 0 10px 0'; // Increased vertical margin
  liveCtaElement.style.textDecoration = 'underline';
  liveCtaElement.style.display = initialState.ctaWebsite ? 'block' : 'none';
  liveBannerElement.appendChild(liveCtaElement);

  // --- Create Sidebar in Shadow DOM ---
  shadowHost = document.createElement('div');
  shadowHost.id = SHADOW_HOST_ID;
  document.body.appendChild(shadowHost);

  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
  const styleElement = document.createElement('style');
  styleElement.textContent = tailwindCss;
  shadowRoot.appendChild(styleElement);
  const reactRootContainer = document.createElement('div');
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

  console.log("Sidebar mounted. Redux store provided. Live preview active in LinkedIn banner.");
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
    liveBannerElement.style.backgroundColor = originalBannerStyles.backgroundColor;
    liveBannerElement.style.backgroundImage = originalBannerStyles.backgroundImage;
    liveBannerElement.style.padding = '';
    liveBannerElement.style.alignItems = '';
    liveBannerElement.style.justifyContent = '';

    liveBannerElement = null;
    liveTitleElement = null;
    liveContentElement = null; // Clear ref
    liveCtaElement = null;     // Clear ref
    originalBannerHTML = null;
    originalBannerStyles = {};
  } else if (liveBannerElement) {
    console.warn("Attempted to unmount, but original banner content was not stored.");
    liveBannerElement = null;
    liveTitleElement = null;
    liveContentElement = null; // Clear ref
    liveCtaElement = null;     // Clear ref
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
        sendResponse({ status: "Failed to activate: Banner not found or already active." });
      }
    }
    return true; // Indicate async response
  }
});

console.log("Content script listener added.");

// Optional: Add cleanup if the page navigates away while sidebar is open
// window.addEventListener('beforeunload', unmountSidebar); 