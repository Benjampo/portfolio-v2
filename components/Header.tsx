import React, { useState } from 'react';
import Link from 'next/link';
import logo from './../assets/images/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, Bars3BottomLeftIcon } from '@heroicons/react/20/solid';
function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const MenuItems = [
        {
            label: 'Home',
            url: '/',
            active: true
        },
        {
            label: 'Work',
            url: '/work',
            active: false
        },
        {
            label: 'About',
            url: '/about',
            active: false
        },
        {
            label: 'Contact',
            url: '/contact',
            active: false
        }
    ];

    return (
        <header className=" absolute top-0 w-full h-20 bg-white p-5 px-5 md:px-64  md:max-w-screen-2xl md:left-1/2 -translate-x-1/2">
            {/* mobile nav */}
            <nav className="flex justify-between w-full md:hidden items-center">
                <Bars3BottomLeftIcon className="w-10" onClick={handleMenu} />
                <Link href="/">
                    <Image src={logo} />
                </Link>

                <div
                    className={
                        'top-0 left-0 w-screen h-screen bg-white z-10 p-5  ' +
                        (isMenuOpen ? 'fixed' : 'hidden')
                    }>
                    <div className="flex justify-between">
                        <ArrowLeftIcon className="w-10" onClick={handleMenu} />
                        <Image src={logo} />
                    </div>
                    <ul className="h-full flex flex-col items-center justify-center gap-5 ">
                        {MenuItems.map((item) => (
                            <li key={item.label} className="text-center font-bold text-6xl">
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
                    'hidden md:flex relative top-0 md:max-w-screen-2xl md:w-screen-2xl justify-between  md:mx-auto'
                }>
                <Link href="/">
                    <Image className="cursor-pointer" src={logo} />
                </Link>
                <ul className={'flex flex-row justify-evenly items-center gap-5'}>
                    {MenuItems.filter((item) => {
                        return item.label !== 'Home';
                    }).map((filtered) => (
                        <li
                            className={`py-2 px-4 rounded rounded-full ${
                                router.asPath === filtered.url
                                    ? 'bg-black text-white'
                                    : 'text-black'
                            }`}
                            key={filtered.label}>
                            <Link href={filtered.url}>{filtered.label}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-1 justify-center">
                    <li>Français</li>
                    <li>Anglais</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
