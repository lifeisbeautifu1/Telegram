"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSelectedUser = exports.resetSelectedUsers = exports.removeSelectedUser = exports.addSelectedUser = exports.resetSearchUsers = exports.setOnlineUsers = exports.usersSlice = exports.searchUsers = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const initialState = {
    loading: false,
    onlineUsers: [],
    searchUsers: [],
    selectedUsers: [],
    selectedUser: null,
};
exports.searchUsers = (0, toolkit_1.createAsyncThunk)('users/searchUsers', async (search, thunkAPI) => {
    try {
        const { data } = await axios_1.default.get('/user/?search=' + search);
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.usersSlice = (0, toolkit_1.createSlice)({
    name: 'users',
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        resetSearchUsers: (state) => {
            state.searchUsers = [];
        },
        addSelectedUser: (state, action) => {
            state.selectedUsers.push(action.payload);
        },
        removeSelectedUser: (state, action) => {
            state.selectedUsers = state.selectedUsers.filter((u) => u.id !== action.payload.id);
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        resetSelectedUsers: (state) => {
            state.selectedUsers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.searchUsers.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.searchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.searchUsers = action.payload;
        })
            .addCase(exports.searchUsers.rejected, (state) => {
            state.loading = false;
        });
    },
});
_a = exports.usersSlice.actions, exports.setOnlineUsers = _a.setOnlineUsers, exports.resetSearchUsers = _a.resetSearchUsers, exports.addSelectedUser = _a.addSelectedUser, exports.removeSelectedUser = _a.removeSelectedUser, exports.resetSelectedUsers = _a.resetSelectedUsers, exports.setSelectedUser = _a.setSelectedUser;
exports.default = exports.usersSlice.reducer;
