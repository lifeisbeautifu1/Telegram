import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../interfaces';

export interface AuthState {
  loading: boolean;
  onlineUsers: IUser[];
  searchUsers: IUser[];
  selectedUsers: IUser[];
}

const initialState: AuthState = {
  loading: false,
  onlineUsers: [],
  searchUsers: [],
  selectedUsers: [],
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
    setOnlineUsers: (state, action: PayloadAction<IUser[]>) => {
      state.onlineUsers = action.payload;
    },
    resetSearchUsers: (state) => {
      state.searchUsers = [];
    },
    addSelectedUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUsers.push(action.payload);
    },
    removeSelectedUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUsers = state.selectedUsers.filter(
        (u) => u.id !== action.payload.id
      );
    },
    resetSelectedUsers: (state) => {
      state.selectedUsers = [];
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

export const {
  setOnlineUsers,
  resetSearchUsers,
  addSelectedUser,
  removeSelectedUser,
  resetSelectedUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
