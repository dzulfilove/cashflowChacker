import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
const PrintComponent = (props) => {
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
  return (
    <div>
      <div className="flex w-[50rem] border  rounded-md p-4 flex-col justify-start items-start mb-20 mt-10 ml-0">
        <div className="w-[100%] flex justify-start items-start flex-col gap-2 mb-6">
          <h5 className="font-medium text-base">
            {props.dataKas.namaPerusahaan}
          </h5>
          <h5 className="text-base font-normal">REKAP ARUS KAS</h5>
        </div>
        <div className="w-[100%] flex justify-start items-start flex-col gap-1 mb-6">
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Jenis Kas</div>
            <div className="flex justify-between w-[20rem]">
              : {props.idAkun.label}
            </div>
          </div>
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Periode</div>
            <div className="flex justify-between w-[20rem]">
              :{" "}
              {props.isTanggal == false
                ? formatTanggal(props.tanggalAwalString)
                : formatTanggal(props.tanggalAwalString) +
                  " - " +
                  formatTanggal(props.tanggalAkhirString)}
            </div>
          </div>
        </div>
        <div className="w-[100%] flex justify-start items-start flex-col  border border-slate-500 ">
          <div className="w-[100%] flex justify-start items-start ">
            <div className="w-[70%] flex flex-col justify-center items-center border border-slate-500">
              <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                Nama Jurnal
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 w-full font-medium italic">
                  Saldo Awal
                </div>
                {props.dataCashflow1.map((data) => (
                  <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                    {data.k03}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 w-full font-medium italic">
                  Perubahan Kas
                </div>
                {props.dataCashflow2.map((data) => (
                  <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                    {data.k03}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 w-full font-medium italic">
                  Saldo Akhir
                </div>
                {props.dataCashflow3.map((data) => (
                  <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                    {data.k03}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[30%] flex flex-col justify-center items-center border border-slate-500">
              <div className=" w-[100%] px-4 pb-2 flex justify-center items-center text-base border-b border-b-slate-500">
                Jumlah
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 pb-6 w-full font-medium"></div>
                {props.dataCashflow1.map((data) => (
                  <div className="pl-16 flex justify-end items-center py-1 w-full font-normal">
                    {formatRupiah(data.jml)}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 pb-6 w-full font-medium"></div>
                {props.dataCashflow2.map((data) => (
                  <div className="pl-16 flex justify-end items-center py-1 w-full font-normal">
                    {formatRupiah2(data.jml)}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 pb-6 w-full font-medium"></div>
                {props.dataCashflow3.map((data) => (
                  <div className="pl-16 flex justify-end items-center py-1 w-full font-normal">
                    {formatRupiah(data.jml)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="font-medium text-sm flex w-full justify-end  items-center mt-6">
          <div className="font-medium text-sm flex flex-col justify-end  items-center mt-6">
            <div className="flex justify-center w-[15rem]">
              Dicetak Pada : {formatTanggal(props.tanggal)}
            </div>
            <div className="flex justify-between ">Petugas</div>
            <div className="flex justify-between h-[5rem] items-end">
              {props.dataKas.namaUser}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
