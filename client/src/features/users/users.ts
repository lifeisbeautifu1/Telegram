import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, IOnlineUser } from '../../interfaces';

export interface AuthState {
  loading: boolean;
  onlineUsers: IOnlineUser[];
  searchUsers: IUser[];
}

const initialState: AuthState = {
  loading: false,
  onlineUsers: [],
  searchUsers: [],
};

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (search: string, thunkAPI) => {
    try {
      const { data } = await axios.get('/user/?search=' + search);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<IOnlineUser[]>) => {
      state.onlineUsers = action.payload;
    },
    resetSearchUsers: (state) => {
      state.searchUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.searchUsers = action.payload;
        }
      )
      .addCase(searchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setOnlineUsers, resetSearchUsers } = usersSlice.actions;

export default usersSlice.reducer;
