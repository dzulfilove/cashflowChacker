import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Select from "react-tailwindcss-select";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { Autocomplete, TextField } from "@mui/material";
import RcSelect from "rc-select";
import "../styles/homepage.css";
class InputJanjiTemu extends React.Component {
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
    };
  }
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

  handleTab = (newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const optionsTerapis = [
      { value: "Budi", label: "Budi" },
      { value: "Lia", label: "Lia" },
    ];
    const optionsTindakan = [
      { value: "Pijat", label: "Pijat" },
      { value: "Bekam", label: "Bekam" },
    ];

    const optionsLama = [
      { value: "1 Jam", label: "1 Jam" },
      { value: "30 Menit", label: "30 Menit" },
    ];

    const optionsStatus = [
      { value: "Berlangsung", label: "berlangsung" },
      { value: "Selesai", label: "Selesai" },
    ];
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
        <div className="flex flex-col gap-0 items-start h-[100%] overflow-y-scroll pb-4 font-medium bg-slate-50 w-[100%]">
          <div className="flex gap-5 self-stretch p-4 w-full text-xl font-medium text-center bg-white text-stone-900">
            <button
              onClick={() => {
                window.location.href = "/janji-temu/";
              }}
              className="w-11 h-auto "
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b2d02e05b773c962fdd4341539effdff4e46139a4745b83f97d7e9cb10455ed?"
                className="shrink-0 gap-0 w-6 aspect-square"
              />
            </button>

            <div className="flex-auto">Input Janji Temu</div>
          </div>
          <div className="flex flex-col p-4 w-[100%] h-auto justify-between items-center text-[14px] ">
            <div className="mt-9 text-xs text-stone-900 w-[100%] text-[14px]">
              Nama Pasien
            </div>

            <input
              type="text"
              placeholder="Nama"
              required
              onChange={this.handleInputChange}
              name="nama"
              className=" date"
            />
            <div className="mt-6 text-xs text-stone-900 w-[100%] mb-2.5 text-[14px]">
              Pukul
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                defaultValue={this.state.tanggal}
                className=" date"
              />
            </LocalizationProvider>
            <div className="select-container relative w-[100%]">
              <div className="flex flex-col justify-center px-0 mt-3 w-[100%] text-[14px] text-xs leading-4 capitalize bg-blue-100 text-neutral-950 rounded-lg">
                <div className="flex items-center px-2.5 h-12 text-lg  w-[100%] bg-blue-100 rounded-lg  gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#29a7d1"
                      d="M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66M12 12c2.21 0 4-1.79 4-4V4.5c0-.83-.67-1.5-1.5-1.5c-.52 0-.98.27-1.25.67c-.27-.4-.73-.67-1.25-.67s-.98.27-1.25.67c-.27-.4-.73-.67-1.25-.67C8.67 3 8 3.67 8 4.5V8c0 2.21 1.79 4 4 4"
                    />
                  </svg>
                  <Select
                    options={optionsTerapis}
                    name="terapis"
                    placeholder="Pilih Terapis"
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `text-[15px] flex text-sm text-blue-500 w-[100%] bg-blue-100 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                          isDisabled
                            ? "bg-blue-100 "
                            : "bg-blue-100 focus:ring focus:ring-blue-500/20"
                        }`,
                      menu: "absolute z-10 w-full bg-slate-50 shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                      listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                          isSelected
                            ? `text-blue-500 bg-slate-50`
                            : `text-blue-500 hover:bg-blue-100 hover:text-blue-500`
                        }`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="select-container relative w-[100%]">
              <div className="flex flex-col justify-center px-0 mt-3 w-[100%] text-[14px] text-xs leading-4 capitalize bg-blue-100 text-neutral-950 rounded-lg">
                <div className="flex items-center px-2.5 h-12 text-lg  w-[100%] bg-blue-100 rounded-lg  gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#29a7d1"
                      d="M159.88 175.82h64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h-64v-64a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v64h-64a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16m408.19 160.31a39.91 39.91 0 0 0-55.93-8.47l-119.67 88.18H271.86a16 16 0 0 1 0-32h78.24c16 0 30.75-10.87 33.37-26.61a32.06 32.06 0 0 0-31.62-37.38h-160a117.7 117.7 0 0 0-74.12 26.25l-46.5 37.74H15.87a16.11 16.11 0 0 0-16 16v96a16.11 16.11 0 0 0 16 16h347a104.8 104.8 0 0 0 61.7-20.27L559.6 392a40 40 0 0 0 8.47-55.87"
                    />
                  </svg>
                  <Select
                    options={optionsTindakan}
                    name="tindakan"
                    placeholder="Pilih Tindakan"
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `text-[15px] flex text-sm text-blue-500 w-[100%] bg-blue-100 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                          isDisabled
                            ? "bg-blue-100 "
                            : "bg-blue-100 focus:ring focus:ring-blue-500/20"
                        }`,
                      menu: "absolute z-10 w-full bg-slate-50 shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                      listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                          isSelected
                            ? `text-blue-500 bg-slate-50`
                            : `text-blue-500 hover:bg-blue-100 hover:text-blue-500`
                        }`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="select-container relative w-[100%]">
              <div className="flex flex-col justify-center px-0 mt-3 w-[100%] text-[14px] text-xs leading-4 capitalize bg-blue-100 text-neutral-950 rounded-lg">
                <div className="flex items-center px-2.5 h-12 text-lg  w-[100%] bg-blue-100 rounded-lg  gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#29a7d1"
                      d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-7.59V4h2v5.59l3.95 3.95l-1.41 1.41z"
                    />
                  </svg>
                  <Select
                    options={optionsLama}
                    name="lama"
                    placeholder="Pilih Lama Tindakan"
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `text-[15px] flex text-sm text-blue-500 w-[100%] bg-blue-100 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                          isDisabled
                            ? "bg-blue-100 "
                            : "bg-blue-100 focus:ring focus:ring-blue-500/20"
                        }`,
                      menu: "absolute z-10 w-full bg-slate-50 shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                      listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                          isSelected
                            ? `text-blue-500 bg-slate-50`
                            : `text-blue-500 hover:bg-blue-100 hover:text-blue-500`
                        }`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="select-container relative w-[100%]">
              <div className="flex flex-col justify-center px-0 mt-3 w-[100%] text-[14px] text-xs leading-4 capitalize bg-blue-100 text-neutral-950 rounded-lg">
                <div className="flex items-center px-2.5 h-12 text-lg  w-[100%] bg-blue-100 rounded-lg  gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#44BED0"
                      d="M16.5 11L13 7.5l1.4-1.4l2.1 2.1L20.7 4l1.4 1.4zM11 7H2v2h9zm10 6.4L19.6 12L17 14.6L14.4 12L13 13.4l2.6 2.6l-2.6 2.6l1.4 1.4l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6zM11 15H2v2h9z"
                    />
                  </svg>
                  <Select
                    options={optionsStatus}
                    name="lama"
                    placeholder="Pilih Status"
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `text-[15px] flex text-sm text-blue-500 w-[100%] bg-blue-100 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                          isDisabled
                            ? "bg-blue-100 "
                            : "bg-blue-100 focus:ring focus:ring-blue-500/20"
                        }`,
                      menu: "absolute z-10 w-full bg-slate-50 shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                      listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                          isSelected
                            ? `text-blue-500 bg-slate-50`
                            : `text-blue-500 hover:bg-blue-100 hover:text-blue-500`
                        }`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-stone-900 w-[100%] text-[14px]">
              Waktu Selesai
            </div>

            <div className="justify-center text-[14px] p-6 w-[100%] mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400">
              {this.state.waktuSelesai}
            </div>
            <div className="mt-4 text-xs text-stone-900 w-[100%] text-[14px]">
              Biaya
            </div>

            <div className="justify-center text-[14px] p-6 w-[100%] mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400">
              {this.state.biaya}
            </div>
            <div className="flex  justify-center self-stretch h-12 mt-14 w-[100%] text-base font-medium text-center text-white whitespace-nowrap bg-white">
              <button className=" flex justify-center p-6 items-center w-full h-9 text-base text-center text-white bg-blue-500 rounded-lg max-w-[320px]">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputJanjiTemu;
