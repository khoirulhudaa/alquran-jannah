"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Tambah state untuk loading
  const [error, setError] = useState<string | null>(null); // Tambah state untuk error

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch("https://api.alquran.cloud/v1/quran/en.asad");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data.surahs);
        console.log(result?.data?.surahs);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []);

  // Tampilan saat loading
  if (loading) {
    return (
      <div className="bg-white min-h-screen w-screen">
        <div className="w-screen h-[50px] bg-slate-400 animate-pulse"></div>
        <section className="relative w-screen bg-slate-200 h-[78vh] flex flex-col items-center justify-center">
          <div className="w-[50%] h-[60px] bg-slate-400 animate-pulse"></div>
          <div className="w-[75%] h-[26px] mt-4 bg-slate-400 animate-pulse"></div>
          <div className="w-[35%] h-[16px] mt-4 bg-slate-400 animate-pulse"></div>
          <div className="flex gap-6 mt-10">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-[100px] h-[40px] bg-slate-400 animate-pulse rounded-md"
                ></div>
              ))}
          </div>
        </section>
        <section className="grid grid-cols-4 gap-6 p-6 bg-white">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full h-[120px] bg-slate-400 animate-pulse rounded-md"
              ></div>
            ))}
        </section>
      </div>
    );
  }

  // Tampilan saat ada error
  if (error) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  // Tampilan utama
  return (
    <main className="relative w-full min-h-screen bg-white">
      <section className="relative w-full h-[78vh] overflow-hidden">
        <div className="relative text-center flex items-center justify-center flex-col w-full h-full z-[999] bg-black/70 text-white">
          <h1 className="text-[60px] font-bold">Alquran-Jannah</h1>
          <p className="text-lg">
            Beribadah dimanapun dan kapanpun, mempermudah diri untuk mendekat pada Tuhan
          </p>
          <div className="flex items-center gap-6 w-max mx-auto mt-10">
            {data?.slice(0, 4)?.map((surah, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-md bg-green-500 text-white text-[16px] font-normal cursor-pointer active:scale-[0.99] duration-100 hover:brightness-75"
              >
                {surah?.englishName}
              </div>
            ))}
          </div>
        </div>
        <Image
          className="absolute top-0 left-0 z-[1]"
          src="/bg.jpg"
          alt="background-hero"
          layout="fill"
          objectFit="cover"
        />
      </section>

      <section className="relative w-full h-max pb-12 bg-white p-6">
        <div className="grid grid-cols-4 gap-6">
          {data?.map((surah, index) => (
            <Link key={index} href={`/${surah?.number}`}>
              <div className="relative py-6 px-3 rounded-md bg-white text-black border border-black text-[12px] font-normal cursor-pointer active:scale-[0.99] duration-100 hover:bg-green-200 flex items-center justify-center">
                <div className="w-[20%] h-full flex items-center justify-center">
                  <Image src="/logo.png" alt="logo" width={30} height={30} />
                </div>
                <div className="w-[80%] pl-4 border-l border-l-black h-full flex flex-col">
                  <div className="flex items-center mb-2">
                    <p className="text-[18px]">{surah?.englishName}</p>
                    <small className="ml-3">({surah?.name})</small>
                  </div>
                  <div className="flex items-center">
                    <small className="mr-1 text-[20px]">{surah?.number} -</small>
                    <small>{surah?.englishNameTranslation}</small>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}