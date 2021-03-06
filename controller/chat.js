
const users = [];

const addUserchat = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUserchat = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
};

const getUserchat = (id) => users.find((user) => user.id === id);

const getUsersInRoomchat = (room) => users.filter((user) => user.room === room);

module.exports = {addUserchat , removeUserchat , getUserchat ,getUsersInRoomchat};