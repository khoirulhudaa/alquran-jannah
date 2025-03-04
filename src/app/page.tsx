"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "./components/main/footer";
import Link from "next/link";
// import { useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.alquran.cloud/v1/quran/en.asad');
        const data = await response.json();
        // Menyimpan hasil teks ayat ke state
        setData(data.data.surahs);
        // Menampilkan data di console
        console.log(data?.data?.surahs);
      } catch (error) {
        // Menangani error jika ada
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="relative w-full min-h-screnn bg-white">
      <section className="relative w-full h-[78vh] overflow-hidden">
        <div className="relative text-center flex items-center justify-center flex-col w-full h-full z-[999] bg-black/70">
          <h1 className="text-[60px]">Alquran-Jannah</h1>
          <p>Beribadah dimanapun dan kapanpun, mempemudah diri untuk menedekat pada Tuhan</p>
          <div className="flex items-center gap-6 w-max mx-auto relative top-10">
            {
              data?.length > 0 && data?.slice(0, 4)?.map((data: any, index: number) => (
                <div key={index} className="px-3 py-2 rounded-md bg-green-500 text-white text-[16px] font-normal cursor-pointer active:scale-[0.99] duration-100 hover:brightness-75 flex items-center justify-center">
                  {data?.englishName}
                </div>
              ))
            }
          </div>
        </div>
        <Image
          className="absolute top-0 left-0 z-[1]"
          src={'/bg.jpg'}
          alt="background-hero"
          layout="fill"
          objectFit="cover"
        />
      </section>

      <section className="relative w-full h-max mb-12 bg-white p-6">
        <div className="grid grid-cols-4 gap-6">
          {
            data?.length > 0 && data?.map((d: any, index: number) => (
              <Link key={index} href={`${d?.number}`}>
                <div className="relative py-6 px-3 rounded-md bg-white text-black border border-black text-[12px] font-normal cursor-pointer active:scale-[0.99] duration-100 hover:bg-green-200 flex items-center justify-center">
                  <div className="w-[20%] h-full flex items-center justify-center">
                    <Image
                      src={'/logo.png'}
                      alt="logo"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="w-[80%] pl-4 border-l border-l-black h-full flex flex-col">
                    <div className="flex items-center mb-2">
                      <p className="text-[18px]">
                        {d?.englishName}
                      </p>
                      <small className="ml-3">({d?.name})</small>
                    </div>
                    <div className="flex items-center">
                      <small className="mr-[1px] text-[20px]">{d?.number} -</small>
                      <small>{d?.englishNameTranslation} -</small>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>

      <Footer />
    </main>
  );
}
