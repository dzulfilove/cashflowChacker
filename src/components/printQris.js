import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
const PrintQris = (props) => {
  const formatTanggal = (tanggal) => {
    const hari = dayjs(tanggal).locale("id").format("dddd");
    const bulan = dayjs(tanggal).locale("id").format("MMMM");
    const hasil =
      hari +
      " , " +
      tanggal.substring(8, 10) +
      " " +
      bulan +
      " " +
      tanggal.substring(0, 4);
    console.log("tanggal", dayjs(tanggal).locale("id").format("MMMM"));

    return hasil;
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
  const formatRupiah2 = (angka) => {
    const nilai = parseFloat(angka);
    const isNegative = nilai < 0;
    const absoluteValue = Math.abs(nilai);

    const formattedValue = absoluteValue.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return isNegative ? `(${formattedValue})` : formattedValue;
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
  return (
    <div>
      <div className="flex w-[50rem] border  rounded-md p-4 flex-col justify-start items-start mb-20 mt-10 ml-0">
        <div className="w-[100%] flex justify-start items-start flex-col gap-2 mb-6">
          <h5 className="font-medium text-base">
            {props.dataKas.namaPerusahaan}
          </h5>
          <h5 className="text-base font-normal">REKAP KAS QRIS</h5>
        </div>
        <div className="w-[100%] flex justify-start items-start flex-col gap-1 mb-6">
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Jenis Kas</div>
            <div className="flex justify-between w-[20rem]">
              : {props.dataModal.k05}
            </div>
          </div>
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Periode</div>
            <div className="flex justify-between w-[20rem]">
              :{" "}
              {formatTanggalJurnal(
                props.tanggalAwalString,
                props.tanggalAkhirString
              )}
            </div>
          </div>
        </div>
        <div className="w-[100%] flex justify-start items-start flex-col  border border-slate-500  mb-10">
          <div className="w-[100%] flex justify-start items-start border-b border-b-slate-500">
            <div className=" w-[33.33%] px-4 pb-2 flex justify-center items-center text-base ">
              No Jurnal
            </div>
            <div className=" w-[33.33%] px-4 pb-2 flex justify-center items-center text-base border-r border-r-slate-500  border-l border-l-slate-500 ">
              Nama Transaksi
            </div>
            <div className=" w-[33.33%] px-4 pb-2 flex justify-center items-center text-base  ">
              Jumlah
            </div>
          </div>
          {props.dataCash.map((data) => (
            <div className="w-[100%] flex justify-start items-start border-b border-b-slate-500 font-normal">
              <div className=" w-[33.33%] px-4 py-4 flex justify-start items-center text-base  ">
                {data.k04}
              </div>
              <div className=" w-[33.33%] px-4 py-4 flex justify-start items-center text-base border-r border-r-slate-500 border-l border-l-slate-500">
                {data.k05}
              </div>
              <div className=" w-[33.33%] px-4 py-4 flex justify-start items-center text-base  ">
                {formatRupiah2(data.jml)}
              </div>
            </div>
          ))}
          <div className="w-[100%] flex justify-start items-start border-b border-b-slate-500 font-normal">
            <div className=" w-[66.66%] px-4 py-4 flex justify-start items-center text-base border-r border-r-slate-500 ">
              Total Keseluruhan
            </div>
            <div className=" w-[33.33%] px-4 py-4 flex justify-start items-center text-base  ">
              {formatRupiah2(props.dataModal.jml)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQris;
