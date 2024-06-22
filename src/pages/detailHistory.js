import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";

import { useReactToPrint } from "react-to-print";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Swal from "sweetalert2";

import { urlAPI } from "../config/database";
import axios from "axios";

import PrintComponent from "../components/print";
import withRouter from "../withRouter";
import { useParams } from "react-router-dom";
const DetailHistory = () => {
  const [tanggalAwalString, setTanggalAwalString] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const [tanggalAkhirString, setTanggalAkhirString] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const [tanggal, setTanggal] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const { id } = useParams();

  console.log(id);
  const [isTanggal, setIsTanggal] = useState(false);
  const [dataCashflow1, setDataCashflow1] = useState([]);
  const [dataCashflow2, setDataCashflow2] = useState([]);
  const [dataCashflow3, setDataCashflow3] = useState([]);
  const [dataDetailAwal, setDataDetailAwal] = useState([]);
  const [dataDetailMasuk, setDataDetailMasuk] = useState([]);
  const [dataDetailAkhir, setDataDetailAkhir] = useState([]);
  const [dataDetailKeluar, setDataDetailKeluar] = useState([]);
  const [nilaiCashflow, setNilaiCashflow] = useState(0);
  const [dataKas, setdataKas] = useState({});
  const [isStateSet, setIsStateSet] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const [idAkun, setIdAkun] = useState("");
  const [kas, setKas] = useState("");
  const user = sessionStorage.getItem("userEmail");
  const contentToPrint = useRef(null);

  useEffect(() => {
    if (isStateSet) {
      // Panggil handleSendImage atau fungsi lainnya setelah state diset
      // Lakukan sesuatu di sini
      setIsStateSet(false); // Reset flag state
    }
    getHistory();
    getDetailHistory();
  }, [isStateSet]);

  const getDetailHistory = async () => {
    const url = urlAPI + "/history-check-detail/select";
    try {
      const response = await axios.post(
        url,
        {
          idHistory: id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("cek", response);
    } catch (error) {
      console.log(error);
    }
  };

  const getHistory = async () => {
    const url = urlAPI + "/history-check/select";
    try {
      const response = await axios.post(
        url,
        {
          id: id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("cek", response);
    } catch (error) {
      console.log(error);
    }
  };
  const formatTanggal = (tanggal) => {
    const hari = dayjs(tanggal).locale("id").format("dddd");
    const bulan = dayjs(tanggal).locale("id").format("MMMM");
    const hasil =
      hari +
      " , " +
      tanggal.substring(8, 10) +
      " " +
      bulan +
      " " +
      tanggal.substring(0, 4);
    console.log("tanggal", dayjs(tanggal).locale("id").format("MMMM"));

    return hasil;
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
  const formatRupiah2 = (angka) => {
    const nilai = parseFloat(angka);
    const isNegative = nilai < 0;
    const absoluteValue = Math.abs(nilai);

    const formattedValue = absoluteValue.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return isNegative ? `(${formattedValue})` : formattedValue;
  };

  const cetak = () => {
    handlePrint(null, () => {
      if (contentToPrint.current) {
        return contentToPrint.current;
      }

      return null; // Handle the case where content isn't ready
    });
  };
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
  });

  function formatTime(dateString) {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    const strTime = `${hours}:${minutesStr} ${ampm}`;
    return strTime;
  }

  console.log(dataCashflow3, "akun");
  return (
    <section className="flex gap-6 ">
      <div className=" mt-8 text-gray-900 font-semibold w-full flex flex-col justify-start items-center ">
        <div className="flex w-full mt-6 h-full flex-col justify-start items-center gap-6 ">
          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-2xl font-semibold bg-white shadow-md p-4 py-6 rounded-xl"
          >
            Detail Cashflow
          </div>

          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-sm font-normal bg-white shadow-md p-4 py-6 rounded-xl gap-6"
          >
            {/* <div className="w-auto flex z-[999] justify-start gap-3 items-center p-2 border border-slate-400 bg-white rounded-xl">
              <div className="flex items-center justify-center z-[999] w-[10rem]">
                <Select
                  options={optionKas}
                  name="Lokasi"
                  placeholder="Pilih Jenis Rekap"
                  value={kas}
                  onChange={(data) => {
                    setKas(data);
                  }}
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
            </div> */}
            <button
              onClick={handlePrint}
              className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl"
            >
              Export Cashflow
            </button>
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
                {dataCashflow3.length > 0 ? (
                  <>{formatRupiah(dataCashflow3[0].jml)}</>
                ) : (
                  <>{formatRupiah(0)}</>
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
                          {parseInt(nilaiCashflow) <
                          parseInt(dataCashflow3[0].jml)
                            ? "Kurang"
                            : parseInt(nilaiCashflow) >
                              parseInt(dataCashflow3[0].jml)
                            ? "Lebih"
                            : "Sama"}
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
                {dataCashflow3.length > 0 ? (
                  <>{formatRupiah(nilaiCashflow - dataCashflow3[0].jml)}</>
                ) : (
                  <>{formatRupiah(0)}</>
                )}
              </h3>
            </div>
          </div>

          {kas.value == "Rekap" ? (
            <>
              <div ref={contentToPrint}>
                <PrintComponent
                  dataCashflow1={dataCashflow1}
                  dataCashflow2={dataCashflow2}
                  dataCashflow3={dataCashflow3}
                  tanggal={tanggal}
                  dataKas={dataKas}
                  idAkun={idAkun}
                  tanggalAwalString={tanggalAwalString}
                  tanggalAkhirString={tanggalAkhirString}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="flex w-[50rem] border  rounded-md p-4 flex-col justify-start items-start mb-20 mt-10 ml-0">
                  <div className="w-[100%] flex justify-start items-start flex-col gap-2 mb-6">
                    <h5 className="font-medium text-base">
                      {dataKas.namaPerusahaan}
                    </h5>
                    <h5 className="text-base font-normal">DETAIL ARUS KAS</h5>
                  </div>
                  <div className="w-[100%] flex justify-start items-start flex-col gap-1 mb-6">
                    <div className="font-medium text-sm flex w-full justify-start items-center">
                      <div className="flex justify-between w-[7rem]">
                        Jenis Kas
                      </div>
                      <div className="flex justify-between w-[20rem]">
                        : {idAkun.label}
                      </div>
                    </div>
                    <div className="font-medium text-sm flex w-full justify-start items-center">
                      <div className="flex justify-between w-[7rem]">
                        Periode
                      </div>
                      <div className="flex justify-between w-[20rem]">
                        :{" "}
                        {isTanggal == false
                          ? formatTanggal(tanggalAwalString)
                          : formatTanggal(tanggalAwalString) +
                            " - " +
                            formatTanggal(tanggalAkhirString)}
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-start items-start flex-col  border border-slate-500 ">
                    <div className="w-[100%] flex justify-start items-start ">
                      <div className="w-[70%] flex flex-col justify-center items-center border border-slate-500">
                        <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                          No Jurnal
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex justify-start items-center py-1 w-full font-medium italic">
                            Saldo Awal
                          </div>
                          {dataDetailAwal.map((data) => (
                            <div className="pl-16 flex justify-start items-center py-1 w-full font-normal"></div>
                          ))}
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex justify-start items-center py-1 w-full font-medium italic">
                            Perubahan Kas
                          </div>
                          <div className="flex pl-8 justify-start items-center py-1 w-full font-medium italic">
                            Kas Masuk
                          </div>
                          {dataDetailMasuk != undefined && (
                            <>
                              {dataDetailMasuk.map((data) => (
                                <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                                  {data.k04}
                                </div>
                              ))}
                            </>
                          )}

                          <div className="flex pl-8 justify-start items-center py-1 w-full font-medium italic">
                            Kas Keluar
                          </div>
                          {dataDetailKeluar != undefined && (
                            <>
                              {dataDetailKeluar.map((data) => (
                                <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                                  {data.k04}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex pl-8 justify-start items-center py-1 w-full font-medium italic"></div>
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex mb-2 justify-start items-center py-1 w-full font-medium italic">
                            Saldo Akhir
                          </div>
                        </div>
                      </div>
                      <div className="w-[70%] flex flex-col justify-center items-center border border-slate-500">
                        <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                          Nama Jurnal
                        </div>

                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataDetailAwal.map((data) => (
                            <div className="mt-2 flex justify-start items-center py-1 w-full font-normal">
                              {data.k05}
                            </div>
                          ))}
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataDetailMasuk != undefined && (
                            <>
                              {dataDetailMasuk.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-14 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {data.k05}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                          {dataDetailKeluar != undefined && (
                            <>
                              {dataDetailKeluar.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-5 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {data.k05}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                          {dataDetailAkhir.map((data) => (
                            <div className=" flex justify-start items-center py-1 w-full font-normal">
                              {data.k05}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-[70%] flex flex-col justify-center items-center border border-slate-500">
                        <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                          Jumlah
                        </div>

                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataCashflow1.map((data) => (
                            <div className="mt-2 flex justify-start items-center py-1 w-full font-normal">
                              {formatRupiah(data.jml)}
                            </div>
                          ))}
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataDetailMasuk != undefined && (
                            <>
                              {dataDetailMasuk.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-14 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {formatRupiah2(data.jml)}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                          {dataDetailKeluar != undefined && (
                            <>
                              {dataDetailKeluar.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-5 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {formatRupiah2(data.jml)}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                          {dataCashflow3.map((data) => (
                            <div className=" flex justify-start items-center py-1 w-full font-normal">
                              {formatRupiah(data.jml)}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-[30%] flex flex-col justify-center items-center border border-slate-500">
                        <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                          Waktu
                        </div>

                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataDetailAwal.map((data) => (
                            <div className="mt-2 flex justify-start items-center py-1 w-full font-normal">
                              {formatTime(data.k08)}
                            </div>
                          ))}
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          {dataDetailMasuk != undefined && (
                            <>
                              {dataDetailMasuk.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-14 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {formatTime(data.k08)}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>

                          {dataDetailKeluar != undefined && (
                            <>
                              {dataDetailKeluar.map((data, i) => (
                                <div
                                  className={` ${
                                    i == 0 ? "mt-5 bg-black" : ""
                                  }flex justify-start items-center py-1 w-full font-normal`}
                                >
                                  {formatTime(data.k08)}
                                </div>
                              ))}
                            </>
                          )}
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                        </div>
                        <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                          <div className="flex justify-start items-center py-1 w-full font-medium italic"></div>
                          {dataDetailAkhir.map((data) => (
                            <div className=" flex justify-start items-center py-1 w-full font-normal">
                              {formatTime(data.k08)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-sm flex w-full justify-end  items-center mt-6">
                    <div className="font-medium text-sm flex flex-col justify-end  items-center mt-6">
                      <div className="flex justify-center w-[15rem]">
                        Dicetak Pada : {formatTanggal(tanggal)}
                      </div>
                      <div className="flex justify-between ">Petugas</div>
                      <div className="flex justify-between h-[5rem] items-end">
                        {dataKas.namaUser}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailHistory;
