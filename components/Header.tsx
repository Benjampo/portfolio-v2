import React, { useState } from 'react';
import Link from 'next/link';
import logo from './../assets/images/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, Bars3BottomLeftIcon } from '@heroicons/react/20/solid';
import MenuItems from './../data/Menu';
function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className=" fixed z-50 top-0 w-full h-20 bg-white p-5 px-5 md:px-64 md:left-1/2 md:-translate-x-1/2">
            {/* mobile nav */}
            <div className="md:max-w-screen-2xl md:mx-auto px-5">
                <nav className="flex relative justify-between w-full md:hidden items-center">
                    <Bars3BottomLeftIcon className="w-10" onClick={handleMenu} />
                    <Link href="/">
                        <figure className="absolute right-0 cursor-pointer">
                            <Image width={36} height={36} src={logo} alt="Benjampo Logo" />
                        </figure>
                    </Link>

                    <div
                        className={
                            'top-0 w-screen left-0 w-screen h-screen bg-white z-10 p-5 transform transition-transform ease-in-out ' +
                            (isMenuOpen ? 'fixed ' : 'fixed -translate-x-[100%] ')
                        }>
                        <div className="flex justify-between">
                            <ArrowLeftIcon className="w-10" onClick={handleMenu} />
                        </div>
                        <ul className="h-full flex flex-col items-center justify-center gap-5 ">
                            {MenuItems.map((item) => (
                                <li
                                    key={item.label}
                                    onClick={handleMenu}
                                    className="text-center font-bold text-6xl">
                                    <Link href={item.url}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex flex-col gap-1 justify-center">
                            <li>Français</li>
                            <li>Anglais</li>
                        </ul>
                    </div>
                </nav>

                {/* desktop nav */}
                <nav
                    className={
                        'hidden md:flex relative top-0 md:max-w-screen-2xl md:w-screen-2xl justify-center  md:mx-auto'
                    }>
                    <Link href="/">
                        <figure className="cursor-pointer ">
                            <Image width={36} height={36} src={logo} alt="Benjampo Logo" />
                        </figure>
                    </Link>
                    <ul
                        className={
                            'flex flex-row justify-evenly items-center gap-5 ml-auto mr-auto'
                        }>
                        {MenuItems.filter((item) => {
                            return item.label !== 'Home';
                        }).map((filtered) => (
                            <li
                                className={`py-2 px-4  rounded-full hover:bg-gray-200 hover:text-black ${
                                    router.asPath === filtered.url
                                        ? 'bg-black text-white'
                                        : 'text-black'
                                }`}
                                key={filtered.label}>
                                <Link href={filtered.url}>{filtered.label}</Link>
                            </li>
                        ))}
                    </ul>
                    {/*<ul className='flex flex-col gap-1 justify-center'>
                    <li>Français</li>
                    <li>Anglais</li>
                </ul>*/}
                </nav>
            </div>
        </header>
    );
}

export default Header;
