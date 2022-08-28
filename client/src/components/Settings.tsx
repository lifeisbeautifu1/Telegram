import { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Avatar } from './';
import { setIsEditProfile, toggleDarkMode } from '../features/app/app';

const Settings = () => {
  const { isEditProfile, isDarkMode } = useAppSelector((state) => state.app);

  const { user } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState(user?.username || '');

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameInputRef?.current?.focus();
    setUsername(user?.username || '');
  }, [isEditProfile, user?.username]);

  const dispatch = useAppDispatch();
  return (
    <>
      {isEditProfile ? (
        <div className="w-full h-full flex flex-col">
          <div className="w-full border-b border-gray-200 py-4 px-4 flex items-center justify-between text-sm">
            <div
              className="text-sky-400   cursor-pointer flex items-center"
              onClick={() => dispatch(setIsEditProfile(false))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </div>
            <div>Edit Profile</div>
            <button className="text-sky-400">Done</button>
          </div>
          <div className="bg-gray-200/50 h-full">
            <div className="flex flex-col items-center w-3/5 mx-auto mt-10">
              <div className="bg-white px-4 py-2 rounded-lg w-full flex items-center">
                <Avatar letter={user?.username[0]!} size="lg" />
                <div className="ml-2 w-4/5  flex items-center border-b border-gray-200 pb-2">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full outline-none text-sm"
                    ref={usernameInputRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <p className="mt-2 text-left w-full px-4 text-gray-400 text-xs">
                Enter your name and add a profile photo.
              </p>
              <p className="mt-4 mb-2 text-left w-full px-4 text-gray-400 text-xs">
                BIO
              </p>
              <div className="bg-white  px-4 py-3 rounded-lg w-full flex items-center">
                <input
                  type="text"
                  placeholder="BIO"
                  className="w-full outline-none text-sm"
                  value={'happy & grateful'}
                />
              </div>
              <p className="mt-2 text-left w-full px-4 text-gray-400 text-xs">
                Any details such as age, occupation or city.
              </p>
              <p className="text-left w-full px-4 text-gray-400 text-xs">
                Example: 23 y.o. designer from San Francisco
              </p>
              <div className="bg-white mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full pb-2 border-b border-gray-200 cursor-pointer">
                  <h1>Username</h1>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-sm flex items-center w-full pt-2  cursor-pointer">
                  <h1>Change Number</h1>
                  <span className="inline-block ml-auto text-gray-400">
                    +7 917 964-59-57
                  </span>
                  <span className="inline-block ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="bg-white mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full  cursor-pointer">
                  <h1>Dark Mode</h1>
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={() => dispatch(toggleDarkMode())}
                    id="switch"
                  />
                  <label htmlFor="switch" id="forSwitch">
                    Toggle
                  </label>
                </div>
              </div>

              <div className="bg-white mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full pb-2 border-b border-gray-200 cursor-pointer">
                  <h1 className="text-sky-400">Add account</h1>
                </div>
                <div className="text-sm flex items-center w-full pt-2 cursor-pointer">
                  <h1 className="text-red-500">Log out</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-stone-100 flex justify-center items-center">
          <span className="py-1 px-2 text-sm text-gray-400 bg-white rounded-[30px]">
            Select settings
          </span>
        </div>
      )}
    </>
  );
};

export default Settings;
