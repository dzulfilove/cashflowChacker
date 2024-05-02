import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../styles/homepage.css";
import TimeImage from "../assets/clock.png";

class JanjiTemu extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      nama: "",
      alamat: "",
      tanggalLahir: "",
      photo: null,
      email: "",
      no_hp: "",
      value: "hadir",
      tanggal: dayjs().locale("id"),
      value: "tab2",
    };
  }
  handleTab = (newValue) => {
    this.setState({ value: newValue });
  };
  componentDidMount() {}
  formatTanggal = () => {
    const today = dayjs().locale("id"); // Gunakan dayjs() tanpa argumen untuk mendapatkan tanggal hari ini
    const formattedDate = today.format("YYYY-MM-DD");
    const formattedDate2 = today.format("YYYY/MM/DD");
    const jam = today.format("HH:mm");
    const day = today.format("YYYY-MM-DDTHH:mm:ss");
    this.setState({
      tanggal: today,
      tanggalFilter: formattedDate,
      tanggalData: formattedDate2,
      jam: jam,
    });
    console.log(today.format("YYYY-MM-DDTHH:mm"));
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state with the new value
    this.setState({ [name]: value }, () => {
      // Callback to ensure state is updated before calling getRegistrasi
    });
  };

  handleDateChange = (name, selectedDate) => {
    // Convert selectedDate to Dayjs object if it's not already
    const dayjsDate = dayjs(selectedDate);

    // Ensure dayjsDate is a valid Dayjs object
    if (!dayjsDate.isValid()) {
      return; // Handle invalid date selection appropriately
    }

    // Subtract one day from the selected date

    // Format the modified date in the desired ISO 8601 format

    if (name === "tanggalAwal") {
      const formattedDate = dayjsDate.format("YYYY-MM-DD");

      this.setState(
        {
          tanggalFilterMulai: formattedDate,
          tanggalAwal: selectedDate,
        },
        () => {
          console.log("awal", this.state.tanggalFilterMulai);
          console.log("akhir", this.state.tanggalFilterAkhir);

          this.getRegistrasi(this.state.tanggalFilterAkhir);
        }
      );
    } else {
      const formattedDate = dayjsDate.format("YYYY-MM-DD");

      this.setState(
        {
          tanggal: selectedDate,
          tanggalFilterAkhir: formattedDate,
        },
        () => {
          console.log("awal", this.state.tanggalFilterMulai);
          console.log("akhir", this.state.tanggalFilterAkhir);

          this.getRegistrasi(formattedDate);
        }
      );
    }

    // Update the state with the formatted date
  };

  handleAdd = () => {
    window.location.href = "/tindakan/tambah-data/";
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
        }}
      >
        <div className="flex flex-col gap-0 h-[100%] items-center pb-4 font-medium bg-slate-50 w-[100%]">
          <div className="flex gap-5 self-stretch p-4 w-full  text-center text-stone-900">
            <div className="flex-auto gap-0 text-xl font-medium">
              Data Janji Temu Pasien
            </div>
          </div>

          <div className="flex flex-col w-[100%] h-[100%] justify-start items-center mb-4 overflow-y-scroll p-3 ">
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.value}
              onSelect={this.handleTab}
              className="custom-tab-bar"
            >
              <Tab eventKey="tab1" title="Saat Ini">
                {this.state.value == "tab1" && (
                  <>
                    <div className="flex flex-col w-100 h-[100%] justify-start items-center p-3 gap-3 overflow-y-scroll">
                      <div className="flex flex-col justify-center p-4 bg-white rounded-xl shadow-md w-full">
                        <div className="flex gap-2.5 justify-center text-xs font-medium">
                          <img
                            loading="lazy"
                            srcSet="https://res.cloudinary.com/dk0z4ums3/image/upload/v1688972403/attached_image/pilihan-karir-non-klinis-untuk-dokter-di-indonesia-0-alomedika.jpg"
                            className="shrink-0 aspect-[0.78] w-[100px] h-[70px]"
                          />
                          <div className="flex flex-col flex-1">
                            <div className="flex gap-2 text-center text-blue-500 whitespace-nowrap">
                              <div className="justify-center px-2 py-1 rounded-lg border border-blue-500 border-solid px-16">
                                Bekam
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-black">
                              dr. Kureha Yasmin
                            </div>
                            <div className="mt-1 text-gray-400">
                              Pasien : Budi
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
                              <div>Senin, 20 Mei 2022</div>
                            </div>
                            <div className="flex gap-4 mt-2.5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/51f302d9064442e1b1b7d2c592ac690e6da9fc8c29a6a2149936dfdc19d77f6a?"
                                className="shrink-0 aspect-square w-[18px]"
                              />
                              <div>11:00 - 12:00 AM</div>
                            </div>
                          </div>
                          <div className="flex gap-2.5 justify-center self-end px-2 py-1 mt-6 text-xs font-medium text-center text-green-500 whitespace-nowrap rounded-2xl bg-green-500 bg-opacity-10">
                            <div className="shrink-0 my-auto w-2 h-2 bg-green-500 rounded-full" />
                            <div>Berlangsung</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center p-4 text-xs bg-white rounded-xl shadow-sm w-full">
                        <div className="flex gap-2.5 justify-center font-medium">
                          <img
                            loading="lazy"
                            srcSet="https://res.cloudinary.com/dk0z4ums3/image/upload/v1688972403/attached_image/pilihan-karir-non-klinis-untuk-dokter-di-indonesia-0-alomedika.jpg"
                            className="shrink-0 aspect-[0.78] w-[100px] h-[70px]"
                          />
                          <div className="flex flex-col ">
                            <div className="flex gap-2 text-center text-blue-500 whitespace-nowrap items-center">
                              <div className="flex justify-center px-2 py-1 items-center rounded-lg border border-blue-500 border-solid">
                                Konsultasi
                              </div>
                              <div className="flex gap-2.5 justify-center  px-2 py-1  font-medium text-center text-green-500  rounded-2xl bg-green-500 bg-opacity-10">
                                <div className="shrink-0 my-auto w-2 h-2 bg-green-500 rounded-full " />
                                <div className="text-xs">Berlangsung</div>
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-black">
                              dr. Kureha Yasmin
                            </div>
                            <div className="mt-1 text-gray-400">
                              Pasien : Budi
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-0 px-4 py-5 mt-4 text-black rounded-xl bg-neutral-100">
                          <div className="flex flex-1 gap-2.5 justify-center px-0.5 ">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac2f7dcaa15ab779b1f8b0eff090ee4bd800359a55afa64d7e4fe3b9cf8a075?"
                              className="shrink-0 aspect-square w-[18px]"
                            />
                            <div>Senin, 20 Mei 2022</div>
                          </div>
                          <div className="flex flex-1 gap-2.5 justify-center px-0 ">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/94b600ed46a0ee1d36ddc9fe591fcd49749ec91546f5fbb0694edbfe8b63378c?"
                              className="shrink-0 aspect-square w-[18px]"
                            />
                            <div>11:00 - 12:00</div>
                          </div>
                        </div>
                      </div>
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
                          <p className="text-sm text-blue-500">
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
                    </div>
                  </>
                )}
              </Tab>
            </Tabs>
          </div>
          <button
            onClick={() => {
              window.location.href = "/janji-temu/tambah-data";
            }}
            className="justify-center p-2 w-full text-sm text-center text-white bg-blue-500 rounded-lg max-w-[320px]"
          >
            Tambah
          </button>
        </div>
      </div>
    );
  }
}

export default JanjiTemu;
