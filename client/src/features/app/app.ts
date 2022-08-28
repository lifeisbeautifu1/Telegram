import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isDarkMode: boolean;
  isEditProfile: boolean;
}

const initialState: AppState = {
  isDarkMode: localStorage.getItem('isDarkMode')
    ? JSON.parse(localStorage.getItem('isDarkMode')!)
    : false,
  isEditProfile: false,
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
  },
});

export const { toggleDarkMode, setIsEditProfile } = appSlice.actions;

export default appSlice.reducer;
