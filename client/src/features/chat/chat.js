"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewChatName = exports.setIsChatInfo = exports.setCreateChatName = exports.setSelectedChat = exports.setCreateChat = exports.toggleRefetch = exports.chatSlice = exports.updateImage = exports.renameGroupChat = exports.removeFromGroupChat = exports.addToGroupChat = exports.leaveGroupChat = exports.createGroupChat = exports.accessChat = exports.sendMessage = exports.fetchMessages = exports.fetchChats = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const initialState = {
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
exports.fetchChats = (0, toolkit_1.createAsyncThunk)('auth/fetchChats', async (_, thunkAPI) => {
    try {
        const { data } = await axios_1.default.get('/chat');
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.fetchMessages = (0, toolkit_1.createAsyncThunk)('auth/fetchMessages', async (chat, thunkAPI) => {
    try {
        const { data } = await axios_1.default.get('/message/' + chat.id);
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.sendMessage = (0, toolkit_1.createAsyncThunk)('auth/sendMessage', async (action, thunkAPI) => {
    try {
        const { data } = await axios_1.default.post('/message', {
            content: action.content,
            chatId: action.chatId,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.accessChat = (0, toolkit_1.createAsyncThunk)('auth/accessChat', async (userId, thunkAPI) => {
    try {
        const { data } = await axios_1.default.post('/chat', {
            userId,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.createGroupChat = (0, toolkit_1.createAsyncThunk)('auth/createGroupChat', async (name, thunkAPI) => {
    try {
        // @ts-ignore
        const users = thunkAPI.getState().users.selectedUsers.map((u) => u.id);
        const { data } = await axios_1.default.post('/chat/group', {
            name,
            users: JSON.stringify(users),
        });
        thunkAPI.dispatch((0, exports.sendMessage)({
            chatId: data.id,
            content: 'Created group chat',
        }));
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.leaveGroupChat = (0, toolkit_1.createAsyncThunk)('auth/leaveGroupChat', async (_, thunkAPI) => {
    try {
        // @ts-ignore
        const user = thunkAPI.getState().auth.user;
        // @ts-ignore
        const selectedChat = thunkAPI.getState().chat.selectedChat;
        const { data } = await axios_1.default.patch('/chat/group/remove', {
            userId: user.id,
            chatId: selectedChat.id,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.addToGroupChat = (0, toolkit_1.createAsyncThunk)('auth/addToGroupChat', async (_, thunkAPI) => {
    try {
        const chatId = thunkAPI.getState().chat.selectedChat.id;
        const userId = thunkAPI.getState().users.selectedUser.id;
        const { data } = await axios_1.default.patch('/chat/group/add', {
            userId,
            chatId,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.removeFromGroupChat = (0, toolkit_1.createAsyncThunk)('auth/removeFromGroupChat', async (_, thunkAPI) => {
    try {
        const chatId = thunkAPI.getState().chat.selectedChat.id;
        const userId = thunkAPI.getState().users.selectedUser.id;
        const { data } = await axios_1.default.patch('/chat/group/remove', {
            userId,
            chatId,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.renameGroupChat = (0, toolkit_1.createAsyncThunk)('auth/renameGroupChat', async (_, thunkAPI) => {
    try {
        const chatName = thunkAPI.getState().chat.newChatName;
        const chatId = thunkAPI.getState().chat.selectedChat.id;
        const { data } = await axios_1.default.patch('/chat/rename', {
            chatName,
            chatId,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.updateImage = (0, toolkit_1.createAsyncThunk)('auth/updateImage', async (image, thunkAPI) => {
    var _a, _b;
    try {
        // @ts-ignore
        const id = thunkAPI.getState().chat.selectedChat.id;
        const { data } = await axios_1.default.patch('/chat/group/image/' + id, {
            image_url: image,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.chatSlice = (0, toolkit_1.createSlice)({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        toggleRefetch: (state) => {
            state.refetch = !state.refetch;
        },
        setCreateChat: (state, action) => {
            state.createChat = action.payload;
        },
        setCreateChatName: (state, action) => {
            state.createChatName = action.payload;
        },
        setIsChatInfo: (state, action) => {
            state.isChatInfo = action.payload;
        },
        setNewChatName: (state, action) => {
            state.newChatName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchChats.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.fetchChats.fulfilled, (state, action) => {
            state.chats = action.payload;
            if (state.selectedChat &&
                action.payload.find((chat) => { var _a; return chat.id === ((_a = state.selectedChat) === null || _a === void 0 ? void 0 : _a.id); })) {
                //  @ts-ignore
                state.selectedChat = action.payload.find((chat) => { var _a; return chat.id === ((_a = state.selectedChat) === null || _a === void 0 ? void 0 : _a.id); });
            }
            state.loading = false;
        })
            .addCase(exports.fetchChats.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.fetchMessages.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchMessages.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.sendMessage.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.sendMessage.fulfilled, (state, action) => {
            state.messages.unshift(action.payload);
            state.chats = state.chats.map((chat) => {
                return chat.id === action.payload.chat.id
                    ? Object.assign(Object.assign({}, chat), { latest_message: action.payload }) : chat;
            });
            state.loading = false;
        })
            .addCase(exports.sendMessage.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.accessChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.accessChat.fulfilled, (state, action) => {
            if (!state.chats.find((chat) => chat.id === action.payload.id)) {
                state.chats.push(action.payload);
            }
            state.selectedChat = action.payload;
            state.loading = false;
        })
            .addCase(exports.accessChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.createGroupChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.createGroupChat.fulfilled, (state, action) => {
            state.chats.push(action.payload);
            state.selectedChat = action.payload;
            state.createChat = false;
            state.createChatName = false;
            state.loading = false;
        })
            .addCase(exports.createGroupChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.leaveGroupChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.leaveGroupChat.fulfilled, (state, action) => {
            state.chats = state.chats.filter((chat) => chat.id !== action.payload.id);
            state.selectedChat = null;
            state.loading = false;
        })
            .addCase(exports.leaveGroupChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.addToGroupChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.addToGroupChat.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
            state.loading = false;
        })
            .addCase(exports.addToGroupChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.renameGroupChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.renameGroupChat.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
            state.chats = state.chats.map((chat) => {
                return chat.id === action.payload.id ? action.payload : chat;
            });
        })
            .addCase(exports.renameGroupChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.removeFromGroupChat.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.removeFromGroupChat.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
            state.loading = false;
        })
            .addCase(exports.removeFromGroupChat.rejected, (state) => {
            state.loading = false;
        })
            .addCase(exports.updateImage.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateImage.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
            state.chats = state.chats.map((chat) => {
                return chat.id === action.payload.id ? action.payload : chat;
            });
        })
            .addCase(exports.updateImage.rejected, (state) => {
            state.loading = false;
        });
    },
});
_a = exports.chatSlice.actions, exports.toggleRefetch = _a.toggleRefetch, exports.setCreateChat = _a.setCreateChat, exports.setSelectedChat = _a.setSelectedChat, exports.setCreateChatName = _a.setCreateChatName, exports.setIsChatInfo = _a.setIsChatInfo, exports.setNewChatName = _a.setNewChatName;
exports.default = exports.chatSlice.reducer;
