import React, { useState } from "react";
import swal from "sweetalert2";
import { Tabs, Tab } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/id";

function TableHistory(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const currentData = props.data.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  const formatDurasi = (durasi) => {
    if (durasi < 60) {
      return durasi + " menit";
    } else if (durasi === 60) {
      return "1 jam";
    } else {
      const jam = Math.floor(durasi / 60);
      const menit = durasi % 60;
      if (menit === 0) {
        return jam + " jam";
      } else {
        return jam + " jam " + menit + " menit";
      }
    }
  };

  const formatTanggal = (tanggal) => {
    const hari = dayjs(tanggal).locale("id").format("dddd");
    const bulan = dayjs(tanggal).locale("id").format("MMMM");
    const hasil =
      tanggal.substring(8, 10) + " " + bulan + " " + tanggal.substring(0, 4);
    console.log("tanggal", dayjs(tanggal).locale("id").format("MMMM"));

    return hasil;
  };

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

  return (
    <div className="p-4 bg-white w-[90%] rounded-xl shadow-lg mb-[4rem]">
      <table className="w-full text-left text-base font-normal">
        <thead>
          <tr className="bg-blue-700 text-white rounded-xl font-normal py-6">
            <th className="px-4 py-4 font-medium rounded-l-xl">Tanggal</th>
            <th className="px-4 py-4 font-medium ">Periode Cashflow</th>

            <th className="px-4 py-4 font-medium">Nilai Manual</th>

            <th className="px-4 py-4 font-medium">Nilai Sistem</th>

            <th className="px-4 py-4 w-36 font-medium rounded-r-xl">
              Selisih{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr
              onClick={() => {
                window.location.href = `/detail-riwayat/${item.id}`;
              }}
              className="hover:cursor-pointer"
            >
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
        </tbody>
      </table>

      <div className="mt-10">
        {Array.from(
          { length: Math.ceil(props.data.length / dataPerPage) },
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
      </div>
    </div>
  );
}

export default TableHistory;
