import React from "react";
import "../styles/loading.css"; // Import CSS modules
import { MutatingDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <div className="w-[100%] h-[100%] mt-20 flex justify-center items-center flex-col gap-10">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
        <p>Mohon Tunggu Sebentar</p>
      </div>
    </>
  );
};

export default Loading;
