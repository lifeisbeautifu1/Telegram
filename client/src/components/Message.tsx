import { IMessage } from '../interfaces';
import { Avatar } from './';

interface MessageProps {
  message: IMessage;
  isNewMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isNewMessage }) => {
  const date = new Date(message?.created_at);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (isNewMessage) {
    return (
      <div className="w-full py-2 text-gray-700 flex gap-2">
        <Avatar
          letter={message?.sender?.username[0]}
          image_url={message?.sender?.image_url}
        />
        <div className="w-custom h-full flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <h1 className="text-sky-400 dark:text-sky-500 text-medium text-sm capitalize">
              {message?.sender?.username}
            </h1>
            <span className="text-gray-400 text-xs select-none">
              {hours >= 10 ? hours : `0${hours}`}:
              {minutes >= 10 ? minutes : `0${minutes}`}
            </span>
          </div>
          <p className="text-xs pr-10 dark:text-gray-300">{message.content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full pb-1 text-gray-700 flex gap-2">
        <div className="ml-[52px] w-full h-full flex">
          <p className="text-xs w-full dark:text-gray-300">{message.content}</p>
          <p className="ml-auto w-8 text-gray-400  text-xs select-none">
            {hours >= 10 ? hours : `0${hours}`}:
            {minutes >= 10 ? minutes : `0${minutes}`}
          </p>
        </div>
      </div>
    );
  }
};


export default Message;
