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
import { urlAPI } from "../config/database";
import axios from "axios";

const Dashboard = () => {
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
  const [dataAkun, setDataAkun] = useState([]);

  const [dataDetailTrips, setDataDetailTrips] = useState([]);
  const [tripsDisplay, setTripsDisplay] = useState(null);

  const [tripsLength, setTripsLength] = useState(0);

  const [showDetail, setShowDetail] = useState(false);
  const [isTanggal, setIsTanggal] = useState(false);
  const [dataCashflow1, setDataCashflow1] = useState([]);
  const [dataCashflow2, setDataCashflow2] = useState([]);
  const [dataCashflow3, setDataCashflow3] = useState([]);
  const [nilaiCashflow, setNilaiCashflow] = useState(0);
  const [nilaiBalance, setNilaiBalance] = useState({});

  const [title, setTitle] = useState("Dashboard");
  const [idAkun, setIdAkun] = useState("");

  useEffect(() => {
    getAllAcount();
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
      if (isTanggal == false) {
        setIsTanggal(true);
        setTanggalAkhirString(formattedDate);
        setTanggalAkhir(value);
      }
      tanggalMulai = formattedDate;
      setTanggalAwal(value);
      setTanggalAwalString(formattedDate);
    } else {
      tanggalSelesai = formattedDate;
      setTanggalAkhir(value);
      setTanggalAkhirString(formattedDate);
    }
  };

  const handleFilterAkun = (value) => {
    setIdAkun(value);
  };

  const getAllAcount = async () => {
    const url = urlAPI + "/accounts";
    try {
      const response = await axios.get(url);
      const option = response.data.data;
      const optionAkun = option.map((data) => ({
        value: data.id,
        label: data.name,
      }));
      setDataAkun(optionAkun);
    } catch (error) {
      console.log(error);
    }
  };
  const isAnyStateEmpty = () => {
    let emptyStates = [];

    if (!idAkun) emptyStates.push("Akun Kas");
    if (!nilaiCashflow) emptyStates.push("Nominal Kas");

    if (emptyStates.length > 0) {
      Swal.fire({
        title: "Gagal",
        text: `Harap Isi Kolom ${emptyStates}`,
        icon: "error",
      });
      return true;
    }

    return false;
  };
  const handleCashflow = async (e) => {
    e.preventDefault();
    const cek = isAnyStateEmpty();
    if (cek == false) {
      const url = urlAPI + "/arus-kas";
      try {
        const response = await axios.post(
          url,
          {
            tanggalAwal: tanggalAwalString,
            tanggalAkhir: tanggalAkhirString,
            accountId: idAkun.value,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = response.data;
        // Membuat objek untuk menyimpan array berdasarkan nama
        const groupedData = data.data.reduce((acc, item) => {
          if (!acc[item.k01]) {
            acc[item.k01] = [];
          }
          acc[item.k01].push(item);
          return acc;
        }, {});

        const result = Object.values(groupedData);
        console.log(tanggalAwalString, tanggalAkhirString, idAkun);
        console.log(result);
        setDataCashflow1(result[0]);
        setDataCashflow2(result[1]);
        setDataCashflow3(result[2]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formatRupiah = (angka) => {
    const nilai = parseFloat(angka);
    return nilai.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  console.log(dataCashflow3, "akun");
  return (
    <section className="flex gap-6 ">
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
            className="w-[90%] flex justify-start items-center  text-sm font-normal bg-white shadow-md p-4 py-6 rounded-xl gap-6"
          >
            <div className="w-auto flex z-[999] justify-start gap-3 items-center p-2 border border-slate-400 bg-white rounded-xl">
              <div className="flex items-center justify-center z-[999] w-[10rem]">
                <Select
                  options={dataAkun}
                  name="Lokasi"
                  placeholder="Pilih Akun"
                  value={idAkun}
                  onChange={handleFilterAkun}
                  classNames={{
                    menuButton: ({ isDisabled }) =>
                      `ps-3 text-[15px] flex text-base hover:cursor-pointer z-[999] text-slate-500 w-[100%] rounded-lg  transition-all duration-300 focus:outline-none ${
                        isDisabled ? "" : " focus:ring focus:ring-blue-500/20"
                      }`,
                    menu: "  bg-white absolute w-full bg-slate-50  z-[999] w-[100%] border rounded py-1 mt-1.5 text-base text-gray-700",
                    listItem: ({ isSelected }) =>
                      `block transition duration-200 px-2 py-2 cursor-pointer z-[999] select-none truncate rounded-lg ${
                        isSelected
                          ? "text-slate-500 bg-slate-50"
                          : "text-slate-500 hover:bg-blue-100 hover:text-slate-500"
                      }`,
                  }}
                />
              </div>
            </div>
            <div className="w-auto flex h-auto justify-start gap-6 items-center">
              <input
                type="number"
                className=" border border-slate-400 inset-0 w-[10rem] h-[3.4rem] p-2 text-sm rounded-md cursor-pointer"
                placeholder="Masukkan Uang Kas"
                onChange={(e) => {
                  setNilaiCashflow(e.target.value);
                }}
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

              <button
                onClick={handleCashflow}
                className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl"
              >
                Cek Cashflow
              </button>
              <button className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl">
                Export Cashflow
              </button>
            </div>
          </div>
          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-between items-center  text-2xl font-semibold bg-white  p-2cz py-6 rounded-xl"
          >
            <div className="flex p-8 flex-col justify-center items-start gap-1 w-[26rem] h-[10rem] bg-white rounded-xl shadow-lg ">
              <div className="flex justify-between items-center w-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3B82F6"
                    fill-rule="evenodd"
                    d="M11.948 1.25h.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.06.44.075.964.079 1.57c.648.021 1.226.06 1.74.128c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238a17.54 17.54 0 0 1 1.74-.128c.004-.606.02-1.13.079-1.57c.084-.627.27-1.194.725-1.65c.456-.455 1.023-.64 1.65-.725c.595-.08 1.345-.08 2.243-.08M8.752 5.252c.378-.002.775-.002 1.192-.002h4.112c.417 0 .814 0 1.192.002c-.004-.57-.018-1-.064-1.347c-.063-.461-.17-.659-.3-.789c-.13-.13-.328-.237-.79-.3c-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788c-.046.346-.06.776-.064 1.347M5.71 6.89c-1.006.135-1.586.389-2.01.812c-.422.423-.676 1.003-.811 2.009c-.138 1.027-.14 2.382-.14 4.289c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916c-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916c.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h5 className="text-gray-700 text-base font-normal mt-4">
                Total Cashflow Manual
              </h5>
              <h3 className="text-gray-700 text-2xl font-semibold">
                {formatRupiah(nilaiCashflow)}
              </h3>
            </div>
            <div className="flex p-8 flex-col justify-center items-start gap-1 w-[26rem] h-[10rem] bg-white rounded-xl shadow-lg ">
              <div className="flex justify-between items-center w-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3B82F6"
                    fill-rule="evenodd"
                    d="M11.948 1.25h.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.06.44.075.964.079 1.57c.648.021 1.226.06 1.74.128c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238a17.54 17.54 0 0 1 1.74-.128c.004-.606.02-1.13.079-1.57c.084-.627.27-1.194.725-1.65c.456-.455 1.023-.64 1.65-.725c.595-.08 1.345-.08 2.243-.08M8.752 5.252c.378-.002.775-.002 1.192-.002h4.112c.417 0 .814 0 1.192.002c-.004-.57-.018-1-.064-1.347c-.063-.461-.17-.659-.3-.789c-.13-.13-.328-.237-.79-.3c-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788c-.046.346-.06.776-.064 1.347M5.71 6.89c-1.006.135-1.586.389-2.01.812c-.422.423-.676 1.003-.811 2.009c-.138 1.027-.14 2.382-.14 4.289c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916c-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916c.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h5 className="text-gray-700 text-base font-normal mt-4">
                Total Cashflow Sistem
              </h5>
              <h3 className="text-gray-700 text-2xl font-semibold">
                {dataCashflow3.length > 0 && (
                  <>{formatRupiah(dataCashflow3[0].jml)}</>
                )}
              </h3>
            </div>
            <div className="flex p-8 flex-col justify-center items-start gap-1 w-[26rem] h-[10rem] bg-white rounded-xl shadow-lg ">
              <div className="flex justify-between items-center w-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3B82F6"
                    fill-rule="evenodd"
                    d="M11.948 1.25h.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.06.44.075.964.079 1.57c.648.021 1.226.06 1.74.128c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238a17.54 17.54 0 0 1 1.74-.128c.004-.606.02-1.13.079-1.57c.084-.627.27-1.194.725-1.65c.456-.455 1.023-.64 1.65-.725c.595-.08 1.345-.08 2.243-.08M8.752 5.252c.378-.002.775-.002 1.192-.002h4.112c.417 0 .814 0 1.192.002c-.004-.57-.018-1-.064-1.347c-.063-.461-.17-.659-.3-.789c-.13-.13-.328-.237-.79-.3c-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788c-.046.346-.06.776-.064 1.347M5.71 6.89c-1.006.135-1.586.389-2.01.812c-.422.423-.676 1.003-.811 2.009c-.138 1.027-.14 2.382-.14 4.289c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916c-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916c.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75"
                    clip-rule="evenodd"
                  />
                </svg>
                {dataCashflow3.length > 0 && (
                  <>
                    {nilaiCashflow !== dataCashflow3[0].jml && (
                      <>
                        <div className="bg-red-100 border w-[10rem] border-red-500 rounded-xl flex justify-center items-center p-2 text-base text-red-600">
                          {nilaiCashflow < dataCashflow3[0].jml
                            ? "Kurang"
                            : "Lebih"}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <h5 className="text-gray-700 text-base font-normal mt-4">
                Total Selisih
              </h5>
              <h3 className="text-gray-700 text-2xl font-semibold">
                {dataCashflow3.length > 0 && (
                  <>{formatRupiah(nilaiCashflow - dataCashflow3[0].jml)}</>
                )}
              </h3>
            </div>
          </div>
          {/* <DataTable
            data-aos="fade-up"
            data-aos-delay="150"
            handleDetail={handleMenu}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
