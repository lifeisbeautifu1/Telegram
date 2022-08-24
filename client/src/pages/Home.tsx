import { NavLink, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaTwitter, FaCaretDown, FaChevronRight } from 'react-icons/fa';
import { AiFillAndroid, AiFillApple } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';

import { Article, Feature } from '../components';

import image1 from '../assets/news1.jpeg';
import image2 from '../assets/news2.jpeg';

import android from '../assets/android-video.mp4';
import ios from '../assets/ios-video.mp4';

import simple from '../assets/simple.gif';
import private1 from '../assets/private.gif';
import synced from '../assets/synced.gif';
import fast from '../assets/fast.gif';
import powerful from '../assets/powerful.gif';
import open from '../assets/open.gif';
import secure from '../assets/secure.gif';
import social from '../assets/social.gif';
import expressive from '../assets/expressive.gif';

const Home = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [play, setPlay] = useState(true);

  const togglePlay = () => {
    setPlay(false);
    setTimeout(() => setPlay(true), 1);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const androidRef = useRef<HTMLVideoElement>(null);
  const iosRef = useRef<HTMLVideoElement>(null);

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
        <div className="container mx-auto flex items-center justify-between text-[#0088cc]">
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
              <Link
                to="/"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                FAQ
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/"
                className="block py-[15.5px] px-[15px] leading-[17px]"
              >
                Apps
              </Link>
            </li>
            <li className="relative hidden md:block">
              <Link
                to="/"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                API
              </Link>
            </li>
            <li className="relative hidden md:block">
              <Link
                to="/"
                className="block  py-[15.5px] px-[15px] leading-[17px]"
              >
                Protocol
              </Link>
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
              <Link
                to="/"
                className="flex gap-1 items-center  py-[15.5px] px-[15px] leading-[17px]"
              >
                <FaTwitter className="text-xl opacity-90 " />
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto mt-[70px] px-4">
        <div className="w-full relative">
          <div className="blog-wrap">
            <div className="blog">
              <Link
                to="/"
                className="blog-header text-[16px] lg:text-[14px] hover:underline"
              >
                Recent News
              </Link>
              <div className="side_blog_entries">
                <Link to="/" className="mt-3 block">
                  <div className="text-[#444] text-[14px] lg:text-[12px] lg:text-black  font-bold">
                    Aug 12
                  </div>
                  <div className="cursor-pointer text-[#0088cc] hover:underline text-[14px] lg:text-[12px]">
                    Custom Animated Emoji, Gifting Telegram Premium, and More
                  </div>
                </Link>
                <Link to="/" className="mt-3 block">
                  <div className="text-[#444] text-[14px] lg:text-[12px] lg:text-black  font-bold">
                    Jun 21
                  </div>
                  <div className="cursor-pointer text-[#0088cc] hover:underline text-[14px] lg:text-[12px]">
                    700 Million Users and Telegram Premium
                  </div>
                </Link>
                <Link to="/" className="mt-3 block">
                  <div className="text-[#444] text-[14px] lg:text-[12px] lg:text-black font-bold">
                    Apr 16
                  </div>
                  <div className="cursor-pointer text-[#0088cc] hover:underline text-[14px] lg:text-[12px]">
                    Notification Sounds, Bot Revolution and More
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-[400px] mx-auto px-0 py-5 text-center">
            <Link to="/" className="block" onClick={togglePlay}>
              <div
                className={`logo ${play && 'play'}`}
                style={{ backgroundImage: 'url(./t_logo_sprite.svg)' }}
              ></div>
              <svg
                className="w-[144px] h-[36px] block mt-4 mx-auto mb-[6px]"
                viewBox="0 0 288 72"
                width="288"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m57.015 16.258c5.18 0 9.181 1.652 12.006 4.957 2.824 3.305 4.236 7.98 4.236 14.027v3.446h-24.855c.257 3.14 1.306 5.625 3.146 7.453s4.154 2.742 6.943 2.742c3.914 0 7.102-1.582 9.563-4.746l4.605 4.394c-1.523 2.274-3.556 4.037-6.099 5.291s-5.397 1.881-8.561 1.881c-5.414 0-9.803-1.705-13.166-5.115s-5.045-7.951-5.045-13.623v-1.055c0-3.797.733-7.189 2.198-10.178 1.464-2.988 3.521-5.314 6.169-6.978 2.649-1.664 5.602-2.496 8.86-2.496zm-15.827-12.445v7.171h-15.961v44.016h-8.825v-44.016h-15.82v-7.171zm15.792 19.3c-2.344 0-4.237.821-5.678 2.461-1.441 1.641-2.361 3.926-2.76 6.856h16.278v-.633c-.188-2.859-.95-5.022-2.286-6.486-1.336-1.465-3.187-2.198-5.554-2.198zm30.292 31.887h-8.543v-54h8.543zm24.051.703c-5.414 0-9.803-1.705-13.166-5.115-3.364-3.41-5.045-7.951-5.045-13.623v-1.055c0-3.797.732-7.189 2.197-10.178 1.465-2.988 3.521-5.314 6.17-6.978 2.648-1.664 5.601-2.496 8.859-2.496 5.18 0 9.182 1.652 12.006 4.957s4.236 7.98 4.236 14.027v3.446h-24.855c.258 3.14 1.307 5.625 3.146 7.453 1.84 1.828 4.155 2.742 6.944 2.742 3.914 0 7.101-1.582 9.562-4.746l4.606 4.394c-1.524 2.274-3.557 4.037-6.1 5.291s-5.396 1.881-8.56 1.881zm-1.02-32.59c-2.344 0-4.236.821-5.678 2.461-1.441 1.641-2.361 3.926-2.759 6.856h16.277v-.633c-.188-2.859-.949-5.022-2.285-6.486-1.336-1.465-3.188-2.198-5.555-2.198zm20.41 12.586c0-5.906 1.389-10.623 4.166-14.15 2.778-3.528 6.463-5.291 11.057-5.291 4.336 0 7.746 1.512 10.23 4.535l.387-3.832h7.699v36.879c0 4.992-1.552 8.93-4.658 11.812-3.105 2.883-7.295 4.325-12.568 4.325-2.789 0-5.514-.581-8.174-1.741s-4.682-2.677-6.065-4.552l4.043-5.133c2.625 3.117 5.86 4.676 9.704 4.676 2.836 0 5.074-.768 6.714-2.303 1.641-1.535 2.461-3.791 2.461-6.768v-2.566c-2.461 2.742-5.742 4.113-9.843 4.113-4.454 0-8.092-1.769-10.916-5.308-2.825-3.54-4.237-8.438-4.237-14.696zm8.508.739c0 3.82.779 6.826 2.338 9.017s3.721 3.287 6.486 3.287c3.446 0 6-1.476 7.664-4.429v-16.735c-1.617-2.883-4.148-4.324-7.593-4.324-2.813 0-4.998 1.113-6.557 3.34-1.559 2.226-2.338 5.508-2.338 9.844zm52.719-11.672c-1.125-.188-2.285-.282-3.481-.282-3.914 0-6.55 1.5-7.91 4.5v26.016h-8.543v-38.039h8.156l.211 4.254c2.063-3.305 4.922-4.957 8.579-4.957 1.218 0 2.226.164 3.023.492zm26.07 30.234c-.375-.727-.703-1.91-.984-3.551-2.719 2.836-6.047 4.254-9.985 4.254-3.82 0-6.937-1.09-9.351-3.269-2.414-2.18-3.621-4.875-3.621-8.086 0-4.055 1.506-7.166 4.517-9.334 3.012-2.168 7.319-3.252 12.92-3.252h5.239v-2.496c0-1.969-.551-3.545-1.653-4.729-1.101-1.183-2.777-1.775-5.027-1.775-1.945 0-3.539.486-4.781 1.459-1.243.972-1.864 2.209-1.864 3.709h-8.543c0-2.086.692-4.037 2.075-5.854 1.382-1.816 3.263-3.24 5.642-4.271 2.379-1.032 5.033-1.547 7.963-1.547 4.453 0 8.004 1.119 10.652 3.357 2.649 2.239 4.008 5.385 4.078 9.44v17.156c0 3.422.481 6.152 1.442 8.191v.598zm-9.387-6.152c1.688 0 3.276-.41 4.764-1.231 1.488-.82 2.608-1.922 3.358-3.304v-7.172h-4.606c-3.164 0-5.543.55-7.137 1.652-1.593 1.102-2.39 2.66-2.39 4.676 0 1.64.545 2.947 1.634 3.92 1.09.972 2.549 1.459 4.377 1.459zm32.645-31.887.246 3.973c2.672-3.118 6.328-4.676 10.969-4.676 5.086 0 8.566 1.945 10.441 5.836 2.766-3.891 6.656-5.836 11.672-5.836 4.195 0 7.318 1.16 9.369 3.48 2.051 2.321 3.1 5.742 3.147 10.266v24.996h-8.543v-24.75c0-2.414-.528-4.184-1.582-5.309-1.055-1.125-2.801-1.687-5.239-1.687-1.945 0-3.533.521-4.763 1.564-1.231 1.043-2.092 2.409-2.584 4.096l.035 26.086h-8.543v-25.031c-.117-4.477-2.402-6.715-6.856-6.715-3.421 0-5.847 1.394-7.277 4.184v27.562h-8.543v-38.039z"
                  fill="#4d4d4d"
                ></path>
              </svg>
            </Link>
            <p className="text-xl max-w-[285px] mx-auto my-0 text-[#8c8c8c] pt-[1px] pb-[10px] font-[300] text-center font-['Helvetica']">
              a new era of messaging
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="main max-w-[1024px] flex flex-col items-center  sm:flex-row sm:justify-center mx-auto my-0 text-center">
        <Link
          to="/"
          className="flex items-center justify-center link link-android text-[#0088cc]"
          onMouseOver={() => {
            androidRef?.current?.play();
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              androidRef?.current?.pause();
            }, (androidRef?.current?.duration! - androidRef?.current?.currentTime!) * 1000);
          }}
        >
          <video className="video-android" muted loop ref={androidRef}>
            <source src={android} type="video/mp4" />
          </video>
          <span className="flex items-center">
            <AiFillAndroid className="inline w-[25px] h-[27px] mr-[10px]" />
            Telegram for <b className="pl-1">Android</b>
          </span>
          {/* <div className="tl_main_download_image__android"></div> */}
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center link link-ios text-[#0088cc]"
          onMouseOver={() => {
            iosRef?.current?.play();
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              iosRef?.current?.pause();
            }, (iosRef?.current?.duration! - iosRef?.current?.currentTime!) * 1000);
          }}
        >
          <video
            src={ios}
            className="video-ios"
            ref={iosRef}
            muted
            loop
          ></video>
          <span className="flex items-center">
            <AiFillApple className="inline w-[25px] h-[27px] mr-[10px]" />
            Telegram for <b className="pl-1">iPhone / iPad</b>
          </span>
          {/* <div className="tl_main_download_image__ios"></div> */}
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center link link-desktop text-[#0088cc]"
        >
          Telegram for <b className="pl-1">Windows / Mac / Linux</b>
        </Link>
        <Link to="/" className="more-btn">
          Browse more Telegram apps{' '}
          <FaChevronRight className="text-xs flex items-center" />
        </Link>
      </div>
      <div className="container mx-auto mt-5 mb-8">
        <div className="h-[291px] overflow-y-hidden hidden md:block">
          <div className="absolute right-0 left-0">
            <div className="desktop">
              <div className="w-[600px] mx-auto text-[#0088cc]">
                <Link to="/" className="desktop-link desktop-link-td">
                  Telegram for <b>PC / Linux</b>
                </Link>
                <Link to="/" className="desktop-link desktop-link-mac">
                  Telegram for <b>macOS</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="mt-16 block mb-4 hover:underline text-center text-[#0088cc] font-medium text-[23px]"
        >
          Recent News
        </Link>
        <div className="flex flex-col max-w-[800px] mx-auto md:flex-row justify-center">
          <Article
            image={image1}
            date={'Aug 12, 2022'}
            title={`Telegram Emoji Platform, Custom Animated Emoji Packs, Gifting Telegram
        Premium, and More`}
            paragraph=" Today's update introduces the Telegram Emoji Platform, animated emoji in
        messages and captions…"
          />
          <Article
            image={image2}
            date="Jun 21, 2022"
            title={'700 Million Users and Telegram Premium'}
            paragraph={`Telegram now has over 700 million monthly active users. Today we're launching Telegram Premium – a subscription that lets you support Telegram's continued development and gives access…`}
          />
        </div>
      </div>
      <h1 className="text-center text-[23px] text-[#222] font-medium">
        Why Telegram?
      </h1>
      <div className="max-w-[950px] mx-auto mt-8 flex flex-wrap justify-center">
        <Feature
          image={simple}
          title="Simple"
          paragraph="is so simple you already know how to use it."
        />
        <Feature
          image={private1}
          title="Private"
          paragraph="messages are heavily encrypted and can self-destruct."
        />
        <Feature
          image={synced}
          title="Synced"
          paragraph="lets you access your chats from multiple devices."
        />
        <Feature
          image={fast}
          title="Fast"
          paragraph="delivers messages faster than any other application."
        />
        <Feature
          image={powerful}
          title="Powerful"
          paragraph="has no limits on the size of your media and chats."
        />

        <Feature
          image={open}
          title="Open"
          paragraph="has an open API and source code free for everyone."
        />
        <Feature
          image={secure}
          title="Secure"
          paragraph="keeps your messages safe from hacker attacks."
        />
        <Feature
          image={social}
          title="Social"
          paragraph="groups can hold up to 200,000 members."
        />
        <Feature
          image={expressive}
          title="Expressive"
          paragraph="lets you completely customize your messenger."
        />
      </div>
      <footer className="max-w-[925px] mt-20 mx-auto border-t border-gray-200 lg:pt-[28px] lg:pb-[40px] py-4 px-[34px] flex justify-between text-[#333]">
        <div className="hidden lg:flex w-2/5 flex-col gap-2 ">
          <h1 className="font-bold text-sm">Telegram</h1>
          <p className="text-xs">
            Telegram is a cloud-based mobile and desktop messaging app with a
            focus on security and speed.
          </p>
        </div>
        <ul className="lg:hidden flex flex-row justify-center w-full text-xs gap-2">
          <li>
            <Link to="/" className="text-primary uppercase">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary uppercase">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary uppercase">
              Apps
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary uppercase">
              Platform
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary uppercase">
              Twitter
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex flex-col text-sm gap-1">
          <li>
            <Link to="/" className="block mb-2 font-bold hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className=" text-primary hover:underline">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Jobs
            </Link>
          </li>
        </ul>
        <ul className=" hidden lg:flex  flex-col text-sm gap-1">
          <li>
            <Link to="/" className="mb-2 block font-bold hover:underline">
              Mobile Apps
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              iPhone/iPad
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Android
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Windows Phone
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex flex-col text-sm gap-1">
          <li>
            <Link to="/" className="mb-2 block font-bold hover:underline">
              Desktop Apps
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              PC/Mac/Linux
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              macOS
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Web-Browser
            </Link>
          </li>
        </ul>
        <ul className="hidden lg:flex flex-col text-sm gap-1">
          <li>
            <Link to="/" className="mb-2 block font-bold hover:underline">
              Platform
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              API
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Translations
            </Link>
          </li>
          <li>
            <Link to="/" className="text-primary hover:underline">
              Instant View
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
