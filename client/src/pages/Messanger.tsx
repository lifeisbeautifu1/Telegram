import { Socket } from 'socket.io-client';

import { useAppSelector } from '../app/hooks';
import {
  Sidebar,
  Chat,
  CreateChat,
  AddMembersModal,
  HandleMemberModal,
} from '../components';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

interface MessangerProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const Messanger: React.FC<MessangerProps> = ({ socket }) => {
  const { createChat } = useAppSelector((state) => state.chat);

  return (
    <div className="relative flex w-full">
      {' '}
      <Sidebar socket={socket} />
      {createChat ? <CreateChat socket={socket} /> : <Chat socket={socket} />}
      <AddMembersModal />
      <HandleMemberModal socket={socket} />
    </div>
  );
};

export default Messanger;
