interface AvatarProps {
  letter: string;
  size?: 'lg' | 'xl';
  image_url?: string;
}

const Avatar: React.FC<AvatarProps> = ({ letter, size, image_url }) => {
  return !image_url ? (
    <div
      className={`select-none inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 rounded-full  shadow-inner ${
        size === 'lg' ? 'w-16 h-16' : size === 'xl' && 'w-24 h-24'
      }`}
    >
      <span
        className={`font-medium text-gray-600 ${size === 'xl' && 'text-2xl'}`}
      >
        {letter}
      </span>
    </div>
  ) : (
    <div
      className={`w-11 h-11 rounded-full shadow-inner overflow-hidden border border-gray-200 ${
        size === 'lg' ? 'w-16 h-16' : size === 'xl' && 'w-24 h-24'
      }`}
    >
      <img
        src={image_url}
        className='w-full h-full object-cover'
        alt='avatar'
      />
    </div>
  );
};

export default Avatar;
