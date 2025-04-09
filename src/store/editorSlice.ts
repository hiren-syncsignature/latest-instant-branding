// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface BannerStyle {
//   titleAlign: 'left' | 'center' | 'right';
//   contentAlign: 'left' | 'center' | 'right';
//   ctaAlign: 'left' | 'center' | 'right';
//   titleColor: string;
//   contentColor: string;
//   ctaColor: string;
// }

// interface EditorState {
//   backgroundColor: string;
//   title: string;
//   otherContent: string;
//   ctaWebsite: string;
//   bannerStyle: BannerStyle;
// }

// const initialState: EditorState = {
//   backgroundColor: '#E0E0E0', // Default background
//   title: 'Your Title Here',   // Default title
//   otherContent: '',
//   ctaWebsite: '',
//   bannerStyle: {
//     titleAlign: 'center',
//     contentAlign: 'center',
//     ctaAlign: 'center',
//     titleColor: '#333333',
//     contentColor: '#555555',
//     ctaColor: '#1a0dab'
//   }
// };

// const editorSlice = createSlice({
//   name: 'editor',
//   initialState,
//   reducers: {
//     setBackgroundColor(state, action: PayloadAction<string>) {
//       state.backgroundColor = action.payload;
//     },
//     setTitle(state, action: PayloadAction<string>) {
//       state.title = action.payload;
//     },
//     setOtherContent(state, action: PayloadAction<string>) {
//       state.otherContent = action.payload;
//     },
//     setCtaWebsite(state, action: PayloadAction<string>) {
//       state.ctaWebsite = action.payload;
//     },
//     setBannerStyle(state, action: PayloadAction<BannerStyle>) {
//       state.bannerStyle = action.payload;
//     },
//     setTitleAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
//       state.bannerStyle.titleAlign = action.payload;
//     },
//     setContentAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
//       state.bannerStyle.contentAlign = action.payload;
//     },
//     setCtaAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
//       state.bannerStyle.ctaAlign = action.payload;
//     },
//     setTitleColor(state, action: PayloadAction<string>) {
//       state.bannerStyle.titleColor = action.payload;
//     },
//     setContentColor(state, action: PayloadAction<string>) {
//       state.bannerStyle.contentColor = action.payload;
//     },
//     setCtaColor(state, action: PayloadAction<string>) {
//       state.bannerStyle.ctaColor = action.payload;
//     },
//     // Define other reducers here later
//     // e.g., setContent(state, action: PayloadAction<string>) { ... }

//     // Action to load initial state (could be used when loading templates/saved data)
//     loadState(state, action: PayloadAction<Partial<EditorState>>) {
//       return { ...state, ...action.payload };
//     }
//   },
// });

// // Export actions creators
// export const {
//   setBackgroundColor,
//   setTitle,
//   setOtherContent,
//   setCtaWebsite,
//   setBannerStyle,
//   setTitleAlign,
//   setContentAlign,
//   setCtaAlign,
//   setTitleColor,
//   setContentColor,
//   setCtaColor,
//   loadState
// } = editorSlice.actions;

// // Export the reducer
// export default editorSlice.reducer; 

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define gradient type
interface GradientBackground {
  type: 'linear' | 'radial';
  direction: string;
  colors: string[];
  css: string;
}

// Define background image type
interface BackgroundImage {
  src: string;
  width: number;
  height: number;
  originalName: string;
  position?: 'left' | 'center' | 'right';
  overlay?: number; // 0-100 opacity percentage
}

// Define profile image type
interface ProfileImage {
  src: string;
  width: number;
  height: number;
  originalName: string;
  position: 'left' | 'center' | 'right';
  size: 'small' | 'medium' | 'large';
}

// Define template field type for dynamic fields
interface TemplateField {
  id: string;
  type: 'title' | 'subtitle' | 'description' | 'cta' | 'custom';
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
}

// Define state type
interface EditorState {
  backgroundColor: string;
  backgroundGradient: GradientBackground | null;
  backgroundImage: BackgroundImage | null;
  profileImage: ProfileImage | null;
  title: string;
  otherContent: string;
  ctaWebsite: string;
  customFields: TemplateField[]; // For dynamic template fields
  activeTemplate: string | null; // ID of the active template
  bannerStyle: {
    titleAlign: 'left' | 'center' | 'right';
    contentAlign: 'left' | 'center' | 'right';
    ctaAlign: 'left' | 'center' | 'right';
    titleColor: string;
    contentColor: string;
    ctaColor: string;
  };
}

// Initial state
const initialState: EditorState = {
  backgroundColor: '#1e40af',
  backgroundGradient: null,
  backgroundImage: null,
  profileImage: null,
  title: 'Professional Title',
  otherContent: 'Add your professional description here. Keep it concise and impactful.',
  ctaWebsite: 'Learn More',
  customFields: [],
  activeTemplate: null,
  bannerStyle: {
    titleAlign: 'center',
    contentAlign: 'center',
    ctaAlign: 'center',
    titleColor: '#ffffff',
    contentColor: '#e2e8f0',
    ctaColor: '#93c5fd'
  }
};

// Create slice
export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // Background actions
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
      // If setting a solid color, clear the gradient and image
      state.backgroundGradient = null;
      state.backgroundImage = null;
    },
    setBackgroundGradient: (state, action: PayloadAction<GradientBackground>) => {
      state.backgroundGradient = action.payload;
      // Clear background image when setting gradient
      state.backgroundImage = null;
    },
    setBackgroundImage: (state, action: PayloadAction<BackgroundImage>) => {
      state.backgroundImage = action.payload;
      // Clear gradient when setting background image
      state.backgroundGradient = null;
    },
    removeBackgroundImage: (state) => {
      state.backgroundImage = null;
      // Revert to solid color
      state.backgroundGradient = null;
    },

    // Profile image actions
    setProfileImage: (state, action: PayloadAction<ProfileImage>) => {
      state.profileImage = action.payload;
    },
    setProfilePosition: (state, action: PayloadAction<ProfileImage>) => {
      if (state.profileImage) {
        state.profileImage = action.payload;
      }
    },
    removeProfileImage: (state) => {
      state.profileImage = null;
    },

    // Content actions
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOtherContent: (state, action: PayloadAction<string>) => {
      state.otherContent = action.payload;
    },
    setCtaWebsite: (state, action: PayloadAction<string>) => {
      state.ctaWebsite = action.payload;
    },

    // Dynamic template fields actions
    setCustomFields: (state, action: PayloadAction<TemplateField[]>) => {
      state.customFields = action.payload;
    },
    updateCustomField: (state, action: PayloadAction<{ id: string, value: string }>) => {
      const field = state.customFields.find(field => field.id === action.payload.id);
      if (field) {
        field.value = action.payload.value;
      }
    },
    setActiveTemplate: (state, action: PayloadAction<string>) => {
      state.activeTemplate = action.payload;
    },

    // Style actions
    setBannerStyle: (state, action: PayloadAction<Partial<typeof state.bannerStyle>>) => {
      state.bannerStyle = { ...state.bannerStyle, ...action.payload };
    },
    setTitleAlign: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
      state.bannerStyle.titleAlign = action.payload;
    },
    setContentAlign: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
      state.bannerStyle.contentAlign = action.payload;
    },
    setCtaAlign: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
      state.bannerStyle.ctaAlign = action.payload;
    },
    setTitleColor: (state, action: PayloadAction<string>) => {
      state.bannerStyle.titleColor = action.payload;
    },
    setContentColor: (state, action: PayloadAction<string>) => {
      state.bannerStyle.contentColor = action.payload;
    },
    setCtaColor: (state, action: PayloadAction<string>) => {
      state.bannerStyle.ctaColor = action.payload;
    },

    // Reset action
    resetEditor: () => initialState
  }
});

// Export actions
export const {
  setBackgroundColor,
  setBackgroundGradient,
  setBackgroundImage,
  removeBackgroundImage,
  setProfileImage,
  setProfilePosition,
  removeProfileImage,
  setTitle,
  setOtherContent,
  setCtaWebsite,
  setCustomFields,
  updateCustomField,
  setActiveTemplate,
  setBannerStyle,
  setTitleAlign,
  setContentAlign,
  setCtaAlign,
  setTitleColor,
  setContentColor,
  setCtaColor,
  resetEditor
} = editorSlice.actions;

// Export reducer
export default editorSlice.reducer;