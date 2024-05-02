import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { db, dbImage } from "../config/Firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

class Terapis extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      dokters: [],
      id: null,
      nama: null,
      jenis_kelamin: null,
      pengalaman: null,
      umur: null,
      foto: null,
      kontak: null,
      value: "hadir",
    };
  }

  componentDidMount = () => {
    this.getAllDokter();
  };

  getAllDokter = async () => {
    try {
      const dokterCollection = collection(db, "dokters");
      const querySnapshot = await getDocs(dokterCollection);

      const dokterList = [];
      querySnapshot.forEach((doc) => {
        dokterList.push({ id: doc.id, ...doc.data() });
      });

      await new Promise((resolve) => {
        this.setState({ dokters: dokterList }, resolve);
      });
      console.log(this.state.dokters);
    } catch (error) {
      console.error("Error fetching dokter data:", error);
      throw error;
    }
  };

  handleTab = (newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}>
        <div className="flex flex-col gap-0 h-[100%] items-center pb-4 font-medium bg-slate-50 w-[100%]">
          <div className="flex gap-5 self-stretch p-4 w-full  text-center text-stone-900">
            <div className="flex-auto gap-0 text-xl font-medium">
              Data Terapis
            </div>
          </div>
          <div className="w-[100%] h-auto pl-3 pr-3">
            <div className="flex gap-4 bg-white  px-4 py-3 w-full text-xs tracking-normal leading-4  rounded-lg shadow-sm  mt-3 text-neutral-400">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2779943858cc6dd76b2feebe0c17cecc9a5287dfa76d9a94d344c614a742faa?"
                className="shrink-0 gap-0 w-6 aspect-square"
              />
              <input
                type="text"
                required
                name="search"
                placeholder="Cari layanan, klinik, dan dokter"
                className="flex-1 gap-0 my-auto h-8 border-none"
                onChange={(e) => {
                  e.target.value = "";
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-[100%] h-[100%] justify-start items-center mb-4 overflow-y-scroll p-3 ">
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.value}
              onSelect={this.handleTab}
              className="custom-tab-bar">
              <Tab eventKey="semua" title="Semua">
                {this.state.value == "semua" && (
                  <>
                    <div className="flex flex-col w-100 h-[25rem] justify-start items-center p-3 gap-3 overflow-y-scroll">
                      {/* Looping semua data terapis */}
                      {this.state.dokters.map((dokter) => (
                        <div className="flex flex-col justify-center self-center p-4 mt-1 w-full bg-white rounded-xl shadow-sm">
                          <div className="flex gap-2.5 justify-center">
                            <img
                              loading="lazy"
                              src={dokter.foto}
                              className="shrink-0 my-auto aspect-[0.79] w-[110px] h-[90px] bg-cover object-cover"
                            />
                            <div className="flex flex-col my-auto items-start ">
                              <div className="text-sm font-medium text-black flex w-100 justify-start items-center gap-1">
                                {dokter.nama}
                              </div>

                              <div className="flex flex-col flex-1 text-black text-xs mt-3 gap-2">
                                <div className="flex whitespace-nowrap justify-start gap-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 20 20">
                                    <path
                                      fill="#29a7d1"
                                      d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"
                                    />
                                  </svg>
                                  <div className="text-gray-600">
                                    {dokter.jenis_kelamin}
                                  </div>
                                </div>
                                <div className="flex whitespace-nowrap justify-start gap-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24">
                                    <path
                                      fill="#29a7d1"
                                      d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.19 1.19 0 0 0 9 14h6a1.19 1.19 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                                    />
                                  </svg>
                                  <div className="text-grey-600">
                                    {" "}
                                    {dokter.pengalaman} Pengalaman
                                  </div>
                                </div>
                                <div className="flex whitespace-nowrap justify-start gap-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 16">
                                    <g fill="#29a7d1">
                                      <path d="M5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                                    </g>
                                  </svg>
                                  <div className="text-grey-600">
                                    {" "}
                                    {dokter.umur} tahun
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-4 text-sm text-center whitespace-nowrap">
                            <button className="flex-1 w-12 p-2 justify-center text-white bg-red-500 rounded-lg border border-solid">
                              Absen
                            </button>
                            <button className="flex-1 w-12 p-2 justify-center text-white bg-blue-500 rounded-lg items-center">
                              Hadir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Tab>
              <Tab eventKey="hadir" title="Hadir">
                {this.state.value == "hadir" && (
                  <>
                    {/* Disini looping data terapis */}
                    <div className="flex flex-col w-100 h-[25rem] justify-start items-center p-3 gap-3 overflow-y-scroll">
                      <div className="flex flex-col justify-center self-center p-4 mt-1 w-full bg-white rounded-xl shadow-sm">
                        <div className="flex gap-2.5 justify-center">
                          <img
                            loading="lazy"
                            srcSet="https://res.cloudinary.com/dk0z4ums3/image/upload/v1688972403/attached_image/pilihan-karir-non-klinis-untuk-dokter-di-indonesia-0-alomedika.jpg"
                            className="shrink-0 my-auto aspect-[0.79] w-[110px] h-[90px] bg-cover object-cover"
                          />
                          <div className="flex flex-col my-auto items-start ">
                            <div className="text-sm font-medium text-black flex w-100 justify-start items-center gap-1">
                              dr. Kureha Yasmin
                            </div>

                            <div className="flex flex-col flex-1 text-black text-xs mt-3 gap-2">
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20">
                                  <path
                                    fill="#29a7d1"
                                    d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"
                                  />
                                </svg>
                                <div className="text-gray-600">Wanita</div>
                              </div>
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24">
                                  <path
                                    fill="#29a7d1"
                                    d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.19 1.19 0 0 0 9 14h6a1.19 1.19 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                                  />
                                </svg>
                                <div className="text-grey-600">
                                  {" "}
                                  1 Tahun Pengalaman
                                </div>
                              </div>
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 16 16">
                                  <g fill="#29a7d1">
                                    <path d="M5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                                  </g>
                                </svg>
                                <div className="text-grey-600"> 25 tahun</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 text-sm text-center whitespace-nowrap">
                          <div className="flex-1 w-12 p-2 justify-center text-green-500 bg-green-100 border border-solid border-green-500 rounded-lg items-center">
                            Hadir
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Tab>
              <Tab eventKey="absen" title="Absen">
                {this.state.value == "absen" && (
                  <>
                    <div className="flex flex-col w-100 h-[25rem] justify-start items-center p-3 gap-3 overflow-y-scroll">
                      <div className="flex flex-col justify-center self-center p-4 mt-1 w-full bg-white rounded-xl shadow-sm">
                        <div className="flex gap-2.5 justify-center">
                          <img
                            loading="lazy"
                            srcSet="https://res.cloudinary.com/dk0z4ums3/image/upload/v1688972403/attached_image/pilihan-karir-non-klinis-untuk-dokter-di-indonesia-0-alomedika.jpg"
                            className="shrink-0 my-auto aspect-[0.79] w-[110px] h-[90px] bg-cover object-cover"
                          />
                          <div className="flex flex-col my-auto items-start ">
                            <div className="text-sm font-medium text-black flex w-100 justify-start items-center gap-1">
                              dr. Kureha Yasmin
                            </div>

                            <div className="flex flex-col flex-1 text-black text-xs mt-3 gap-2">
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20">
                                  <path
                                    fill="#29a7d1"
                                    d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"
                                  />
                                </svg>
                                <div className="text-gray-600">Wanita</div>
                              </div>
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24">
                                  <path
                                    fill="#29a7d1"
                                    d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.19 1.19 0 0 0 9 14h6a1.19 1.19 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                                  />
                                </svg>
                                <div className="text-grey-600">
                                  {" "}
                                  1 Tahun Pengalaman
                                </div>
                              </div>
                              <div className="flex whitespace-nowrap justify-start gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 16 16">
                                  <g fill="#29a7d1">
                                    <path d="M5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                                  </g>
                                </svg>
                                <div className="text-grey-600"> 25 tahun</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 text-sm text-center whitespace-nowrap">
                          <div className="flex-1 w-12 p-2 justify-center text-red-500 bg-red-100 border border-solid border-red-500 rounded-lg items-center">
                            Absen
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Tab>
            </Tabs>
            {/* <Loading /> */}
          </div>
          <button
            onClick={() => {
              window.location.href = "/terapis/tambah-data/";
            }}
            className="justify-center p-2 w-full text-sm text-center text-white bg-blue-500 rounded-lg max-w-[320px]">
            Tambah
          </button>
        </div>
      </div>
    );
  }
}

export default Terapis;
