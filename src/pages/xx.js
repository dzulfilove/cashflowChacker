import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { AiOutlineAreaChart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Select from "react-tailwindcss-select";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";

import DataTable from "../components/table";

const SidebarMenu = () => {
  const menus = [
    { name: "Statistik", link: "statistik", icon: AiOutlineAreaChart },
    { name: "Dashboard", link: "dashboard", icon: MdOutlineDashboard },
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
    <section className="flex gap-6 bg-[#F1F5F9]">
      <div
        className={`bg-blue-800 min-h-screen pl-8 ${
          open ? "w-72" : "w-[6rem]"
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
            to="/dashboard"
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
          {menus?.map((menu, i) => (
            <button
              onClick={() => {
                handleMenu(menu);
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
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </button>
          ))}
        </div>
      </div>
      <div className=" mt-8 text-gray-900 font-semibold w-full flex flex-col justify-start items-center ">
        <div className="flex w-full mt-6 h-full flex-col justify-start items-center gap-6 ">
          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-2xl font-semibold bg-white shadow-md p-4 py-6 rounded-xl"
          >
            {menu == "dashboard" && (
              <>
                {showDetail == true && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetail(false);
                        setTitle("Dashboard");
                      }}
                      className="w-8 h-8 flex justify-center items-center rounded-lg  mr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="#3B82F6"
                          d="M7.4 12.5L3.8 9H16V7H3.8l3.6-3.5l-1.5-1.4L0 8l5.9 5.9z"
                        />
                      </svg>
                    </button>{" "}
                  </>
                )}
              </>
            )}
            {title}
          </div>

          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-sm font-normal bg-white shadow-md p-4 py-6 rounded-xl"
          >
            <div className="w-auto flex h-auto justify-start gap-6 items-center">
              <input
                type="number"
                className=" border border-slate-500 inset-0 w-[10rem] h-[3.4rem] p-2 text-sm rounded-md cursor-pointer"
                placeholder="Masukkan Uang Kas"
                // onChange={() => {
                //   this.setState({});
                // }}
              />
              <div className="w-[10rem] flex justify-center items-center ">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="id"
                >
                  <DatePicker
                    name="tanggalAwal"
                    locale="id"
                    className="bg-white text-sm"
                    label="Tanggal Awal"
                    value={tanggalAwal}
                    onChange={(selectedDate) =>
                      handleFilterTanggal("tanggalAwal", selectedDate)
                    }
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="dd/mm/yyyy"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div
                className="w-[10rem] flex justify-center items-center text-sm
                font-medium "
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="id"
                >
                  <DatePicker
                    name="tanggalAwal"
                    locale="id"
                    className="bg-white text-sm"
                    label="Tanggal Akhir"
                    value={tanggalAkhir}
                    onChange={(selectedDate) =>
                      handleFilterTanggal("tanggalAkhir", selectedDate)
                    }
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="dd/mm/yyyy"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>

              <button className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl">
                Cek Cashflow
              </button>
              <button className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl">
                Export Cashflow
              </button>
            </div>
          </div>

          <DataTable
            data-aos="fade-up"
            data-aos-delay="150"
            data={tripsDisplay}
            showDetail={showDetail}
            jumlah={tripsLength}
            dataTrips={dataFilter}
            detailData={dataDetailTrips}
            handleDetail={handleMenu}
          />
        </div>
      </div>
    </section>
  );
};

export default SidebarMenu;
