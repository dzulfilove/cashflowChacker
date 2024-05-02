import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
class ListTindakan extends React.Component {
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
              Data Tindakan
            </div>
          </div>

          <div className="flex flex-col w-[100%] h-[100%] mt-3 justify-start items-center mb-4 overflow-y-scroll rounded-md ">
            <div
              className="flex gap-4 justify-center p-4 bg-white w-[90%] rounded-lg"
              onClick={() => {
                window.location.href = "/tindakan/detail-tindakan";
              }}
            >
              <div className="flex justify-center items-center p-3.5 bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/912112b743bb3145e7319e41dc115e7a4e66cc6ccecbb1b521e245ffee9048ec?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center p-4 bg-white w-[90%]">
              <div className="flex justify-center items-center p-3.5 my-auto bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff83b9651629f8d4c6db25d8c6acb7632a5b747bd603bbf8d6c8713ae243d383?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center p-4 bg-white w-[90%]">
              <div className="flex justify-center items-center p-3.5 bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/912112b743bb3145e7319e41dc115e7a4e66cc6ccecbb1b521e245ffee9048ec?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center p-4 bg-white w-[90%]">
              <div className="flex justify-center items-center p-3.5 my-auto bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff83b9651629f8d4c6db25d8c6acb7632a5b747bd603bbf8d6c8713ae243d383?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center p-4 bg-white w-[90%]">
              <div className="flex justify-center items-center p-3.5 bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/912112b743bb3145e7319e41dc115e7a4e66cc6ccecbb1b521e245ffee9048ec?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center p-4 bg-white w-[90%]">
              <div className="flex justify-center items-center p-3.5 my-auto bg-blue-100 rounded-lg h-[50px] w-[50px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff83b9651629f8d4c6db25d8c6acb7632a5b747bd603bbf8d6c8713ae243d383?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap">
                <div className="text-xs text-gray-400">Layanan</div>
                <div className="mt-1 text-base font-medium leading-6 text-black">
                  Bekam Medik
                </div>
                <div className="mt-1 text-xs">Rp.50.000 - Rp.100.000</div>
              </div>
            </div>
          </div>
          <button
            onClick={this.handleAdd}
            className="justify-center p-2 w-full text-base text-center text-white bg-blue-500 rounded-lg max-w-[320px]"
          >
            Tambah
          </button>
        </div>
      </div>
    );
  }
}

export default ListTindakan;
