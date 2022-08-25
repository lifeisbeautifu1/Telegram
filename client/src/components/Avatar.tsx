interface AvatarProps {
  letter: string;
}

const Avatar: React.FC<AvatarProps> = ({ letter }) => {
  return (
    <div className="select-none inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {letter}
      </span>
    </div>
  );
};

export default Avatar;
