import { IUser } from '../interfaces';

export const getSender = (loggedUser: IUser, users: IUser[]) => {
  return users[0].id === loggedUser.id
    ? users[1]?.username
    : users[0]?.username;
};

export const getSenderFull = (loggedUser: IUser, users: IUser[]) => {
  return users[0].id === loggedUser.id ? users[1] : users[0];
};
