import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-5 justify-between self-center px-3 w-full max-w-[367px]">
      <div className="my-auto text-xl font-medium leading-6 text-black capitalize">
        Jadwal Hari Ini
      </div>
      <div className="flex gap-4">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb52366082b5ffeff39179fc487c8b0862a72b54d1514b2779cb106f6f8bc0a5?"
          className="shrink-0 my-auto aspect-[0.85] fill-zinc-300 w-[18px]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#2d9cf4"
            d="M19 2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l3 3l3-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-7 3c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3M7.177 16c.558-1.723 2.496-3 4.823-3s4.266 1.277 4.823 3z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
