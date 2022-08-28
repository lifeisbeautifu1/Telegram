import { BsTelegram } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { login } from '../features/auth/auth';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { createRipple } from '../utils/createRipple';

const initialFormState = {
  username: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const [formState, setFormState] = useState(initialFormState);

  const { errors, user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) navigate('/messanger');
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formState));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="font-primary max-w-[720px] mx-auto flex flex-col items-center">
      <div className="mt-12">
        <BsTelegram className="w-40 h-40 text-[#3390ec]" />
      </div>
      <h1 className="mt-10 text-[2rem] font-medium">Sign in to Telegram</h1>
      <p className="mb-8 mt-2 text-[#707579] text-center">
        Please confirm your username <br /> and enter your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="relative">
            <input
              type="text"
              value={formState.username}
              onChange={handleChange}
              name="username"
              id="username"
              className={`block w-[360px] px-2.5 pb-2.5 pt-4  text-gray-900 bg-transparent rounded-lg border appearance-none shadow-inner
                  ${
                    errors?.username
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-gray-200'
                  }  focus:outline-none focus:ring-0  peer`}
              placeholder=" "
            />
            <label
              htmlFor="username"
              className={`absolute  ${
                errors?.username ? 'text-red-500' : 'text-gray-500'
              } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
            >
              Username
            </label>
          </div>
          {errors?.username && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, snapp!</span> {errors?.username}
            </p>
          )}
        </div>
        <div className="mb-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              onChange={handleChange}
              name="password"
              id="password"
              className={`block px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border appearance-none shadow-inner
                  ${
                    errors?.password
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-gray-200'
                  }  focus:outline-none focus:ring-0  peer`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute  ${
                errors?.password ? 'text-red-500' : 'text-gray-500'
              } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
            >
              Password
            </label>
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer absolute top-[14px] right-2"
                onClick={() => setShowPassword(!showPassword)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowPassword(!showPassword)}
                className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer absolute top-[14px] right-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </div>
          {errors?.password && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, snapp!</span> {errors?.password}
            </p>
          )}
        </div>

        <div
          onClick={(e) => {
            createRipple(e);
            setRemember(!remember);
          }}
          className="relative overflow-hidden w-full py-4 mb-4 text-gray-600  transition duration-200 bg-white cursor-pointer hover:bg-gray-100  rounded text-center flex items-center"
        >
          <div className="flex items-center h-5 ml-4">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={() => {}}
              className="w-4 h-4 bg-gray-50 rounded border border-gray-100 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-8 cursor-pointer block  text-gray-600 "
          >
            Keep me sign in
          </label>
        </div>
        <button
          type="submit"
          onClick={createRipple}
          className="relative overflow-hidden w-full py-2 mb-4 font-medium text-white uppercase transition duration-200 bg-[#3390ec]  rounded shadow-md hover:bg-[#3390ec]/90"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-600">
        Don't have an account?
        <Link
          to="/register"
          className="ml-1 text-[#3390ec] capitalize hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
