interface AvatarProps {
  letter: string;
  size?: 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ letter, size }) => {
  return (
    <div
      className={`select-none inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 rounded-full  shadow-inner ${
        size && 'w-16 h-16'
      }`}
    >
      <span className="font-medium text-gray-600 ">{letter}</span>
    </div>
  );
};

export default Avatar;
