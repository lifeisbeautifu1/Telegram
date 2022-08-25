import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IChat, IMessage } from '../../interfaces';

export interface AuthState {
  loading: boolean;
  chats: IChat[];
  selectedChat: IChat | null;
  messages: IMessage[];
  refetch: boolean;
}

const initialState: AuthState = {
  loading: false,
  chats: [],
  selectedChat: null,
  messages: [],
  refetch: false,
};

export const fetchChats = createAsyncThunk(
  'auth/fetchChats',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/chat');
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'auth/fetchMessages',
  async (chat: IChat, thunkAPI) => {
    try {
      const { data } = await axios.get('/message/' + chat.id);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'auth/sendMessage',
  async (action: { content: string; chatId: string }, thunkAPI) => {
    try {
      const { data } = await axios.post('/message', {
        content: action.content,
        chatId: action.chatId,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const accessChat = createAsyncThunk(
  'auth/accessChat',
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await axios.post('/chat', {
        userId,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<IChat>) => {
      state.selectedChat = action.payload;
    },
    toggleRefetch: (state) => {
      state.refetch = !state.refetch;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.loading = false;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<IMessage[]>) => {
          state.messages = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.messages.unshift(action.payload);
          state.chats = state.chats.map((chat) => {
            return chat.id === action.payload.chat.id
              ? {
                  ...chat,
                  latest_message: action.payload,
                }
              : chat;
          });
          state.loading = false;
        }
      )
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(accessChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(accessChat.fulfilled, (state, action: PayloadAction<IChat>) => {
        if (!state.chats.find((chat) => chat.id === action.payload.id)) {
          state.chats.push(action.payload);
        }
        state.selectedChat = action.payload;
        state.loading = false;
      })
      .addCase(accessChat.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleRefetch, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
