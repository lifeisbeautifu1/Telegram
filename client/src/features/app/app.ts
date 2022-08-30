import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isDarkMode: boolean;
  isEditProfile: boolean;
  isAddMembers: boolean;
  isEditGroupChat: boolean;
  isHandleMember: boolean;
  action: 'LEAVE' | 'ADD' | 'REMOVE' | null;
}

const initialState: AppState = {
  isDarkMode: localStorage.getItem('isDarkMode')
    ? JSON.parse(localStorage.getItem('isDarkMode')!)
    : false,
  isEditProfile: false,
  isAddMembers: false,
  isHandleMember: false,
  isEditGroupChat: false,
  action: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
    setIsEditProfile: (state, action: PayloadAction<boolean>) => {
      state.isEditProfile = action.payload;
    },
    setIsAddMembers: (state, action: PayloadAction<boolean>) => {
      state.isAddMembers = action.payload;
    },
    setIsHandleMember: (state, action: PayloadAction<boolean>) => {
      state.isHandleMember = action.payload;
    },
    setIsEditGroupChat: (state, action: PayloadAction<boolean>) => {
      state.isEditGroupChat = action.payload;
    },
    setAction: (
      state,
      action: PayloadAction<'LEAVE' | 'ADD' | 'REMOVE' | null>
    ) => {
      state.action = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setIsEditProfile,
  setIsAddMembers,
  setIsHandleMember,
  setIsEditGroupChat,
  setAction,
} = appSlice.actions;

export default appSlice.reducer;
