import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


import { IChat, IMessage } from '../../interfaces';

export interface ChatState {
  loading: boolean;
  chats: IChat[];
  selectedChat: IChat | null;
  messages: IMessage[];
  refetch: boolean;
  createChat: boolean;
  createChatName: boolean;
  isChatInfo: boolean;
  newChatName: string;
}

const initialState: ChatState = {
  loading: false,
  chats: [],
  selectedChat: null,
  messages: [],
  refetch: false,
  createChat: false,
  createChatName: false,
  isChatInfo: false,
  newChatName: '',
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

export const createGroupChat = createAsyncThunk(
  'auth/createGroupChat',
  async (name: string, thunkAPI) => {
    try {
      // @ts-ignore
      const users = thunkAPI.getState().users.selectedUsers.map((u) => u.id);

      const { data }: any = await axios.post('/chat/group', {
        name,
        users: JSON.stringify(users),
      });

      thunkAPI.dispatch(
        sendMessage({
          chatId: data.id,
          content: 'Created group chat',
        })
      );
      
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const leaveGroupChat = createAsyncThunk(
  'auth/leaveGroupChat',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const user = thunkAPI.getState().auth.user;
      // @ts-ignore
      const selectedChat = thunkAPI.getState().chat.selectedChat;

      const { data }: any = await axios.patch('/chat/group/remove', {
        userId: user.id,
        chatId: selectedChat.id,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const addToGroupChat = createAsyncThunk(
  'auth/addToGroupChat',
  async (_, thunkAPI: any) => {
    try {
      const chatId = thunkAPI.getState().chat.selectedChat.id;
      const userId = thunkAPI.getState().users.selectedUser.id;
      const { data } = await axios.patch('/chat/group/add', {
        userId,
        chatId,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const removeFromGroupChat = createAsyncThunk(
  'auth/removeFromGroupChat',
  async (_, thunkAPI: any) => {
    try {
      const chatId = thunkAPI.getState().chat.selectedChat.id;
      const userId = thunkAPI.getState().users.selectedUser.id;
      const { data } = await axios.patch('/chat/group/remove', {
        userId,
        chatId,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const renameGroupChat = createAsyncThunk(
  'auth/renameGroupChat',
  async (_, thunkAPI: any) => {
    try {
      const chatName = thunkAPI.getState().chat.newChatName;
      const chatId = thunkAPI.getState().chat.selectedChat.id;
      const { data } = await axios.patch('/chat/rename', {
        chatName,
        chatId,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const updateImage = createAsyncThunk(
  'auth/updateImage',
  async (image: string, thunkAPI) => {
    try {
      // @ts-ignore
      const id = thunkAPI.getState().chat.selectedChat.id;
      const { data } = await axios.patch('/chat/group/image/' + id, {
        image_url: image,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
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
    setCreateChat: (state, action: PayloadAction<boolean>) => {
      state.createChat = action.payload;
    },
    setCreateChatName: (state, action: PayloadAction<boolean>) => {
      state.createChatName = action.payload;
    },
    setIsChatInfo: (state, action: PayloadAction<boolean>) => {
      state.isChatInfo = action.payload;
    },
    setNewChatName: (state, action: PayloadAction<string>) => {
      state.newChatName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchChats.fulfilled,
        (state, action: PayloadAction<IChat[]>) => {
          state.chats = action.payload;
          if (
            state.selectedChat &&
            action.payload.find((chat) => chat.id === state.selectedChat?.id)
          ) {
            //  @ts-ignore
            state.selectedChat = action.payload.find(
              (chat) => chat.id === state.selectedChat?.id
            );
          }
          state.loading = false;
        }
      )
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
      })
      .addCase(createGroupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createGroupChat.fulfilled,
        (state, action: PayloadAction<IChat>) => {
          state.chats.push(action.payload);
          state.selectedChat = action.payload;
          state.createChat = false;
          state.createChatName = false;
          state.loading = false;
        }
      )
      .addCase(createGroupChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(leaveGroupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        leaveGroupChat.fulfilled,
        (state, action: PayloadAction<IChat>) => {
          state.chats = state.chats.filter(
            (chat) => chat.id !== action.payload.id
          );
          state.selectedChat = null;
          state.loading = false;
        }
      )
      .addCase(leaveGroupChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToGroupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addToGroupChat.fulfilled,
        (state, action: PayloadAction<IChat>) => {
          state.selectedChat = action.payload;
          state.loading = false;
        }
      )
      .addCase(addToGroupChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(renameGroupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        renameGroupChat.fulfilled,
        (state, action: PayloadAction<IChat>) => {
          state.selectedChat = action.payload;
          state.chats = state.chats.map((chat) => {
            return chat.id === action.payload.id ? action.payload : chat;
          });
        }
      )
      .addCase(renameGroupChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeFromGroupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        removeFromGroupChat.fulfilled,
        (state, action: PayloadAction<IChat>) => {
          state.selectedChat = action.payload;
          state.loading = false;
        }
      )
      .addCase(removeFromGroupChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateImage.fulfilled, (state, action: PayloadAction<IChat>) => {
        state.selectedChat = action.payload;
        state.chats = state.chats.map((chat) => {
          return chat.id === action.payload.id ? action.payload : chat;
        });
      })
      .addCase(updateImage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  toggleRefetch,
  setCreateChat,
  setSelectedChat,
  setCreateChatName,
  setIsChatInfo,
  setNewChatName,
} = chatSlice.actions;

export default chatSlice.reducer;
