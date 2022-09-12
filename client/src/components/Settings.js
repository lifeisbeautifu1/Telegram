"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const hooks_1 = require("../app/hooks");
const _1 = require("./");
const auth_1 = require("../features/auth/auth");
const app_1 = require("../features/app/app");
const Settings = () => {
    const { isEditProfile, isDarkMode } = (0, hooks_1.useAppSelector)((state) => state.app);
    const { user, errors } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const [username, setUsername] = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.username) || '');
    const usernameInputRef = (0, react_1.useRef)(null);
    const imageUploadRef = (0, react_1.useRef)(null);
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = usernameInputRef === null || usernameInputRef === void 0 ? void 0 : usernameInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setUsername((user === null || user === void 0 ? void 0 : user.username) || '');
        dispatch((0, auth_1.resetErrors)());
    }, [isEditProfile, user === null || user === void 0 ? void 0 : user.username, dispatch]);
    const handleImageChange = async (e) => {
        var _a, _b, _c;
        // @ts-ignore
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                if (user === null || user === void 0 ? void 0 : user.image_url) {
                    const id = (_c = (_b = (_a = user === null || user === void 0 ? void 0 : user.image_url) === null || _a === void 0 ? void 0 : _a.split('/')) === null || _b === void 0 ? void 0 : _b.at(-1)) === null || _c === void 0 ? void 0 : _c.split('.')[0];
                    await axios_1.default.delete('/upload/' + id);
                }
                const { data: imageData } = await axios_1.default.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const url = imageData.secure_url;
                try {
                    dispatch((0, auth_1.updateAvatar)(url));
                }
                catch (error) {
                    console.log(error);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    return (<>
      {isEditProfile ? (<div className="w-full h-full flex flex-col dark:bg-slate-600">
          <div className="w-full border-b border-gray-200 dark:border-gray-500 dark:bg-slate-600 py-4 px-4 flex items-center justify-between text-sm">
            <div className="text-sky-400   cursor-pointer flex items-center" onClick={() => dispatch((0, app_1.setIsEditProfile)(false))}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
              </svg>
              Back
            </div>
            <div className="dark:text-white">Edit Profile</div>
            <button className="text-sky-400" onClick={() => {
                if (!username.trim()) {
                    return;
                }
                else if (username === (user === null || user === void 0 ? void 0 : user.username)) {
                    return;
                }
                else {
                    dispatch((0, auth_1.updateUsername)(username));
                }
            }}>
              Done
            </button>
          </div>
          <div className="bg-gray-200/50 dark:bg-slate-600 h-full">
            <div className="flex flex-col items-center w-3/5 mx-auto mt-10">
              <div className="bg-white dark:bg-slate-500 px-4 py-2 rounded-lg w-full flex items-center">
                <div className="relative">
                  <_1.Avatar letter={user === null || user === void 0 ? void 0 : user.username[0]} size="lg" image_url={user === null || user === void 0 ? void 0 : user.image_url}/>
                  <div onClick={() => { var _a; return (_a = imageUploadRef === null || imageUploadRef === void 0 ? void 0 : imageUploadRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer text-[18px] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-black/30 rounded-full"></div>
                  <input type="file" className="hidden" accept=".png,.jpeg,.jpg" ref={imageUploadRef} 
        // @ts-ignore
        onChange={(e) => handleImageChange(e)}/>
                </div>
                <div className={`ml-2 w-4/5  flex flex-col items-center `}>
                  <input type="text" placeholder="Username" className="w-full outline-none text-sm dark:bg-transparent dark:text-white dark:placeholder:text-white" ref={usernameInputRef} value={username} onChange={(e) => setUsername(e.target.value)}/>
                  <div className={`bg-gray-200 dark:bg-gray-400 h-[1px] w-full my-2 ${(errors === null || errors === void 0 ? void 0 : errors.username) && 'bg-red-400'}`}/>
                  {(errors === null || errors === void 0 ? void 0 : errors.username) && (<small className="text-red-400 text-left w-full text-medium">
                      {errors.username}
                    </small>)}
                </div>
              </div>
              <p className="mt-2 text-left w-full px-4 text-gray-400 text-xs">
                Enter your name and add a profile photo.
              </p>
              <p className="mt-4 mb-2 text-left w-full px-4 text-gray-400 text-xs">
                BIO
              </p>
              <div className="bg-white dark:bg-slate-500  px-4 py-3 rounded-lg w-full flex items-center">
                <input type="text" placeholder="happy & grateful" className="w-full outline-none text-sm dark:bg-transparent dark:placeholder:text-white dark:text-white"/>
              </div>
              <p className="mt-2 text-left w-full px-4 text-gray-400 text-xs">
                Any details such as age, occupation or city.
              </p>
              <p className="text-left w-full px-4 text-gray-400 text-xs">
                Example: 23 y.o. designer from San Francisco
              </p>
              <div className="bg-white dark:bg-slate-500 mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full pb-2 border-b border-gray-200 dark:border-gray-400 cursor-pointer">
                  <h1 className="dark:text-white">Username</h1>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                  </span>
                </div>
                <div className="text-sm flex items-center w-full pt-2  cursor-pointer">
                  <h1 className="dark:text-white">Change Number</h1>
                  <span className="inline-block ml-auto text-gray-400 dark:text-gray-300">
                    +7 917 964-59-57
                  </span>
                  <span className="inline-block ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-500 mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full  cursor-pointer">
                  <h1 className="dark:text-white">Dark Mode</h1>
                  <input type="checkbox" checked={isDarkMode} onChange={() => dispatch((0, app_1.toggleDarkMode)())} id="switch"/>
                  <label htmlFor="switch" id="forSwitch">
                    Toggle
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-500 mt-4 px-4 py-3 rounded-lg w-full flex items-center flex-col">
                <div className="text-sm flex items-center justify-between w-full pb-2 border-b border-gray-200 dark:border-gray-400 cursor-pointer">
                  <h1 className="text-sky-400 ">Add account</h1>
                </div>
                <div className="text-sm flex items-center w-full pt-2 cursor-pointer" onClick={() => dispatch((0, auth_1.logout)())}>
                  <h1 className="text-red-500 dark:text-red-400">Log out</h1>
                </div>
              </div>
            </div>
          </div>
        </div>) : (<div className="w-full h-full bg-stone-100 dark:bg-slate-600 flex justify-center items-center">
          <span className="py-1 px-2 text-sm text-gray-400 dark:text-gray-300 bg-white dark:bg-slate-500 rounded-[30px]">
            Select settings
          </span>
        </div>)}
    </>);
};
exports.default = Settings;
