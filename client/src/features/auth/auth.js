"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetErrors = exports.authSlice = exports.updateOnline = exports.updateAvatar = exports.updateUsername = exports.init = exports.logout = exports.register = exports.login = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const initialState = {
    user: null,
    loading: false,
    errors: null,
};
exports.login = (0, toolkit_1.createAsyncThunk)('auth/login', async (formData, thunkAPI) => {
    var _a, _b;
    try {
        const { data } = await axios_1.default.post('/auth/login', formData);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.register = (0, toolkit_1.createAsyncThunk)('auth/register', async (formData, thunkAPI) => {
    var _a, _b;
    try {
        const { data } = await axios_1.default.post('/auth/register', formData);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.logout = (0, toolkit_1.createAsyncThunk)('/auth/logout', async (_, thunkAPI) => {
    var _a, _b;
    try {
        await axios_1.default.get('/auth/logout');
        return;
    }
    catch (error) {
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.init = (0, toolkit_1.createAsyncThunk)('/auth/init', async (_, thunkAPI) => {
    try {
        const { data } = await axios_1.default.get('/auth/me');
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
exports.updateUsername = (0, toolkit_1.createAsyncThunk)('auth/updateUsername', async (username, thunkAPI) => {
    var _a, _b;
    try {
        const { data } = await axios_1.default.patch('/user/username', {
            username,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.updateAvatar = (0, toolkit_1.createAsyncThunk)('auth/updateAvatar', async (image, thunkAPI) => {
    var _a, _b;
    try {
        const { data } = await axios_1.default.patch('/user/image', {
            image_url: image,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.updateOnline = (0, toolkit_1.createAsyncThunk)('auth/updateOnline', async (time, thunkAPI) => {
    var _a, _b;
    try {
        const { data } = await axios_1.default.patch('/user/online', {
            time,
        });
        return data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors);
    }
});
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        resetErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.login.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        })
            .addCase(exports.register.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.register.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.register.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        })
            .addCase(exports.logout.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.logout.fulfilled, (state, action) => {
            state.user = null;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.logout.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.init.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.init.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.init.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.updateUsername.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateUsername.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.updateUsername.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        })
            .addCase(exports.updateAvatar.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateAvatar.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.updateAvatar.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        })
            .addCase(exports.updateOnline.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateOnline.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.errors = null;
        })
            .addCase(exports.updateOnline.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        });
    },
});
exports.resetErrors = exports.authSlice.actions.resetErrors;
exports.default = exports.authSlice.reducer;
