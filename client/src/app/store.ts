import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import chatReducer from '../features/chat/chat';
import usersReducer from '../features/users/users';
import appReducer from '../features/app/app';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    users: usersReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
