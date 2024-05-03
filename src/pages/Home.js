import React, { Component } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "../styles/homepage.css";

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
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // sudah terpakai
      dokterHadir: [],
      jenisKelamin: null,
      dokterHadirLakilaki: [],
      dokterHadirPerempuan: [],
      janjiSaatIni: [],
      janjiSudahSelesai: [],
      // belum terpakai
      dataList: [],
      dataRegistrasi: {},
      kd_dokter: "",
      dokterTerpilih: {},
      catatan: "",
      trigger: false,
      no_rkm: "",
      isBayar: false,
      value: "tab2",
      loading: false,
    };
  }

  handleTab = (newValue) => {
    this.setState({ value: newValue });
  };
  componentDidMount() {
    this.getAllKehadiran();
    this.getAllJanjiSaatIni();
    this.getAllJanjiSudahSelesai();
  }

  getAllKehadiran = async () => {
    try {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0"); //
      const formattedDate = `${year}-${month}-${day}`;

      const kehadiranCollection = collection(db, "kehadirans");
      const querySnapshot = await getDocs(
        query(kehadiranCollection, where("tanggal", "==", formattedDate))
      );

      const kehadiranList = [];
      for (const doc of querySnapshot.docs) {
        const kehadiranData = doc.data();

        // Mendapatkan nama dokter dari referensi dokter_ref
        const dokterDoc = await getDoc(kehadiranData.dokter_ref);
        const foto = dokterDoc.data().foto;
        const namaDokter = dokterDoc.data().nama;
        const jenisKelamin = dokterDoc.data().jenis_kelamin;
        const pengalaman = dokterDoc.data().pengalaman;
        const umur = dokterDoc.data().umur;

        kehadiranList.push({
          id: doc.id,
          foto: foto,
          nama: namaDokter,
          jenis_kelamin: jenisKelamin,
          pengalaman: pengalaman,
          umur: umur,
        });
      }

      await new Promise((resolve) => {
        this.setState({ dokterHadir: kehadiranList }, resolve);
      });
    } catch (error) {
      console.error("Error fetching kehadiran:", error);
      throw error;
    }
  };

  getAllJanjiSaatIni = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const janjiTemuCollection = collection(db, "janji_temu");
      const querySnapshot = await getDocs(
        query(
          janjiTemuCollection,
          where("tanggal", "==", formattedDate),
          where("status", "==", "berlangsung")
        )
      );

      const janjiSaatIniList = [];
      for (const doc of querySnapshot.docs) {
        const janjiTemuData = doc.data();

        // Ambil data dari referensi dokter_ref
        const dokterRef = janjiTemuData.dokter_ref;
        const dokterDoc = await getDoc(dokterRef);
        const dokterData = dokterDoc.data();
        const namaDokter = dokterData.nama;
        const fotoDokter = dokterData.foto;

        // Ambil data dari referensi tindakan_ref
        const tindakanRef = janjiTemuData.tindakan_ref;
        const tindakanDoc = await getDoc(tindakanRef);
        const tindakanData = tindakanDoc.data();
        const namaTindakan = tindakanData.nama_tindakan;

        janjiSaatIniList.push({
          id: doc.id,
          namaDokter: namaDokter,
          fotoDokter: fotoDokter,
          namaTindakan: namaTindakan,
          ...janjiTemuData,
        });
      }

      await new Promise((resolve) => {
        this.setState({ janjiSaatIni: janjiSaatIniList }, resolve);
      });

      console.log({ janjiSaatIni: this.state.janjiSaatIni });
    } catch (error) {
      console.error("Error fetching current appointments:", error);
      throw error;
    }
  };

  getAllJanjiSudahSelesai = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const janjiTemuCollection = collection(db, "janji_temu");
      const querySnapshot = await getDocs(
        query(
          janjiTemuCollection,
          where("tanggal", "==", formattedDate),
          where("status", "==", "selesai")
        )
      );

      const janjiSudahSelesaiList = [];
      for (const doc of querySnapshot.docs) {
        const janjiTemuData = doc.data();

        // Ambil data dari referensi dokter_ref
        const dokterRef = janjiTemuData.dokter_ref;
        const dokterDoc = await getDoc(dokterRef);
        const dokterData = dokterDoc.data();
        const namaDokter = dokterData.nama;
        const fotoDokter = dokterData.foto;

        // Ambil data dari referensi tindakan_ref
        const tindakanRef = janjiTemuData.tindakan_ref;
        const tindakanDoc = await getDoc(tindakanRef);
        const tindakanData = tindakanDoc.data();
        const namaTindakan = tindakanData.nama_tindakan;

        janjiSudahSelesaiList.push({
          id: doc.id,
          namaDokter: namaDokter,
          fotoDokter: fotoDokter,
          namaTindakan: namaTindakan,
          ...janjiTemuData,
        });
      }

      await new Promise((resolve) => {
        this.setState({ janjiSudahSelesai: janjiSudahSelesaiList }, resolve);
      });

      console.log({ janjiSudahSelesai: this.state.janjiSudahSelesai });
    } catch (error) {
      console.error("Error fetching current appointments:", error);
      throw error;
    }
  };

  handleFilter = async (selectedOption) => {
    await new Promise((resolve) => {
      this.setState({ jenisKelamin: selectedOption.value }, resolve);
    });

    const filterLakilaki = this.state.dokterHadir.filter(
      (dokter) => dokter.jenis_kelamin === "Laki-laki"
    );
    await new Promise((resolve) => {
      this.setState({ dokterHadirLakilaki: filterLakilaki }, resolve);
    });

    // Filter dokterHadir laki -laki
    const filterPerempuan = this.state.dokterHadir.filter(
      (dokter) => dokter.jenis_kelamin === "Perempuan"
    );
    await new Promise((resolve) => {
      this.setState({ dokterHadirPerempuan: filterPerempuan }, resolve);
    });
    // console.log({ jenisKelamin: this.state.jenisKelamin });
    // console.log({ dokterHadir: this.state.dokterHadir });
    // console.log({ dokterHadirLakilaki: this.state.dokterHadirLakilaki });
    // console.log({ dokterHadirPerempuan: this.state.dokterHadirPerempuan });
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const options = [
      { value: "Laki-laki", label: "Laki-laki" },
      { value: "Perempuan", label: "Perempuan" },
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
        }}>
        {this.state.loading == true && (
          <>
            <div className="w-[100%] h-[100%] absolute z-[999999] bg-white">
              <Loading />
            </div>
          </>
        )}

        <div className="flex flex-col mx-auto w-[100%] justify-start mt-6">
          <div className="flex gap-5 justify-between px-3 w-full max-w-[367px]">
            <div className="my-auto text-ms font-medium leading-6 text-black capitalize">
              Jadwal Selasa, 1 Mei 2024
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
                viewBox="0 0 24 24">
                <path
                  fill="#2d9cf4"
                  d="M19 2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l3 3l3-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-7 3c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3M7.177 16c.558-1.723 2.496-3 4.823-3s4.266 1.277 4.823 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-center px-7 mt-3 w-full text-xs leading-4 capitalize bg-white text-neutral-950">
            <div className="flex items-center px-2.5 h-10  w-full bg-white rounded-lg border border-solid border-zinc-400 gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="#29a7d1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 9a5 5 0 1 0 10 0A5 5 0 1 0 7 9m5 5v7m-5-3h10"
                />
              </svg>
              <Select
                options={options}
                placeholder={`Pilih jenis Kelamin ${
                  this.state.jenisKelamin ? `- ${this.state.jenisKelamin}` : ""
                }`}
                onChange={this.handleFilter}
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm text-gray-500  rounded shadow-sm transition-all duration-300 focus:outline-none ${
                      isDisabled
                        ? "bg-gray-200"
                        : "bg-white focus:ring focus:ring-blue-500/20"
                    }`,
                  menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                  listItem: ({ isSelected }) =>
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                      isSelected
                        ? `text-white bg-blue-500`
                        : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                    }`,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 py-3.5 mt-1.5 w-full bg-slate-50 leading-[120%] ">
            <div className="w-100 h-auto py-4 flex flex-col justify-between gap-4  bg-blue-500 rounded-lg">
              <div className="w-full text-base leading-5 capitalize text-white font-medium flex justify-start px-3">
                Terapis Yang Tersedia
              </div>

              <Slider {...settings}>
                {/* Card Dokter */}
                {this.state.jenisKelamin === "Laki-laki"
                  ? this.state.dokterHadirLakilaki.map((dokter) => (
                      <div className="flex flex-col justify-center px-4 py-3 text-xs bg-white rounded-xl shadow-sm max-w-[328px]">
                        <div className="flex gap-2.5 text-black">
                          <img
                            loading="lazy"
                            srcSet={dokter.foto}
                            className="shrink-0 aspect-[0.79] w-[90px] h-[70px]"
                          />
                          <div className="flex flex-col flex-1 justify-center">
                            <div className="text-sm font-medium">
                              {dokter.nama}
                            </div>
                            <div className="text-gray-400 mt-1">
                              Umur : {dokter.umur} Tahun
                            </div>
                            <div className="flex gap-0 mt-2.5">
                              <div className="flex flex-1 gap-2 justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 256 256">
                                  <path
                                    fill="#44BED0"
                                    d="M212 96a84 84 0 1 0-96 83.13V196H88a12 12 0 0 0 0 24h28v20a12 12 0 0 0 24 0v-20h28a12 12 0 0 0 0-24h-28v-16.87A84.12 84.12 0 0 0 212 96M68 96a60 60 0 1 1 60 60a60.07 60.07 0 0 1-60-60"
                                  />
                                </svg>
                                <div className="flex-1">
                                  {dokter.jenis_kelamin}
                                </div>
                              </div>
                              <div className="flex flex-1 gap-2 justify-center">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/84f7005b6294ad025be97bcc2a2ce9293a9946b970cc8a1558498deb15a24c07?"
                                  className="shrink-0 aspect-square w-[18px]"
                                />
                                <div className="flex-1">
                                  {dokter.pengalaman}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : this.state.jenisKelamin === "Perempuan"
                  ? this.state.dokterHadirPerempuan.map((dokter) => (
                      <div className="flex flex-col justify-center px-4 py-3 text-xs bg-white rounded-xl shadow-sm max-w-[328px]">
                        <div className="flex gap-2.5 text-black">
                          <img
                            loading="lazy"
                            srcSet={dokter.foto}
                            className="shrink-0 aspect-[0.79] w-[90px] h-[70px]"
                          />
                          <div className="flex flex-col flex-1 justify-center">
                            <div className="text-sm font-medium">
                              {dokter.nama}
                            </div>
                            <div className="text-gray-400 mt-1">
                              Umur : {dokter.umur} Tahun
                            </div>
                            <div className="flex gap-0 mt-2.5">
                              <div className="flex flex-1 gap-2 justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 256 256">
                                  <path
                                    fill="#44BED0"
                                    d="M212 96a84 84 0 1 0-96 83.13V196H88a12 12 0 0 0 0 24h28v20a12 12 0 0 0 24 0v-20h28a12 12 0 0 0 0-24h-28v-16.87A84.12 84.12 0 0 0 212 96M68 96a60 60 0 1 1 60 60a60.07 60.07 0 0 1-60-60"
                                  />
                                </svg>
                                <div className="flex-1">
                                  {dokter.jenis_kelamin}
                                </div>
                              </div>
                              <div className="flex flex-1 gap-2 justify-center">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/84f7005b6294ad025be97bcc2a2ce9293a9946b970cc8a1558498deb15a24c07?"
                                  className="shrink-0 aspect-square w-[18px]"
                                />
                                <div className="flex-1">
                                  {dokter.pengalaman}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : this.state.dokterHadir.map((dokter) => (
                      <div className="flex flex-col justify-center px-4 py-3 text-xs bg-white rounded-xl shadow-sm max-w-[328px]">
                        <div className="flex gap-2.5 text-black">
                          <img
                            loading="lazy"
                            srcSet={dokter.foto}
                            className="shrink-0 aspect-[0.79] w-[90px] h-[70px]"
                          />
                          <div className="flex flex-col flex-1 justify-center">
                            <div className="text-sm font-medium">
                              {dokter.nama}
                            </div>
                            <div className="text-gray-400 mt-1">
                              Umur : {dokter.umur} Tahun
                            </div>
                            <div className="flex gap-0 mt-2.5">
                              <div className="flex flex-1 gap-2 justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 256 256">
                                  <path
                                    fill="#44BED0"
                                    d="M212 96a84 84 0 1 0-96 83.13V196H88a12 12 0 0 0 0 24h28v20a12 12 0 0 0 24 0v-20h28a12 12 0 0 0 0-24h-28v-16.87A84.12 84.12 0 0 0 212 96M68 96a60 60 0 1 1 60 60a60.07 60.07 0 0 1-60-60"
                                  />
                                </svg>
                                <div className="flex-1">
                                  {dokter.jenis_kelamin}
                                </div>
                              </div>
                              <div className="flex flex-1 gap-2 justify-center">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/84f7005b6294ad025be97bcc2a2ce9293a9946b970cc8a1558498deb15a24c07?"
                                  className="shrink-0 aspect-square w-[18px]"
                                />
                                <div className="flex-1">
                                  {dokter.pengalaman}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
              {/* end card dokter */}
            </div>

            {/* Tab Bar */}
            <div className="flex flex-col justify-center pt-3 font-medium max-w-[100%] ">
              <div className="w-full text-base leading-5 capitalize text-neutral-950 font-medium flex justify-start px-3 mb-3">
                Jadwal Berlangsung
              </div>
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.value}
                onSelect={this.handleTab}
                className="custom-tab-bar">
                <Tab eventKey="tab1" title="Saat Ini">
                  {this.state.value == "tab1" && (
                    <>
                      <div className="flex flex-col w-100 h-[19rem] justify-start items-center p-3 gap-3 overflow-y-scroll">
                        {this.state.janjiSaatIni.map((dokter) => (
                          <div className="flex flex-col justify-center p-4 bg-white rounded-xl shadow-md w-full">
                            <div className="flex gap-2.5 justify-center text-xs font-medium">
                              <img
                                loading="lazy"
                                srcSet={dokter.fotoDokter}
                                className="shrink-0 aspect-[0.78] w-[100px] h-[70px]"
                              />
                              <div className="flex flex-col flex-1">
                                <div className="flex gap-2 text-center text-blue-500 whitespace-nowrap">
                                  <div className="justify-center px-2 py-1 rounded-lg border border-blue-500 border-solid px-16">
                                    {dokter.namaTindakan}
                                  </div>
                                </div>
                                <div className="mt-1 text-sm text-black">
                                  {dokter.namaDokter}
                                </div>
                                <div className="mt-1 text-gray-400">
                                  Pasien : {dokter.nama_pasien}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-0 justify-center mt-4 rounded-xl">
                              <div className="flex flex-col flex-1 text-xs text-black">
                                <div className="flex gap-4">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/da0895661014f504f1582d9801e90433fdd0e20311169c3e19d61080d6e7ac6c?"
                                    className="shrink-0 aspect-square w-[18px]"
                                  />
                                  <div>{dokter.tanggal}</div>
                                </div>
                                <div className="flex gap-4 mt-2.5">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f302d9064442e1b1b7d2c592ac690e6da9fc8c29a6a2149936dfdc19d77f6a?"
                                    className="shrink-0 aspect-square w-[18px]"
                                  />
                                  <div>
                                    {dokter.jam_mulai} - {dokter.jam_selesai}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2.5 justify-center self-end px-2 py-1 mt-6 text-xs font-medium text-center text-green-500 whitespace-nowrap rounded-2xl bg-green-500 bg-opacity-10">
                                <div className="shrink-0 my-auto w-2 h-2 bg-green-500 rounded-full" />
                                <div>{dokter.status}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Tab>
                <Tab eventKey="tab2" title="Kosong">
                  {this.state.value == "tab2" && (
                    <>
                      <div className="flex flex-col w-100 h-[19rem] justify-start items-center p-3 gap-3 overflow-y-scroll  ">
                        <div className="flex w-[300px]  h-auto p-4 items-center rounded-xl bg-white shadow-md  justify-between   gap-7 text-blue-500">
                          <div className="w-[30px] h-[30px] flex justify-center items-center p-0">
                            <img
                              loading="lazy"
                              src={TimeImage}
                              className="shrink-0 my-auto aspect-[0.85] fill-zinc-300 w-[100%] h-[100%]"
                            />
                          </div>
                          <div className="w-[80%] h-[auto] flex flex-col justify-between items-start p-0">
                            <div className="text-black font-medium text[14px]">
                              Pukul 12:00 - 13:00
                            </div>
                            <p className="text-[12px] text-blue-500 mt-1">
                              Tidak Ada Pasien
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Tab>
                <Tab eventKey="tab3" title="Selesai">
                  {this.state.value == "tab3" && (
                    <>
                      <div className="flex flex-col w-100 h-[19rem] justify-start items-center p-3 gap-3 overflow-y-scroll">
                        {this.state.janjiSudahSelesai.length === 0 ? (
                          <div className="flex flex-col text-center max-w-[360px]">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c65606ebee1b6385716d2b992b9da1ce85e7d156aec662e98ee133e4645beff?"
                              className="self-center w-full aspect-[1.37] max-w-[250px]"
                            />
                            <div className="mt-4 w-full text-base font-medium text-slate-700">
                              Aktifitas masih kosong
                            </div>
                            <div className="w-full text-xs text-gray-400">
                              Yuk Terapi Sekarang !!!
                            </div>
                          </div>
                        ) : (
                          this.state.janjiSudahSelesai.map((dokter) => (
                            <div className="flex flex-col justify-center p-4 bg-white rounded-xl shadow-md w-full">
                              <div className="flex gap-2.5 justify-center text-xs font-medium">
                                <img
                                  loading="lazy"
                                  srcSet={dokter.fotoDokter}
                                  className="shrink-0 aspect-[0.78] w-[100px] h-[70px]"
                                />
                                <div className="flex flex-col flex-1">
                                  <div className="flex gap-2 text-center text-blue-500 whitespace-nowrap">
                                    <div className="justify-center px-2 py-1 rounded-lg border border-blue-500 border-solid px-16">
                                      {dokter.namaTindakan}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-sm text-black">
                                    {dokter.namaDokter}
                                  </div>
                                  <div className="mt-1 text-gray-400">
                                    Pasien : {dokter.nama_pasien}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-0 justify-center mt-4 rounded-xl">
                                <div className="flex flex-col flex-1 text-xs text-black">
                                  <div className="flex gap-4">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/da0895661014f504f1582d9801e90433fdd0e20311169c3e19d61080d6e7ac6c?"
                                      className="shrink-0 aspect-square w-[18px]"
                                    />
                                    <div>{dokter.tanggal}</div>
                                  </div>
                                  <div className="flex gap-4 mt-2.5">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f302d9064442e1b1b7d2c592ac690e6da9fc8c29a6a2149936dfdc19d77f6a?"
                                      className="shrink-0 aspect-square w-[18px]"
                                    />
                                    <div>
                                      {dokter.jam_mulai} - {dokter.jam_selesai}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2.5 justify-center self-end px-2 py-1 mt-6 text-xs font-medium text-center text-blue-500 whitespace-nowrap rounded-2xl bg-blue-500 bg-opacity-10">
                                  <div className="shrink-0 my-auto w-2 h-2 bg-blue-500 rounded-full" />
                                  <div>{dokter.status}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </Tab>
              </Tabs>
            </div>
            {/* End Tab Bar */}

            {/* card jadwal */}

            {/* end card jadwal */}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
