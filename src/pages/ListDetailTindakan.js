import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
class ListDetailTindakan extends React.Component {
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
        <div className="flex flex-col mt-3 gap-0 h-[100%] items-center pb-4 font-medium bg-white w-[100%]">
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

            <div className="flex-auto">Detail Tindakan</div>
          </div>

          <div className="flex flex-col w-[100%]  h-[100%] justify-start items-center mb-4 overflow-y-scroll relative">
            <div className="flex flex-col bg-white w-[100%]">
              <div className="flex overflow-hidden relative flex-col pb-20 w-full aspect-[1.23]">
                <img
                  loading="lazy"
                  srcSet="https://asset.kompas.com/crops/V_-VW5U-BhXThXirUT1iCWPOS6c=/0x0:1000x667/1200x800/data/photo/2020/03/03/5e5e1dd32b931.jpg"
                  className="object-cover absolute inset-0 size-full"
                />
              </div>
              <div className="absolute top-[50%] w-[100%] h-auto flex flex-col justify-start  items-center">
                <div className="flex flex-col justify-center bg-white px-4 pt-2 mt-0 w-full rounded-2xl z-[9999] ">
                  <div className="flex gap-4 mt-4">
                    <div className="flex flex-col flex-1 justify-center">
                      <div className="text-xs text-zinc-400">
                        Layanan Tindakan
                      </div>
                      <div className="mt-2 text-sm font-semibold text-black">
                        Terapi Ear Candle.
                      </div>
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a119df0c500a9dc38ac1a67312096aa5acb0863e7d5efd5f5e3944385c59fac7?"
                      className="shrink-0 self-start w-6 aspect-square"
                    />
                  </div>
                </div>
                <div className="flex flex-col px-4 mt-4 w-full text-xs text-justify text-black bg-white rounded-2xl">
                  <div>
                    Terapi ear candle diartikan sebagai tindakan yang
                    menggunakan lilin berbentuk tabung yang sudah direndam di
                    dalam paraffiffiffin, beeswax atau campuran keduanya. Lilin
                    ini biasanya memiliki panjang sekitar 10 inch (± 25 cm),
                    berbentuk hollow.
                  </div>
                  <div className="mt-4">
                    Cara penggunaan ear candle, biasanya klien/pasien akan
                    diminta untuk tidur menyamping. Kemudian lilin berbentuk
                    tabung tersebut akan dimasukkan ke dalam liang telinga.
                    Untuk menghindari adanya tetesan lilin ke rambut, wajah,
                    leher, atau daun telinga, maka area sekitar telinga akan
                    ditutup kertas, plastik atau foil berbentuk kotak atau
                    bulat, yang area tengahnya sudah dilubangi untuk memasukkan
                    lilin. Kemudian lilin tersebut akan dinyalakan selama
                    sepuluh hingga dua puluh menit.
                  </div>
                </div>
                <div className="flex flex-col px-4 mt-4 w-full text-xs text-justify text-black bg-white rounded-2xl">
                  <div className="mt-2 text-sm font-semibold text-black">
                    Lama dan Biaya
                  </div>
                  <div className="mt-4 flex flex-col justify-start gap-4">
                    <p>1. Lama : 1 Jam, Biaya : Rp. 100.000,00</p>
                    <p>2. Lama : 2 Jam, Biaya : Rp. 150.000,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.href = "/tindakan/detail-tindakan/tambah-data";
            }}
            className="justify-center p-3 w-full text-[0.9rem] text-center text-white bg-blue-500 rounded-lg max-w-[320px]"
          >
            Tambah Waktu Tindakan
          </button>
        </div>
      </div>
    );
  }
}

export default ListDetailTindakan;
