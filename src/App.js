import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/Home";
import { VscListSelection } from "react-icons/vsc";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { AiOutlineAreaChart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Select from "react-tailwindcss-select";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import { IoMdExit } from "react-icons/io";
import Dashboard from "./pages/dashboard";
import RegistartionForm from "./pages/auth";
import History from "./pages/history";
import DetailHistory from "./pages/detailHistory";
import QrisPayment from "./pages/qrisPayment";
import DataPenjualan from "./pages/dataPenjualan";
import QrisPage from "./pages/qrisPage";
const App = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const menus = [
    // { name: "Statistik", link: "", icon: AiOutlineAreaChart },
    { name: "Dashboard", link: "", icon: MdOutlineDashboard },
    { name: "Logout", link: "", icon: IoMdExit, handle: "handleLogout" },
  ];
  const menusMain = [
    { name: "Statistik", link: "", icon: AiOutlineAreaChart },
    { name: "Dashboard", link: "", icon: MdOutlineDashboard },
  ];
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState("dashboard");
  const [tanggalAwal, setTanggalAwal] = useState(
    dayjs("2024-05-01").locale("id")
  );
  const [tanggalAwalString, setTanggalAwalString] = useState("2024-05-01");

  const [tanggalAkhirString, setTanggalAkhirString] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );
  const [tanggalAkhir, setTanggalAkhir] = useState(dayjs().locale("id"));

  const [dataFilter, setDataFilter] = useState([]);

  const [dataDetailTrips, setDataDetailTrips] = useState([]);
  const [tripsDisplay, setTripsDisplay] = useState(null);

  const [tripsLength, setTripsLength] = useState(0);

  const [showDetail, setShowDetail] = useState(false);

  const [title, setTitle] = useState("Dashboard");

  useEffect(() => {
    // Efek samping yang ingin dijalankan
    // getAllUser();
    // getAllTrips();
  }, []);
  const handleMenu = (name) => {
    setMenu(name.link);
    if (name.link == "dashboard") {
      setShowDetail(false);
    }
    setTitle(name.name);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userEmail");
    window.location.href = "/";
  };
  const handleFilterTanggal = (name, value) => {
    const dayjsDate = dayjs(value);

    let tanggalMulai = tanggalAwalString;
    let tanggalSelesai = tanggalAkhirString;

    if (!dayjsDate.isValid()) {
      return;
    }

    const formattedDate = dayjsDate.format("YYYY-MM-DD");

    if (name == "tanggalAwal") {
      tanggalMulai = formattedDate;
      setTanggalAwal(value);
      setTanggalAwalString(formattedDate);
    } else {
      tanggalSelesai = formattedDate;
      setTanggalAkhir(value);
      setTanggalAkhirString(formattedDate);
    }
  };
  return (
    <section className={`flex w-full gap-6 bg-transparent`}>
      <div
        className={`bg-blue-800 min-h-screen pl-8 ${
          open ? "w-[15rem]" : "w-[6rem]"
        } duration-500 text-gray-100 px-4 text-xl`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={`flex ${
            open ? "px-4" : "px-0"
          }items-center justify-center gap-2 py-5.5 lg:py-6.5 mb-10 mt-3 `}
        >
          <div
            className="flex px-1 justify-start gap-5 w-full items-center text-blue-100"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            {/* <img
              loading="lazy"
              src={Logo}
              className="shrink-0  w-8  h-8 bg-slate-900 rounded-xl object-cover"
            /> */}
            <FaRegUser />
            {open && (
              <>
                <h5
                  style={{
                    transitionDelay: `${4}00ms`,
                  }}
                  className={`text-xl font-semibold text-blue-100 text-center whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Halo Admin
                </h5>
              </>
            )}
          </div>
        </div>

        <div
          className={`${open ? "p-2" : "p-0"} text-base w-full  text-blue-200 `}
        >
          Menu
        </div>
        <div className="mt-4 flex flex-col gap-4 relative text-blue-100">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  window.location.href = `/`;
                }}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
              >
                <div>
                  {React.createElement(MdOutlineDashboard, { size: "20" })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${1 + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Cashflow
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Cashflow
                </h2>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  window.location.href = `/`;
                }}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
              >
                <div>
                  {React.createElement(MdOutlineDashboard, { size: "20" })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${1 + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Cashflow
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Cashflow
                </h2>
              </button>
              <button
                onClick={() => {
                  window.location.href = `/qris-payment`;
                }}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
              >
                <div>
                  {React.createElement(MdOutlineDashboard, { size: "20" })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${1 + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Qris Payment
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Qris Payment
                </h2>
              </button>
              <button
                onClick={() => {
                  window.location.href = `/riwayat`;
                }}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
              >
                <div>
                  {React.createElement(VscListSelection, { size: "20" })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${1 + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Riwayat
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Riwayat
                </h2>
              </button>
              <button
                onClick={handleLogout}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-blue-600 rounded-md`}
              >
                <div>{React.createElement(IoMdExit, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${2 + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Logout
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Logout
                </h2>
              </button>
            </>
          )}
        </div>
      </div>
      <div className=" mt-8 text-gray-900 font-semibold w-full flex flex-col justify-start items-center ">
        <Router>
          <div className="h-[100vh] w-[100%] overflow-y-scroll p-0 m-0">
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/qris-payment" element={<QrisPage />} />
                  <Route path="/riwayat" element={<History />} />
                  <Route
                    path="/detail-riwayat/:id"
                    element={<DetailHistory />}
                  />
                  <Route path="/add-data" element={<DataPenjualan />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<RegistartionForm />} />
                  <Route path="/add-data" element={<DataPenjualan />} />
                </>
              )}
            </Routes>
          </div>
        </Router>
      </div>
    </section>
  );
};

export default App;
