import axios from "axios";
import React, { useState } from "react";
import { urlAPI } from "../config/database";
const RegistartionForm = () => {
  const [username, setusername] = useState("");
  const [password, setPassowrd] = useState("");
  const [data, setData] = useState({});

  const handleLogin = async () => {
    const url = urlAPI + "/login";
    try {
      console.log("cek");

      const response = await axios.post(
        url,
        {
          username: username,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      const user = data.user;
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("userEmail", username);
      window.location.href = "/";
      console.log(data.user);
      setData(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-800 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-800">
                Cashflow Checker
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  placeholder="Enter your name"
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  onChange={(e) => {
                    setPassowrd(e.target.value);
                  }}
                  placeholder="Enter your Password"
                />

                <button
                  onClick={handleLogin}
                  className="mt-5 tracking-wide font-semibold bg-blue-800 text-gray-100 w-full py-4 rounded-lg hover:bg-white hover:border-blue-800 border transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none hover:text-blue-800"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Masuk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistartionForm;
