import React, { useState, useEffect, useRef } from "react";

import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { addDoc, Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { urlAPI } from "../config/database";
import axios from "axios";

const DataPenjualan = () => {
  const idPerusahaan = "42c0276C84e8chpCogKK";
  const hasRun = useRef(false);

  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [datesData, setDates] = useState({
    startOfMonth: null,
    endOfMonth: null,
    today: null,
  });
  const [bulan, setBulan] = useState(dayjs().format("MMMM"));
  const [tahun, setTahun] = useState(dayjs().locale("id").format("YYYY"));
  const [totalKaryawan, setTotalKaryawan] = useState(0);
  const [totalAkanBerakhir, setTotalAkanBerakhir] = useState(0);
  const [tanggal, setTanggal] = useState(null);
  const [isKirim, setIsKirim] = useState(false);

  // useEffect(() => {
  //   if (!hasRun.current) {
  //     sendHandle();

  //     hasRun.current = true;
  //   }
  // }, []);

  useEffect(() => {
    if (!hasRun.current) {
      const fetchData = async () => {
        await getStartAndEndOfMonth();
      };

      fetchData();

      hasRun.current = true;
    }
  }, []);

  const getStartAndEndOfMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const datesTime = {
      startOfMonth: Timestamp.fromDate(startOfMonth),
      endOfMonth: Timestamp.fromDate(endOfMonth),
      today: Timestamp.fromDate(today),
    };

    getDataPendapatan(datesTime);
  };

  const getDataPendapatan = async (dates) => {
    const url = urlAPI + "/pendapatan/cek";
    try {
      const response = await axios.get(url);

      const data = response.data;
      const dataGigi = data.pendapatanGigi;
      const dataLab = data.pendapatanLab;
      const dataKlinik = data.pendapatanKlinik;

      if (dataGigi !== undefined) {
        getAllCabang(dataGigi, "gigi", data.namaKlinik, dates);
      }
      if (dataLab !== undefined) {
        getAllCabang(dataLab, "lab", data.namaKlinik, dates);
      }
      if (dataKlinik !== undefined) {
        getAllCabang(dataKlinik, "klinik", data.namaKlinik, dates);
      }
      console.log(data, "dataPendapatan");
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCabang = async (dataAkun, name, namaKlinik, dates) => {
    const nama = namaKlinik;
    const namePendapatan = name;
    const refPerusahaan = doc(db, "Perusahaan", idPerusahaan);
    try {
      const q = query(
        collection(db, "CabangPerusahaan"),
        where("refPerusahaan", "==", refPerusahaan)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Tidak ada dokumen yang ditemukan.");
        return;
      }
      const cabangList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const dataOption = cabangList.map((item) => ({
        id: item.id,
        nama: item.nama,
      }));
      const cabangKlinik = dataOption.filter((item) =>
        item.nama.toLowerCase().includes(nama.toLowerCase())
      );

      const cabangJasa = cabangKlinik.filter((item) =>
        item.nama.toLowerCase().includes(namePendapatan.toLowerCase())
      );
      const sortData = cabangJasa.sort((a, b) => a.nama.length - b.nama.length);

      let cabangDitemukan = {};
      if (cabangJasa.length == 0 || cabangKlinik.length == 0) {
        const cabang = {
          nama: `Klinik Kosasih ${nama} ( ${namePendapatan} )`,
          refPerusahaan: refPerusahaan,
        };
        const divisionRef = await addDoc(
          collection(db, "CabangPerusahaan"),
          cabang
        );
        // Mengambil ID dari dokumen yang baru saja ditambahkan
        const newCabangId = divisionRef.id;

        cabangDitemukan = { nama: nama, id: newCabangId };
        console.log("ID dokumen baru: ", newCabangId);
      } else {
        cabangDitemukan = sortData[0];
      }

      getDataPenjualan(cabangDitemukan, dataAkun, dates);
      console.log("cabang Ditemukan", sortData);
    } catch (error) {
      console.error("Error fetching cabangList:", error.message);
    }
  };

  const getDataPenjualan = async (cabang, dataAkun, dates) => {
    try {
      const q = query(
        collection(db, "dates"),
        where("cabang", "==", cabang.nama),
        where("bulan", "==", bulan),
        where("tahun", "==", tahun)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Tidak ada dokumen yang ditemukan.");
        await addDatesToFirestore(cabang, dataAkun, dates);
        return;
      } else {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const dataJual = {
          diskon: 0,
          barang: dataAkun.barang,
          jasa: dataAkun.jasa,
        };
        await handleUpdatePenjualanBulanan(data[0], dataJual);
        await handleAddPenjualanHarian(dataJual, cabang, data[0].id, dates);
        console.log("Data penjualan bulanan:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const addDatesToFirestore = async (cabang, dataAkun, dates) => {
    const perusahaanRef = doc(db, "Perusahaan", idPerusahaan);
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        tanggalAwal: dates.startOfMonth,
        tanggalAkhir: dates.endOfMonth,
        bulan: bulan,
        cabang: cabang.nama,
        refPerusahaan: perusahaanRef,
        tahun: tahun,
        targetOmset: 12000,
        totalBarang: dataAkun.barang,
        totalDiskon: 0,
        totalJasa: dataAkun.jasa,
        totalOmset: parseInt(dataAkun.barang) + parseInt(dataAkun.jasa),
      });
      console.log("Document written with ID: ", docRef.id);

      const newDataId = docRef.id;
      const dataJual = {
        diskon: 0,
        barang: dataAkun.barang,
        jasa: dataAkun.jasa,
      };

      await handleAddPenjualanHarian(dataJual, cabang, newDataId, dates);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleAddPenjualanHarian = async (
    dataPenjualan,
    cabang,
    penjualanId,
    dates
  ) => {
    const perusahaanRef = doc(db, "Perusahaan", idPerusahaan);
    const idCabang = doc(db, "CabangPerusahaan", cabang.id);
    const dataPenjualanHarian = {
      data: dataPenjualan,
      cabang: cabang.nama,
      dariTanggal: dates.today,
      sampaiTanggal: dates.today,
      refCabang: idCabang,
      refPerusahaan: perusahaanRef,
      timeStamp: dates.today,
      diskon: dataPenjualan.diskon,
      omset:
        parseInt(dataPenjualan.barang) +
        parseInt(dataPenjualan.jasa) -
        parseInt(dataPenjualan.diskon),
      penjualanBarang: dataPenjualan.barang,
      penjualanJasa: dataPenjualan.jasa,
    };
    console.log("data Added", dataPenjualanHarian);
    try {
      const dataPenjualanHarian = {
        cabang: cabang.nama,
        dariTanggal: dates.today,
        sampaiTanggal: dates.today,
        refCabang: idCabang,
        refPerusahaan: perusahaanRef,
        timeStamp: dates.today,
        diskon: dataPenjualan.diskon,
        omset:
          parseInt(dataPenjualan.barang) +
          parseInt(dataPenjualan.jasa) -
          parseInt(dataPenjualan.diskon),
        penjualanBarang: dataPenjualan.barang,
        penjualanJasa: dataPenjualan.jasa,
      };

      // Simpan dokumen ke subkoleksi dokumenKaryawan
      const penjualanDocRef = doc(getFirestore(), "dates", penjualanId);
      await addDoc(
        collection(penjualanDocRef, "penjualanHarian"),
        dataPenjualanHarian
      );
      console.log("berhasil");
    } catch (error) {
      console.error("Error saving applicant data:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menyimpan dokumen",
        icon: "error",
      });
    }
  };

  const handleUpdatePenjualanBulanan = async (
    penjualanData,
    dataPendapatan
  ) => {
    try {
      const data = {
        targetOmset: 12000,
        totalBarang:
          parseInt(penjualanData.totalBarang) + parseInt(dataPendapatan.barang),
        totalDiskon:
          parseInt(penjualanData.totalDiskon) + parseInt(dataPendapatan.diskon),
        totalJasa:
          parseInt(penjualanData.totalJasa) + parseInt(dataPendapatan.jasa),
        totalOmset:
          parseInt(penjualanData.totalOmset) +
          parseInt(dataPendapatan.jasa) +
          parseInt(dataPendapatan.penjualanBarang),
      };
      console.log(data, "update");

      const penjualanDocRef = doc(db, "dates", penjualanData.id);
      await updateDoc(penjualanDocRef, {
        targetOmset: 12000,
        totalBarang:
          parseInt(penjualanData.totalBarang) + parseInt(dataPendapatan.barang),
        totalDiskon:
          parseInt(penjualanData.totalDiskon) + parseInt(dataPendapatan.diskon),
        totalJasa:
          parseInt(penjualanData.totalJasa) + parseInt(dataPendapatan.jasa),
        totalOmset:
          parseInt(penjualanData.totalOmset) +
          parseInt(dataPendapatan.jasa) +
          parseInt(dataPendapatan.penjualanBarang),
      });
    } catch (error) {
      console.error("Error saving applicant data:", error);
    }
  };
  return (
    <div>
      <button
        className="flex w-[15rem] border border-slate-900 justify-center items-center"
        onClick={addDatesToFirestore}
      >
        Tambah data
      </button>
    </div>
  );
};

export default DataPenjualan;
