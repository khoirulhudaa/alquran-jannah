"use client"

import { Cancel01Icon, Github01Icon, Search01Icon } from 'hugeicons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {

    const [sidebar, setSidebar] = useState<boolean>(false);
    const [activeModalSearch, setActiveModalSearch] = useState<boolean>(false);
    const [activeSearch, setActiveSearch] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBackToTop, setIsBackToTop] = useState(false);

    // Menambahkan event listener untuk ESC key
    useEffect(() => {
        const handleEscPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveModalSearch(false); // Menutup modal ketika ESC ditekan
                setActiveSearch(false); // Menutup modal ketika ESC ditekan
            }
            if (event.ctrlKey && event.key.toLowerCase() === 'k') {
                event.preventDefault(); // Mencegah aksi default browser
                setActiveModalSearch(true)
            }
        };

        // Menambahkan listener saat komponen dipasang
        document.addEventListener('keydown', handleEscPress);

        // Membersihkan listener saat komponen dilepas
        return () => {
            document.removeEventListener('keydown', handleEscPress);
        };
    }, []);

    useEffect(() => {
        const handleScrollBack = () => {
            if (window.scrollY > 5200) {
                setIsBackToTop(true);
            } else {
                setIsBackToTop(false);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
                setActiveSearch(true)
            } else {
                setIsScrolled(false);
                setActiveSearch(false)
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScrollBack);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scroll", handleScrollBack);
        };
    }, []);
    return (
        <nav className='absolute duration-300 top-0 left-0 w-full z-[999999999] flex items-center justify-between gap-10 h-max bg-white/10 backdrop-blur-xl py-4 md:py-2 px-4 md:px-[40px]'>
            <div className="flex items-center w-max text-white gap-10">
                <p className="md:hidden flex">Online</p>

                {/* Default view */}
                <div className='md:flex hidden w-max text-slate-300 py-5 h-max'>
                    <ul className={`w-[80%] flex items-center justify-between ${isScrolled ? 'text-[14px]' : ''}`}>
                        <Link href={'/36'}>
                            <li className='mr-10 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Yasin</li>
                        </Link>
                        <Link href={'/55'}>
                            <li className='mr-10 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Ar-rahman</li>
                        </Link>
                        <Link href={'/67'}>
                            <li className='mr-10 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Al-mulk</li>
                        </Link>
                        <Link href={'/112'}>
                            <li className='mr-10 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Al-ikhlas</li>
                        </Link>
                    </ul>
                </div>
            </div>

            {/* Sidebar - Mobile view */}
            <div className={`fixed w-[100vw] h-screen overflow-y-auto bg-white block md:hidden z-[999999] shadow-md p-6 top-0 ${sidebar ? 'right-0 duration-200' : 'right-[-100%] duration-200 ease-in'}`}>

                <div onClick={() => setSidebar(false)} className='absolute w-[40px] h-[40px] bg-red-500 text-white flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-[90%] shadow-md top-5 right-6'>
                    <Cancel01Icon />
                </div>

                <ul className={`w-[80%] flex items-center justify-between ${isScrolled ? 'text-[14px]' : ''}`}>
                    <Link href={'/36'}>
                        <li className='mb-4 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Yasin</li>
                    </Link>
                    <Link href={'/55'}>
                        <li className='mb-4 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Ar-rahman</li>
                    </Link>
                    <Link href={'/67'}>
                        <li className='mb-4 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Al-mulk</li>
                    </Link>
                    <Link href={'/112'}>
                        <li className='mb-4 w-max animate-fadeIn hover:text-white border-b hover:border-slate-400 border-transparent'>Al-ikhlas</li>
                    </Link>
                </ul>
            </div>

            <div className="text-white flex-1 justify-end gap-6 flex overflow-hidden items-center">
                <div className="w-max h-max">
                    <Link href={'https://github.com/khoirulhudaa/alquran-jannah'} target='__blank' className="ml-auto" rel="noopener noreferrer" aria-label="My GitHub">
                        <Github01Icon size={30} className="animate-fadeIn delay-[1000ms]" />
                    </Link>
                </div>
            </div>

        </nav >
    )
}

export default Navbar
