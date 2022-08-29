import { Outlet } from 'react-router-dom';

const MessangerLayout = () => {
  return (
    <div className="h-screen w-screen messanger  flex justify-center items-center px-4">
      <div className="rounded shadow-md border border-gray-200 dark:border-0  max-w-[1124px] w-full max-h-[700px] h-full overflow-hidden">
        <div className="relative px-2 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-500 dark:bg-slate-500 ">
          <div className="rounded-full h-3 w-3 cursor-pointer bg-red-500"></div>
          <div className="rounded-full h-3 w-3 cursor-pointer bg-yellow-500"></div>
          <div className="rounded-full h-3 w-3 cursor-pointer bg-green-500"></div>
          <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-sm absolute left-[50%] translate-x-[-50%]">
            Telegram
          </h1>
        </div>
        <div className="flex app w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MessangerLayout;
