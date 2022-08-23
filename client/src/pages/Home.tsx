import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaTwitter, FaCaretDown } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';

const Home = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        e.target !== buttonRef.current &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsDropDown(false);
      }
    };
    window.addEventListener('click', clickOutside);
    return () => window.removeEventListener('click', clickOutside);
  }, []);
  return (
    <div>
      <nav className="min-h-[48px] navbar absolute top-0 left-0 right-0  border-b border-gray-[#e8e8e8]">
        <div className="container mx-auto px-4 flex items-center justify-between text-[#0088cc]">
          <ul className="flex items-center ">
            <li className="relative">
              <NavLink
                to="/"
                className="block py-[15.5px] px-[15px] leading-[17px]"
              >
                Home
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/faq"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                FAQ
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/apps"
                className="block py-[15.5px] px-[15px] leading-[17px]"
              >
                Apps
              </NavLink>
            </li>
            <li className="relative hidden md:block">
              <NavLink
                to="/api"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                API
              </NavLink>
            </li>
            <li className="relative hidden md:block">
              <NavLink
                to="/protocol"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                Protocol
              </NavLink>
            </li>
          </ul>
          <ul className="flex items-center">
            <li className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsDropDown(!isDropDown)}
                className="cursor-pointer flex items-center py-[15.5px] px-[15px] leading-[17px]"
              >
                <BsGlobe className="w-4 h-4 mr-1" /> EN
                <FaCaretDown className="ml-1" />
              </button>
              <ul className={`dropdown-menu ${isDropDown && 'active'}`}>
                <li className="chosen">
                  <a href="?setln=en">English</a>
                </li>
                <li className="">
                  <a href="?setln=ru">Русский</a>
                </li>
                <li className="long ">
                  <a href="?setln=id">Bahasa Indonesia</a>
                </li>
                <li className="long ">
                  <a href="?setln=ms">Bahasa Melayu</a>
                </li>
                <li className="">
                  <a href="?setln=de">Deutsch</a>
                </li>
                <li className="">
                  <a href="?setln=es">Español</a>
                </li>
                <li className="">
                  <a href="?setln=fr">Français</a>
                </li>
                <li className="">
                  <a href="?setln=it">Italiano</a>
                </li>
                <li className="">
                  <a href="?setln=nl">Nederlands</a>
                </li>
                <li className="">
                  <a href="?setln=uz">O‘zbek</a>
                </li>
                <li className="">
                  <a href="?setln=pl">Polski</a>
                </li>
                <li className="long ">
                  <a href="?setln=pt-br">Português (Brasil)</a>
                </li>
                <li className="">
                  <a href="?setln=tr">Türkçe</a>
                </li>
                <li className="">
                  <a href="?setln=be">Беларуская</a>
                </li>
                <li className="">
                  <a href="?setln=uk">Українська</a>
                </li>
                <li className="">
                  <a href="?setln=ar">العربية</a>
                </li>
                <li className="">
                  <a href="?setln=fa">فارسی</a>
                </li>
                <li className="">
                  <a href="?setln=ko">한국어</a>
                </li>
              </ul>
            </li>
            <li className="relative hidden md:block">
              <NavLink
                to="/twitter"
                className="flex gap-1 items-center  py-[15.5px] px-[15px] leading-[17px]"
              >
                <FaTwitter className="text-xl opacity-90 " />
                Twitter
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Home;
