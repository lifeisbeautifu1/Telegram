export let users: {
  socketId: string;
  userId: string;
}[] = [];

export const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

export const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};
