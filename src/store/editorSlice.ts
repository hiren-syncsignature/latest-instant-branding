import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerStyle {
  titleAlign: 'left' | 'center' | 'right';
  contentAlign: 'left' | 'center' | 'right';
  ctaAlign: 'left' | 'center' | 'right';
  titleColor: string;
  contentColor: string;
  ctaColor: string;
}

interface EditorState {
  backgroundColor: string;
  title: string;
  otherContent: string;
  ctaWebsite: string;
  bannerStyle: BannerStyle;
}

const initialState: EditorState = {
  backgroundColor: '#E0E0E0', // Default background
  title: 'Your Title Here',   // Default title
  otherContent: '',
  ctaWebsite: '',
  bannerStyle: {
    titleAlign: 'center',
    contentAlign: 'center',
    ctaAlign: 'center',
    titleColor: '#333333',
    contentColor: '#555555',
    ctaColor: '#1a0dab'
  }
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setBackgroundColor(state, action: PayloadAction<string>) {
      state.backgroundColor = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setOtherContent(state, action: PayloadAction<string>) {
      state.otherContent = action.payload;
    },
    setCtaWebsite(state, action: PayloadAction<string>) {
      state.ctaWebsite = action.payload;
    },
    setBannerStyle(state, action: PayloadAction<BannerStyle>) {
      state.bannerStyle = action.payload;
    },
    setTitleAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.bannerStyle.titleAlign = action.payload;
    },
    setContentAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.bannerStyle.contentAlign = action.payload;
    },
    setCtaAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.bannerStyle.ctaAlign = action.payload;
    },
    setTitleColor(state, action: PayloadAction<string>) {
      state.bannerStyle.titleColor = action.payload;
    },
    setContentColor(state, action: PayloadAction<string>) {
      state.bannerStyle.contentColor = action.payload;
    },
    setCtaColor(state, action: PayloadAction<string>) {
      state.bannerStyle.ctaColor = action.payload;
    },
    // Define other reducers here later
    // e.g., setContent(state, action: PayloadAction<string>) { ... }

    // Action to load initial state (could be used when loading templates/saved data)
    loadState(state, action: PayloadAction<Partial<EditorState>>) {
      return { ...state, ...action.payload };
    }
  },
});

// Export actions creators
export const {
  setBackgroundColor,
  setTitle,
  setOtherContent,
  setCtaWebsite,
  setBannerStyle,
  setTitleAlign,
  setContentAlign,
  setCtaAlign,
  setTitleColor,
  setContentColor,
  setCtaColor,
  loadState
} = editorSlice.actions;

// Export the reducer
export default editorSlice.reducer; 