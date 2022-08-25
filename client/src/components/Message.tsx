import { IMessage } from '../interfaces';
import { Avatar } from './';

interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const date = new Date(message?.created_at);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    <div className="w-full py-2 text-gray-700 flex gap-2">
      <Avatar letter={message?.sender?.username[0]} />
      <div className="w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-sky-400 text-medium text-sm capitalize">
            {message?.sender?.username}
          </h1>
          <span className="text-gray-400 text-xs">
            {hours >= 10 ? hours : `0${hours}`}:
            {minutes >= 10 ? minutes : `0${minutes}`}
          </span>
        </div>
        <p className="text-xs">{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
