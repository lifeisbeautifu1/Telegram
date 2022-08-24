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
