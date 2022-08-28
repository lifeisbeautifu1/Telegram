interface AvatarProps {
  letter: string;
  size?: 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({ letter, size }) => {
  return (
    <div
      className={`select-none inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 border border-gray-200 rounded-full  shadow-inner ${
        size === 'lg' ? 'w-16 h-16' : size === 'xl' && 'w-24 h-24'
      }`}
    >
      <span
        className={`font-medium text-gray-600 ${size === 'xl' && 'text-2xl'}`}
      >
        {letter}
      </span>
    </div>
  );
};

export default Avatar;
