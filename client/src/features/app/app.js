"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAction = exports.setIsEditGroupChat = exports.setIsHandleMember = exports.setIsAddMembers = exports.setIsEditProfile = exports.toggleDarkMode = exports.appSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isDarkMode: localStorage.getItem('isDarkMode')
        ? JSON.parse(localStorage.getItem('isDarkMode'))
        : false,
    isEditProfile: false,
    isAddMembers: false,
    isHandleMember: false,
    isEditGroupChat: false,
    action: null,
};
exports.appSlice = (0, toolkit_1.createSlice)({
    name: 'app',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        },
        setIsEditProfile: (state, action) => {
            state.isEditProfile = action.payload;
        },
        setIsAddMembers: (state, action) => {
            state.isAddMembers = action.payload;
        },
        setIsHandleMember: (state, action) => {
            state.isHandleMember = action.payload;
        },
        setIsEditGroupChat: (state, action) => {
            state.isEditGroupChat = action.payload;
        },
        setAction: (state, action) => {
            state.action = action.payload;
        },
    },
});
_a = exports.appSlice.actions, exports.toggleDarkMode = _a.toggleDarkMode, exports.setIsEditProfile = _a.setIsEditProfile, exports.setIsAddMembers = _a.setIsAddMembers, exports.setIsHandleMember = _a.setIsHandleMember, exports.setIsEditGroupChat = _a.setIsEditGroupChat, exports.setAction = _a.setAction;
exports.default = exports.appSlice.reducer;
