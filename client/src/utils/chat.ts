import { IUser, IMessage } from '../interfaces';

export const getSender = (loggedUser: IUser, users: IUser[]) => {
  return users[0].id === loggedUser.id
    ? users[1]?.username
    : users[0]?.username;
};

export const getSenderFull = (loggedUser: IUser, users: IUser[]) => {
  return users[0].id === loggedUser.id ? users[1] : users[0];
};

export const isNewMessage = (messages: IMessage[], m: IMessage, i: number) => {
  if (i === messages.length - 1) return true;
  else return messages[i + 1].sender.id !== m.sender.id;
};
