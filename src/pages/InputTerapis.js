import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "react-tailwindcss-select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
class InputTerapis extends React.Component {
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
    const options = [
      { value: "Pria", label: "Pria" },
      { value: "Wanita", label: "Wanita" },
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
          <div className="flex gap-5 self-stretch p-4 w-full  text-center text-stone-900">
            <button
              onClick={() => {
                window.location.href = "/terapis/";
              }}
              className="w-auto h-auto "
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b2d02e05b773c962fdd4341539effdff4e46139a4745b83f97d7e9cb10455ed?"
                className="shrink-0 gap-0 w-6 aspect-square"
              />
            </button>
            <div className="flex-auto gap-0 text-xl font-medium">
              Input Terapis
            </div>
          </div>
          <div className="flex flex-col gap-2.5 p-2 w-[100%] h-auto justify-center items-center">
            <div className="flex flex-col gap-2.5 justify-center font-medium text-center text-blue-500 max-w-[328px]">
              <div className=" text-[14px] flex justify-center items-center self-center  text-lg tracking-widest whitespace-nowrap bg-blue-100 h-[120px] rounded-[120px] w-[120px]">
                JD
              </div>
              <div className="gap-0 mt-2.5 w-full  text-[14px] ">Ubah Foto</div>
            </div>
            <div className="flex flex-col gap-1 justify-center w-[100%] h-auto p-4 text-[14px]">
              <div className="gap-0 w-full text-xs text-stone-900">Nama</div>
              <input
                type="text"
                placeholder="Nama"
                required
                onChange={this.handleInputChange}
                name="nama"
                className=" text-[14px] justify-center px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
              />
              <div className="gap-0 mt-4 w-full text-xs text-stone-900 text-[14px]">
                Email
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={this.handleInputChange}
                className=" text-[14px] justify-center px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
              />
              <div className="gap-0 mt-4 w-full text-xs text-stone-900 text-[14px]">
                No. Telepon
              </div>
              <input
                type="text"
                placeholder="No Telepon"
                onChange={this.handleInputChange}
                required
                name="no_hp"
                className=" text-[14px] justify-center px-4 py-4 mt-2.5 text-xs rounded border border-solid border-neutral-400 text-neutral-400"
              />
              <div className="gap-0 mt-4 w-full text-xs text-stone-900 text-[14px]">
                Tanggal Lahir
              </div>
              <div className="w[100%] p-0 mt-4">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className=" text-[14px] justify-center px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
                  adapterLocale="en-gb"
                >
                  <DatePicker
                    name="tanggal"
                    className=" text-[14px] border-solid border-neutral-400 bg-white w-[100%] justify-center px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
                    locale="id"
                    value={this.state.tanggal}
                    onChange={this.handleDateChange}
                    inputFormat="DD/MM/YYYY"
                  />
                </LocalizationProvider>{" "}
              </div>
              <div className="gap-0 mt-4 w-full text-xs text-stone-900 text-[14px]">
                Jenis Kelamin
              </div>
              <div className="select-container relative w-[100%]">
                <div className="flex flex-col justify-center px-0 mt-3 w-[100%] text-[14px] text-xs leading-4 capitalize border border-solid border-neutral-400 bg-white text-neutral-950 rounded-lg">
                  <div className="flex items-center px-2.5 h-12 text-lg  w-[100%] bg-white border-solid border-neutral-400 rounded-lg  gap-2 ">
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
                      options={options}
                      name="kelamin"
                      placeholder="Pilih jenis Kelamin"
                      classNames={{
                        menuButton: ({ isDisabled }) =>
                          `text-[15px] flex text-sm text-slate-400 w-[100%] bg-white rounded shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
                              ? "bg-white "
                              : "bg-white focus:ring focus:ring-blue-500/20"
                          }`,
                        menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                        listItem: ({ isSelected }) =>
                          `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                              ? `text-gray-700 bg-white`
                              : `text-gray-700 hover:bg-blue-500 hover:text-white`
                          }`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="gap-0 mt-5 w-full text-xs text-stone-900 text-[14px]">
                Umur
              </div>
              <input
                type="text"
                placeholder="Umur"
                name="alamat"
                readOnly
                className=" text-[14px] justify-center px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
              />
              <div className="gap-0 mt-5 w-full text-xs text-stone-900 text-[14px]">
                Alamat Lengkap
              </div>
              <input
                type="textarea"
                placeholder="Alamat"
                onChange={this.handleInputChange}
                required
                name="alamat"
                className="justify-center text-[14px] px-4 py-4 mt-2.5 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 text-neutral-400"
              />
              <div className="gap-0 mt-1 w-full text-xs italic text-right text-zinc-400">
                Maks 100 Karaketer
              </div>
            </div>
            <button className="justify-center p-2 w-full text-base text-center text-white bg-blue-500 rounded-lg max-w-[320px]">
              Simpan
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputTerapis;
