import React from "react";
import { Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { HiDocumentCheck } from "react-icons/hi2";

const Nav = () => {
  return (
    <nav className="fixed bottom-2 overflow-hidden z-50 w-full">
      <div className="container mx-auto">
        <div className="w-full bg-blue-500 h-[70px] backdrop-blur-2xl rounded-full max-w-[300px] mx-auto px-5 flex justify-between text-2xl text-white/50 items-center">
          <Link
            to="/"
            activeClass="active"
            offset={-90}
            className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
            <RiHomeFill />
          </Link>
          <Link
            to="/janji-temu"
            activeClass="active"
            smooth={true}
            spy={true}
            className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
            <FaHandHoldingHeart />
          </Link>
          <Link
            to="/tindakan"
            activeClass="active"
            smooth={true}
            spy={true}
            className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
            <HiDocumentCheck />
          </Link>
          <Link
            to="/terapis"
            activeClass="active"
            smooth={true}
            spy={true}
            className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
            <FaUserDoctor />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
