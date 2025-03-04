"use client";

import { ArrowRight02Icon, PauseIcon, PlayIcon } from "hugeicons-react"; // Tambahkan PauseIconimport Image from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<any | null>(null); // Data teks Arab
    const [dataText, setDataText] = useState<any | null>(null); // Data terjemahan
    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null); // Instance audio yang aktif
    const [playingAyah, setPlayingAyah] = useState<number | null>(null); // Ayat yang sedang diputar

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch teks Arab
                const responseArab = await fetch(`https://api.alquran.cloud/v1/surah/${slug}/ar.alafasy`);
                const arabData = await responseArab.json();
                setData(arabData.data);
                console.log(arabData?.data)

                // Fetch terjemahan (misalnya, bahasa Inggris)
                const responseText = await fetch(`https://api.alquran.cloud/v1/surah/${slug}/en.asad`);
                const textData = await responseText.json();
                setDataText(textData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [slug]);

    if (!data || !dataText) return (
        <div className="bg-white h-max w-screen">

            <div className="w-screen h-[50px] z-[9999999999999999] bg-slate-400 animation duration-100 animate-pulse">

            </div>

            <section className="relative w-screen bg-slate-200 h-[80vh] overflow-hidden flex flex-col items-center justify-center">
                <div className="w-[50%] h-[50px] bg-slate-400 animation animate-pulse duration-100"></div>
                <div className="w-[75%] h-[26px] mt-4 bg-slate-400 animation animate-pulse duration-100"></div>
                <div className="w-[35%] h-[16px] mt-4 bg-slate-400 animation animate-pulse duration-100"></div>
            </section>

            <section className="relative bg-slate-200 mt-6 w-screen flex h-[300px] overflow-hidden">
                <div className="w-[50%] h-[300px] mr-2 bg-slate-400 animation animate-pulse duration-100"></div>
                <div className="w-[50%] h-[300px] ml-2 bg-slate-400 animation animate-pulse duration-100"></div>
            </section>
            <section className="relative bg-slate-200 mt-6 w-screen flex h-[300px] overflow-hidden">
                <div className="w-[50%] h-[300px] mr-2 bg-slate-400 animation animate-pulse duration-100"></div>
                <div className="w-[50%] h-[300px] ml-2 bg-slate-400 animation animate-pulse duration-100"></div>
            </section>
            <section className="relative bg-slate-200 mt-6 w-screen flex h-[300px] overflow-hidden">
                <div className="w-[50%] h-[300px] mr-2 bg-slate-400 animation animate-pulse duration-100"></div>
                <div className="w-[50%] h-[300px] ml-2 bg-slate-400 animation animate-pulse duration-100"></div>
            </section>
        </div>
    );

    const handlePlayAudio = (audioUrl: string, ayahNumber: number) => {
        if (playingAyah === ayahNumber && audioInstance) {
            // Jika ayat yang sama sedang diputar, jeda audio
            audioInstance.pause();
            setPlayingAyah(null);
            setAudioInstance(null);
        } else {
            // Hentikan audio yang sedang diputar (jika ada)
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.currentTime = 0; // Reset ke awal
            }

            // Buat dan putar audio baru
            const newAudio = new Audio(audioUrl);
            newAudio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setAudioInstance(newAudio);
            setPlayingAyah(ayahNumber);

            // Reset state saat audio selesai
            newAudio.onended = () => {
                setPlayingAyah(null);
                setAudioInstance(null);
            };
        }
    }

    return (
        <>
            <section className="relative w-full h-[78vh] overflow-hidden">
                <div className="relative text-center flex items-center justify-center flex-col w-full h-full z-[999] bg-black/70">
                    <h1 className="text-[60px]">{data?.number} - {data?.englishName}</h1>
                    <p>Jumlah ayat: {data?.numberOfAyahs} - {data?.name}</p>
                    <div className="flex item-center w-max relative top-6">
                        <Link href={'/'}>
                            <p>Home</p>
                        </Link>
                        <ArrowRight02Icon className="mx-3 text-slate-300" />
                        <p>Surah</p>
                        <ArrowRight02Icon className="mx-3 text-slate-300" />
                        <p>{data?.englishName}</p>
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
            <section className="relative pt-6 bg-white w-full h-max overflow-hidden">
                {/* Loop untuk setiap pasangan ayat */}
                {data?.ayahs?.map((ayahArab: any, index: number) => {
                    const ayahText = dataText?.ayahs[index]; // Ambil terjemahan yang sesuai
                    return (
                        <div
                            key={ayahArab.numberInSurah} // Key unik berdasarkan nomor ayat
                            className="bg-white flex border-b-[1px] mb-4 border-b-slate-400 p-4"
                        >
                            {/* Kolom Kiri: Teks Arab */}
                            <div className="relative w-1/2 px-6 text-right border-r border-r-slate-400 h-full">
                                <div className="absolute flex items-center left-2 top-0 w-max h-max">
                                    {playingAyah && playingAyah === ayahArab?.numberInSurah ? (
                                        <PauseIcon
                                            className="w-8 h-8 p-1 border border-black text-black rounded-full"
                                            onClick={() => handlePlayAudio(ayahArab?.audio, ayahArab.numberInSurah)}
                                        />
                                    ) : (
                                        <PlayIcon
                                            className="w-8 h-8 p-1 bg-red-500 border border-red-500 text-white rounded-full"
                                            onClick={() => handlePlayAudio(ayahArab?.audio, ayahArab.numberInSurah)}
                                        />
                                    )}
                                    <p className="ml-3 text-black">mp3</p>
                                </div>
                                <h2 className="text-[32px] font-normal text-[#1f3352]">Qur'an</h2>
                                <div className="py-6 flex flex-col justify-end items-end text-[#1f3352] w-full mb-4">
                                    <h3 className="text-[28px] w-[80%] font-bold">{ayahArab?.text}</h3>
                                    <p className="text-[14px] text-slate-500">
                                        Ayat: {ayahArab?.numberInSurah} - Juz: {data?.juz}
                                    </p>
                                </div>
                            </div>

                            {/* Kolom Kanan: Terjemahan */}
                            <div className="w-1/2 px-6 h-full">
                                <h2 className="text-[32px] font-normal text-[#1f3352]">Translation</h2>
                                <div className="py-6 text-[#1f3352] w-full mb-4">
                                    <h3 className="text-[22px] font-medium">{ayahText?.text}</h3>
                                    <p className="text-[14px] text-slate-500">
                                        Ayat: {ayahText?.numberInSurah} - Juz: {data?.juz}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}