import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
function Print(props) {
  console.log(props.dataAkhir, "jhjadh");
  const [tanggal, setTanggal] = useState(
    dayjs().locale("id").format("YYYY-MM-DD")
  );
  const formatRupiah = (angka) => {
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
  const formatTanggal = (tanggal) => {
    const hari = dayjs(tanggal).locale("id").format("dddd");
    const bulan = dayjs(tanggal).locale("id").format("MMMM");
    const hasil =
      tanggal.substring(8, 10) + " " + bulan + " " + tanggal.substring(0, 4);
    console.log("tanggal", dayjs(tanggal).locale("id").format("MMMM"));

    return hasil;
  };
  return (
    <div>
      <div className="flex w-[50rem] border border-slate-600 rounded-md p-4 flex-col justify-start items-start mb-20">
        <div className="w-[100%] flex justify-start items-start flex-col gap-2 mb-6">
          <h5 className="font-medium text-base">Nama Perusahaan</h5>
          <h5 className="text-base font-normal">REKAP ARUS KAS</h5>
        </div>
        <div className="w-[100%] flex justify-start items-start flex-col gap-1 mb-6">
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Jenis Kas</div>
            <div className="flex justify-between w-[20rem]">
              : {props.akun.label}
            </div>
          </div>
          <div className="font-medium text-sm flex w-full justify-start items-center">
            <div className="flex justify-between w-[7rem]">Periode</div>
            <div className="flex justify-between w-[20rem]">
              : {formatTanggal(props.tanggalAwal)} -{" "}
              {formatTanggal(props.tanggalAkhir)}
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
                {props.dataAwal.map((data) => (
                  <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                    {data.k03}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 w-full font-medium italic">
                  Perubahan Kas
                </div>
                {props.dataUbah.map((data) => (
                  <div className="pl-16 flex justify-start items-center py-1 w-full font-normal">
                    {data.k03}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 w-full font-medium italic">
                  Saldo Akhir
                </div>
                {props.dataAkhir.map((data) => (
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
                {props.dataAwal.map((data) => (
                  <div className="pl-16 flex justify-end items-center py-1 w-full font-normal">
                    {formatRupiah(data.jml)}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 pb-6 w-full font-medium"></div>
                {props.dataUbah.map((data) => (
                  <div className="pl-16 flex justify-end items-center py-1 w-full font-normal">
                    {formatRupiah(data.jml)}
                  </div>
                ))}
              </div>
              <div className=" w-[100%] px-4 pb-2 flex flex-col justify-center items-center text-sm border-b border-b-slate-500">
                <div className="flex justify-start items-center py-1 pb-6 w-full font-medium"></div>
                {props.dataAkhir.map((data) => (
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
              Dicetak Pada : {formatTanggal(tanggal)}
            </div>
            <div className="flex justify-between ">Petugas</div>
            <div className="flex justify-between h-[5rem] items-end">
              {props.user}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Print;
