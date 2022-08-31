import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, IErrors, IFormData } from '../../interfaces';

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  errors: IErrors | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  errors: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (formData: IFormData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', formData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);



export const register = createAsyncThunk(
  'auth/register',
  async (formData: IFormData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/register', formData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    return;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.errors);
  }
});

export const init = createAsyncThunk('/auth/init', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue('error');
  }
});

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (username: string, thunkAPI) => {
    try {
      const { data } = await axios.patch('/user/username', {
        username,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (image: string, thunkAPI) => {
    try {
      const { data } = await axios.patch('/user/image', {
        image_url: image,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const updateOnline = createAsyncThunk(
  'auth/updateOnline',
  async (time: number, thunkAPI) => {
    try {
      const { data } = await axios.patch('/user/online', {
        time,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.errors = null;
      })
      .addCase(logout.rejected, (state, action: any) => {
        state.loading = false;
      })
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action: any) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(init.rejected, (state, action: any) => {
        state.loading = false;
      })
      .addCase(updateUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsername.fulfilled, (state, action: any) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateUsername.rejected, (state, action: any) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action: any) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateAvatar.rejected, (state, action: any) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(updateOnline.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOnline.fulfilled, (state, action: any) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateOnline.rejected, (state, action: any) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export const { resetErrors } = authSlice.actions;


export default authSlice.reducer;
