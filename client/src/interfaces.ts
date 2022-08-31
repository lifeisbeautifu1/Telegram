export interface IUser {
  id: string;
  username: string;
  email: string;
  image_url: string;
  last_online?: number;
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
  image_url: string;
  users: IUser[];
}

export interface IMessage {
  id: string;
  chat: IChat;
  content: string;
  sender: IUser;
  created_at: string;
}

export interface ServerToClientEvents {
  messageReceived: (message: any) => void;
  getUsers: (users: IUser[]) => void;
}

export interface ClientToServerEvents {
  setup: (id: string) => void;
  joinChat: (id: string) => void;
  sendMessage: (message: any) => void;
  refetchChats: (userId: string) => void;
  addUser: (userId: string) => void;
}