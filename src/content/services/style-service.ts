/**
 * Style Service
 * Handles stylesheet creation and injection
 */

import tailwindCss from "../../index.css?inline";

/**
 * Add custom styles to shadow root
 * @param shadowRoot The shadow root to add styles to
 */
export function addCustomStyles(shadowRoot: ShadowRoot): void {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
    ${tailwindCss}
    
    /* Enhanced styling for rich text elements */
    .instantbranding-element {
      width: 100%;
      max-width: 900px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    /* Base text formatting classes */
    .font-bold {
      font-weight: bold;
    }
    
    .italic {
      font-style: italic;
    }
    
    .underline {
      text-decoration: underline;
    }
    
    /* Text alignment classes */
    .text-left {
      text-align: left;
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-right {
      text-align: right;
    }
    
    /* Spacing utilities */
    .px-0\\.5 {
      padding-left: 0.125rem;
      padding-right: 0.125rem;
    }
    
    .rounded {
      border-radius: 0.25rem;
    }
    
    /* Shadow effects */
    .text-shadow-md {
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    
    .text-shadow-lg {
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    /* Animation for sidebar */
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    /* Add animation to sidebar */
    .fixed {
      animation: slideIn 0.3s ease-out;
    }
    
    /* Better scrollbar styling */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #a1a1a1;
    }
  `;

    shadowRoot.appendChild(styleElement);
}

export default {
    addCustomStyles
};