export interface IUser {
  id: string;
  username: string;
  email: string;
  image_url: string;
}

export interface IErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IFormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IChat {
  id: string;
  chat_name: string;
  group_admin: IUser;
  is_group_chat: boolean;
  latest_message: IMessage;
  users: IUser[];
}

export interface IMessage {
  id: string;
  chat: IChat;
  content: string;
  sender: IUser;
  created_at: string;
}
