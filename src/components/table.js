import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import { Tabs, Tab } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/id";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

function TableHistory({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const [displayData, setDisplayData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const [lengthData, setLengthData] = useState(data.length);
  const [tanggalAwal, setTanggalAwal] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );
  const [tanggalAkhir, setTanggalAkhir] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   setDisplayData(currentData);
  //   // setData();
  //   // you can use the userData here, or set it to state using setUser
  // }, []);
  const handleChangeDate = (name, date) => {
    const dayjsDate = dayjs(date);
    let tanggalStart = tanggalAwal;
    let tanggalEnd = tanggalAkhir;
    if (!dayjsDate.isValid()) {
      return;
    }
    setIsFilter(true);
    const formattedDate = dayjsDate.format("YYYY-MM-DD");
    if (name === "start") {
      setTanggalAwal(formattedDate);

      if (isSearch) {
        const dataFilter = filterByDateRange(formattedDate, tanggalAkhir);
        const dataSearch = dataFilter.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayData(dataSearch);
        setLengthData(dataFilter.length);

        console.log("tanggal awal", formattedDate);
        console.log("tanggal akhir", tanggalAkhir);
        console.log("data Filter", dataFilter);
      } else {
        const dataFilter = filterByDateRange(formattedDate, tanggalAkhir);

        setDisplayData(dataFilter);
        setLengthData(dataFilter.length);

        console.log("tanggal awal", formattedDate);
        console.log("tanggal akhir", tanggalAkhir);
        console.log("data Filter", dataFilter);
      }
    } else {
      if (isSearch) {
        const dataFilter = filterByDateRange(tanggalAwal, formattedDate);
        const dataSearch = dataFilter.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayData(dataSearch);
        setTanggalAkhir(formattedDate);
        setLengthData(dataFilter.length);
      } else {
        const dataFilter = filterByDateRange(tanggalAwal, formattedDate);

        const dataSlice = dataFilter.slice(indexOfFirstData, indexOfLastData);
        setDisplayData(dataFilter);
        setTanggalAkhir(formattedDate);
        setLengthData(dataFilter.length);
        console.log("tanggal awal", tanggalAwal);
        console.log("tanggal akhir", formattedDate);
        console.log("data Filter", dataFilter);
        console.log("data Display", dataSlice);
      }
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    const text = e.target.value;
    setSearch(text);

    if (isFilter == true) {
      const dataFilter = filterByDateRange(tanggalAwal, tanggalAkhir);

      const results = dataFilter.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );

      console.log(results, "filter");
      setDisplayData(results);
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setDisplayData(results);

      console.log(results, "dataAwal");
      console.log(text, "search");
      console.log(results, "data Hasil");
    }
    setIsSearch(true);
  };
  const currentDataFilter = displayData.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const formatRupiah = (angka) => {
    const nilai = parseFloat(angka);
    return nilai.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatTanggal = (tanggal) => {
    const hari = dayjs(tanggal).locale("id").format("dddd");
    const bulan = dayjs(tanggal).locale("id").format("MMMM");
    const hasil =
      tanggal.substring(8, 10) + " " + bulan + " " + tanggal.substring(0, 4);
    console.log("tanggal", dayjs(tanggal).locale("id").format("MMMM"));

    return hasil;
  };
  function ubahFormatTanggal(tanggal) {
    // Memisahkan string tanggal berdasarkan karakter '/'
    const [tahun, bulan, hari] = tanggal.split("-");

    // Menggabungkan kembali dalam format DD/MM/YYYY
    const formatBaru = `${hari}/${bulan}/${tahun}`;

    return formatBaru;
  }
  const formatTanggalJurnal = (tanggalAwal, tanggalAkhir) => {
    const formatDate = (tanggal) => {
      return dayjs(tanggal).locale("id").format("DD MMMM YYYY");
    };

    const formattedTanggalAwal = formatDate(tanggalAwal);
    const formattedTanggalAkhir = formatDate(tanggalAkhir);

    if (formattedTanggalAwal === formattedTanggalAkhir) {
      return formattedTanggalAwal;
    } else {
      return `${formattedTanggalAwal} - ${formattedTanggalAkhir}`;
    }
  };
  const sortByDateAndTimeDescending = (arrayObjek) => {
    return arrayObjek.sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);

      if (dateB - dateA !== 0) {
        return dateB - dateA;
      }

      // Menggunakan metode sortir jam keluar dari user
      let [jamAInt, menitAInt] = a.lokasiAkhir[0].jamSampai
        .split(":")
        .map(Number);
      let [jamBInt, menitBInt] = b.lokasiAkhir[0].jamSampai
        .split(":")
        .map(Number);

      if (jamAInt !== jamBInt) {
        return jamBInt - jamAInt;
      } else {
        return menitBInt - menitAInt;
      }
    });
  };

  function filterByDateRange(startDate, endDate) {
    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter((item) => {
      const itemDate = new Date(item.tanggal_cek); // Assuming the date property is named 'date'
      return itemDate >= start && itemDate <= end;
    });
  }

  console.log(currentData, "data Current");
  return (
    <div className="p-4 bg-white w-[90%] rounded-xl shadow-lg mb-[4rem]">
      <div className="flex justify-between w-full items-center mb-2">
        <div className="w-[50%] flex justify-start items-center p-2 gap-4">
          <Space direction="vertical" size={12}>
            <DatePicker
              defaultValue={dayjs(
                ubahFormatTanggal(tanggalAwal),
                dateFormatList[0]
              )}
              format={dateFormatList}
              onChange={(date) => {
                handleChangeDate("start", date);
              }}
              className="bg-white text-slate-900 border-2 border-blue-600 w-[100%] p-3 hover:text-slate-800 active:text-slate-900"
            />
          </Space>
          <Space direction="vertical" size={12}>
            <DatePicker
              defaultValue={dayjs(
                ubahFormatTanggal(tanggalAkhir),
                dateFormatList[0]
              )}
              format={dateFormatList}
              onChange={(date) => {
                handleChangeDate("end", date);
              }}
              className="bg-white text-slate-900 border-2 border-blue-600 w-[100%] p-3 hover:text-slate-800 active:text-slate-900"
            />
          </Space>
        </div>

        <div className="w-[50%] flex justify-end items-center p-2">
          <input
            type="text"
            name="search"
            className="bg-white rounded-xl text-slate-900 border-2 border-blue-600 w-[70%] p-3 hover:text-slate-800 active:text-slate-900"
            placeholder="Cari Berdasarkan Nama User"
            // value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="w-full text-left text-base font-normal">
        <thead>
          <tr className="bg-blue-700 text-white rounded-xl font-normal py-6">
            <th className="px-4 py-4 font-medium rounded-l-xl">Nama</th>
            <th className="px-4 py-4 font-medium ">Tanggal</th>
            <th className="px-4 py-4 font-medium ">Periode Cashflow</th>

            <th className="px-4 py-4 font-medium">Nilai Manual</th>

            <th className="px-4 py-4 font-medium">Nilai Sistem</th>

            <th className="px-4 py-4 w-36 font-medium rounded-r-xl">
              Selisih{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {isFilter == true || isSearch ? (
            <>
              {currentDataFilter.map((item) => (
                <tr
                  onClick={() => {
                    window.location.href = `/detail-riwayat/${item.id}`;
                  }}
                  className="hover:cursor-pointer"
                >
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2 capitalize">
                    {item.name}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatTanggal(item.tanggal_cek)}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatTanggalJurnal(
                      item.tanggal_jurnal_awal,
                      item.tanggal_jurnal_akhir
                    )}
                  </td>

                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.nominal_kas_manual)}
                  </td>

                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.nominal_kas_sistem)}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.selisih)}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {currentData.map((item) => (
                <tr
                  onClick={() => {
                    window.location.href = `/detail-riwayat/${item.id}`;
                  }}
                  className="hover:cursor-pointer"
                >
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2 capitalize">
                    {item.name}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatTanggal(item.tanggal_cek)}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatTanggalJurnal(
                      item.tanggal_jurnal_awal,
                      item.tanggal_jurnal_akhir
                    )}
                  </td>

                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.nominal_kas_manual)}
                  </td>

                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.nominal_kas_sistem)}
                  </td>
                  <td className="border-b border-blue-gray-300 h-[4rem] max-h-[6rem] px-4 py-2">
                    {formatRupiah(item.selisih)}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <div className="mt-10">
        {isFilter == true || isSearch ? (
          <>
            {Array.from(
              { length: Math.ceil(displayData.length / dataPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`mx-1 rounded-md border h-12 w-12 py-2 px-2 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          <>
            {Array.from(
              { length: Math.ceil(data.length / dataPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`mx-1 rounded-md border h-12 w-12 py-2 px-2 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default TableHistory;
