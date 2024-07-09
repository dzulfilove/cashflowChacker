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
import PrintQris from "../components/printQris";
const QrisPage = () => {
  const menus = [
    { name: "Statistik", link: "statistik", icon: AiOutlineAreaChart },
    { name: "Dashboard", link: "dashboard", icon: MdOutlineDashboard },
  ];
  const [cek, setCek] = useState(false);
  const [menu, setMenu] = useState("dashboard");
  const [tanggalAwal, setTanggalAwal] = useState(dayjs().locale("id"));
  const [tanggalAwalString, setTanggalAwalString] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const [tanggalAkhirString, setTanggalAkhirString] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const [tanggal, setTanggal] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );

  const [isCek, setisCek] = useState(false);

  const [dataCashflow3, setDataCashflow3] = useState([]);
  const [dataCash, setDataCash] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [selisihUang, setSelisih] = useState(0);

  const [nilaiCashflow, setNilaiCashflow] = useState(0);
  const [dataKas, setdataKas] = useState({});
  const [isStateSet, setIsStateSet] = useState(false);

  const [idAkun, setIdAkun] = useState("");

  const user = sessionStorage.getItem("userEmail");
  const contentToPrint = useRef(null);

  useEffect(() => {
    if (isStateSet) {
      setIsStateSet(false); // Reset flag state
    }
  }, [isStateSet]);

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
      setCek(false);

      return true;
    }

    return false;
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

  const handleCashflow = async (e) => {
    e.preventDefault();

    if (nilaiCashflow == 0) {
      Swal.fire({
        title: "Perhatian!",
        text: `Masukkan Nilai Cashflow Terlebih Dahulu`,
        confirmButtonText: "OK",
      });
    } else {
      setCek(true);

      const cek = false;
      if (cek == false) {
        const url = urlAPI + "/qris/check";

        try {
          console.log("cek");

          const response = await axios.post(
            url,
            {
              username: user,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = response.data;
          console.log(data, "Hasil Qris");

          // Membuat objek untuk menyimpan array berdasarkan nama
          const groupedData = data.detailQris.reduce((acc, item) => {
            if (!acc[item.k01]) {
              acc[item.k01] = [];
            }
            acc[item.k01].push(item);
            return acc;
          }, {});

          const result = Object.values(groupedData);
          console.log(result, "hasil");
          if (result.length <= 1) {
            Swal.fire({
              title: "Perhatian!",
              text: `Belum Ada Data Transaksi QRIS`,
              confirmButtonText: "OK",
            });
            setCek(false);
          } else {
            const hour = dayjs().locale("id").format("HH:mm");
            const dataCash = result[0];
            const dataModal = result[1];
            const selisih =
              parseInt(nilaiCashflow) - parseInt(dataModal[0].jml);
            console.log(selisih, "modal");

            let ket = "";
            if (Math.abs(selisih) > 0.5) {
              if (nilaiCashflow < dataCash[0].jml) {
                ket = "Kurang";
              } else if (nilaiCashflow > dataCash[0].jml) {
                ket = "Lebih";
              } else {
                ket = "Sama";
              }
            }

            console.log(data, "data result");
            await new Promise((resolve) => {
              setSelisih(Math.abs(selisih));
              setdataKas(data);
              setDataCash(dataCash);
              setDataModal(dataModal[0]);
              setCek(false);

              resolve(); // Pastikan promise ini diselesaikan
            });

            const text = `\n\n<b> ${
              data.namaPerusahaan
            }</b>\n---------------------------------------------------------------------\n<b>Riwayat Pengecekan Nominal QRIS Yang Tidak Sesuai Pada Sistem Acosys</b>\n\n<b>Nama Pengecek :  </b>${
              data.namaUser
            }\n<b>Hari, Tanggal  : </b> ${formatTanggal(
              tanggal
            )}\n<b>Pukul Cek: </b> ${hour} \n<b>Lokasi : </b> ${
              data.namaPerusahaan
            }  \n<b>Nama Akun QRIS : ${
              dataModal[0].k05
            } </b> \n<b>Nilai Kas Manual : ${formatRupiah(
              nilaiCashflow
            )} </b> \n<b>Nilai Kas Sistem : ${formatRupiah(
              dataModal[0].jml
            )} </b>\n<b>Selisih : </b> ${ket} ${formatRupiah(
              Math.abs(selisih)
            )}\n\n`;
            setTimeout(() => {
              handleSendImage(text); // Pastikan handleSendImage dipanggil setelah state diset
            }, 0);
            // if (nilaiCashflow !== dataCash[0].jml) {
            //   const text = `\n\n<b> ${
            //     data.namaPerusahaan
            //   }</b>\n---------------------------------------------------------------------\n<b>Riwayat Pengecekan Nominal Cashflow Yang Tidak Sesuai Pada Sistem Acosys</b>\n\n<b>Nama Pengecek :  </b>${
            //     data.namaUser
            //   }\n<b>Hari, Tanggal Cek : </b> ${formatTanggal(
            //     tanggal
            //   )}\n<b>Hari, Tanggal Jurnal Kas : </b> ${
            //     tanggalAkhirString != tanggalAkhirString
            //       ? formatTanggal(tanggalAwalString) +
            //         " - " +
            //         formatTanggal(tanggalAkhirString)
            //       : formatTanggal(tanggalAwalString)
            //   }\n<b>Pukul Cek: </b> ${hour} \n<b>Lokasi : </b> ${
            //     data.namaPerusahaan
            //   }  \n<b>Nama Akun Kas : ${
            //     idAkun.label
            //   } </b> \n<b>Nilai Kas Manual : ${formatRupiah(
            //     nilaiCashflow
            //   )} </b> \n<b>Nilai Kas Sistem : ${formatRupiah(
            //     dataCash[0].jml
            //   )} </b>\n<b>Selisih : </b> ${ket} ${formatRupiah(
            //     Math.abs(selisih)
            //   )}\n\n`;

            //   console.log(text);
            //   setTimeout(() => {
            //     // handleSendImage(text); // Pastikan handleSendImage dipanggil setelah state diset
            //   }, 0);
            // }
          }
        } catch (error) {
          console.log(error);
        }
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
  const sendMessage = async (text, topic) => {
    try {
      const response = await fetch(
        "https://api.telegram.org/bot6823587684:AAE4Ya6Lpwbfw8QxFYec6xAqWkBYeP53MLQ/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: "-1001812360373",

            text: text,
            message_thread_id: "19535",
            parse_mode: "html",
          }),
        }
      );

      // Cek apakah respons dari fetch adalah OK (status code 200)
      if (response.ok) {
        console.log("berhasilllllll");
      } else {
        console.log("gagalllllll");
      }
    } catch (error) {
      // Tangani kesalahan yang terjadi selama fetch
      console.error("Error:", error);
      // alert("Terjadi kesalahan. Silakan coba lagi.");
    }
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

  const sendImage = async (text, fotoBlob) => {
    try {
      const formData = new FormData();
      formData.append("chat_id", "-1001812360373"); // Ganti dengan chat ID tujuan
      formData.append("photo", fotoBlob, "image.png"); // Foto sebagai blob
      formData.append("caption", text);
      formData.append("message_thread_id", "19535");
      formData.append("parse_mode", "html");

      const response = await fetch(
        "https://api.telegram.org/bot6823587684:AAE4Ya6Lpwbfw8QxFYec6xAqWkBYeP53MLQ/sendPhoto",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Image sent successfully");
        // alert("Image sent successfully!");
      } else {
        const errorData = await response.json();
        console.log("Failed to send image", errorData);
        alert(`Failed to send image: ${errorData.description}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("An error occurred. Please try again.");
    }
  };

  const handleSendImage = async (text) => {
    if (!contentToPrint.current) {
      // alert("No content to send!");
      return;
    }

    try {
      const canvas = await html2canvas(contentToPrint.current);
      canvas.toBlob(async (blob) => {
        await sendImage(text, blob);
      }, "image/png");
      // alert("image sended");
    } catch (error) {
      console.error("Error capturing or sending image:", error);
      alert("Failed to send image.");
    }
  };

  const optionKas = [
    {
      value: "Rekap",
      label: "Rekap",
    },
    {
      value: "Detail",
      label: "Detail",
    },
  ];

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
            Qris Payment
          </div>

          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-sm font-normal bg-white shadow-md p-4 py-6 rounded-xl gap-6"
          >
            <div className="w-auto flex h-auto justify-start gap-6 items-center">
              <input
                type="number"
                className=" border border-slate-400 inset-0 w-[20rem] h-[3.4rem] p-2 text-sm rounded-md cursor-pointer"
                placeholder="Masukkan Nominal QRIS"
                onChange={(e) => {
                  setNilaiCashflow(e.target.value);
                }}
              />

              <button
                onClick={cek == false ? handleCashflow : () => {}}
                className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl"
              >
                Cek QRIS
              </button>
              {isCek == true && (
                <>
                  <button
                    onClick={handlePrint}
                    className="w-[10rem] font-medium h-[3rem] shadow-lg hover:bg-white hover:border-blue-500 border transition hover:text-blue-500 border-transparent flex justify-center items-center bg-blue-500 text-white rounded-xl"
                  >
                    Export Cashflow
                  </button>
                </>
              )}
            </div>
          </div>
          {cek == true ? (
            <Loading />
          ) : (
            <>
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
                    Total QRIS Manual
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
                    Total QRIS Sistem
                  </h5>
                  <h3 className="text-gray-700 text-2xl font-semibold">
                    {dataModal.jml
                      ? formatRupiah(dataModal.jml)
                      : formatRupiah(0)}
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
                        {nilaiCashflow !== dataModal.jml && (
                          <>
                            <div className="bg-red-100 border w-[10rem] border-red-500 rounded-xl flex justify-center items-center p-2 text-base text-red-600">
                              {parseInt(nilaiCashflow) < parseInt(dataModal.jml)
                                ? "Kurang"
                                : parseInt(nilaiCashflow) >
                                  parseInt(dataModal.jml)
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
                    {formatRupiah(selisihUang)}
                  </h3>
                </div>
              </div>

              <div ref={contentToPrint}>
                <PrintQris
                  dataCash={dataCash}
                  dataModal={dataModal}
                  tanggal={tanggal}
                  dataKas={dataKas}
                  idAkun={idAkun.label}
                  tanggalAwalString={tanggalAwalString}
                  tanggalAkhirString={tanggalAkhirString}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QrisPage;
