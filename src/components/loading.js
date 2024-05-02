import React from "react";
import "../styles/loading.css"; // Import CSS modules
import { MutatingDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <div className="w-[100%] h-[100%] flex justify-center items-center flex-col">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#3B82F6"
          secondaryColor="#3B82F6"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Mohon Tunggu Sebentar</p>
      </div>
    </>
  );
};

export default Loading;
