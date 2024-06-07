import React, { Component } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "../styles/homepage.css";
import dayjs, { Dayjs } from "dayjs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { AiOutlineAreaChart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import "dayjs/locale/id";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Select from "react-tailwindcss-select";
import Box from "@mui/material/Box";
import { Form } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs, Tab } from "react-bootstrap";
import Sidebar from "../components/menu";
import TimeImage from "../assets/clock.png";
import Loading from "../components/loading";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";
class BarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menu: "dashboard",
      // sudah terpakai
    };
  }

  handleMenu = (name) => {
    this.setState({ menu: name.link });
  };
  render() {
    const menus = [
      { name: "Statistik", link: "statistik", icon: AiOutlineAreaChart },
      { name: "Dashboard", link: "dashboard", icon: MdOutlineDashboard },
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <div className="flex flex-col mx-auto w-[100%] justify-start mt-6 h-[10rem] ">
          <section className="flex gap-6 bg-[#F1F5F9]">
            <div
              className={`bg-blue-800 min-h-screen pl-8 ${
                this.state.open ? "w-72" : "w-[6rem]"
              } duration-500 text-gray-100 px-4 text-xl`}
            >
              <div className="py-3 flex justify-end">
                <HiMenuAlt3
                  size={26}
                  className="cursor-pointer"
                  onClick={() => this.setState({ open: !this.state.open })}
                />
              </div>
              <div
                className={`flex ${
                  this.state.open ? "px-4" : "px-0"
                }items-center justify-center gap-2 py-5.5 lg:py-6.5 mb-10 mt-3 `}
              >
                <div className="flex px-1 justify-start gap-5 w-full items-center text-blue-100">
                  <FaRegUser />
                  {this.state.open && (
                    <>
                      <h5
                        style={{
                          transitionDelay: `${4}00ms`,
                        }}
                        className={`text-xl font-semibold text-blue-100 text-center whitespace-pre duration-500 ${
                          !this.state.open &&
                          "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        Halo Admin
                      </h5>
                    </>
                  )}
                </div>
              </div>

              <div
                className={`${
                  this.state.open ? "p-2" : "p-0"
                } text-base w-full  text-blue-200 `}
              >
                Menu
              </div>
              <div className="mt-4 flex flex-col gap-4 relative text-blue-100">
                {menus?.map((menu, i) => (
                  <button
                    onClick={() => {
                      this.handleMenu(menu);
                    }}
                    key={i}
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !this.state.open &&
                        "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                    <h2
                      className={`${
                        this.state.open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default BarMenu;
