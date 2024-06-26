import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { VscListSelection } from "react-icons/vsc";
import { AiOutlineAreaChart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Select from "react-tailwindcss-select";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DataTable from "../components/table";
import { urlAPI } from "../config/database";
import axios from "axios";
import Print from "../components/print";
import html2canvas from "html2canvas";
import PrintComponent from "../components/print";
import Loading from "../components/loading";
const QrisPayment = () => {
  const menus = [
    { name: "Statistik", link: "statistik", icon: AiOutlineAreaChart },
    { name: "Dashboard", link: "dashboard", icon: MdOutlineDashboard },
  ];

  const [nominal, setNominal] = useState(0);

  useEffect(() => {}, []);

  const handleCheck = async () => {
    const url = urlAPI + "/qris/check";
    try {
      const response = await axios.get(url);
      const option = response.data.data;
      console.log(response);
      setNominal(response.data.qrisValue);
    } catch (error) {
      console.log(error);
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

  return (
    <section className="flex gap-6 ">
      <div className=" mt-8 text-gray-900 font-semibold w-full flex flex-col justify-start items-center ">
        <div className="flex w-full mt-6 h-full flex-col justify-start items-center gap-6 ">
          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-2xl font-semibold bg-white shadow-md p-4 py-6 rounded-xl"
          >
            Cek Nilai Qris Payment Hari Ini
          </div>

          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-sm font-normal bg-white shadow-md p-4 py-6 rounded-xl gap-6"
          >
            <button
              onClick={handleCheck}
              className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl"
            >
              Cek Nominal Qris
            </button>
            <div className="min-w-[10rem] w-auto font-medium h-[3rem] shadow-lg   border transition border-blue-500 flex justify-center items-center bg-white  text-lg rounded-xl">
              {formatRupiah(Math.abs(nominal))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrisPayment;
