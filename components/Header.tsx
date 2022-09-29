import React, { useState } from 'react';
import Link from 'next/link';
import logo from './../assets/images/logo.svg'
import Image from 'next/image'
import { ArrowLeftIcon, Bars3BottomLeftIcon } from '@heroicons/react/20/solid';
function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className='absolute top-0 w-full h-20 bg-white p-5 flex'>
          {/* mobile nav */}
            <nav className='flex justify-between w-full md:hidden items-center'>
                <Bars3BottomLeftIcon className='w-10' onClick={handleMenu} />
                <Image src={logo}  />
                <div className={'top-0 left-0 w-screen h-screen bg-white z-10 p-5  ' + (isMenuOpen ? 'fixed' : 'hidden')}>
                    <div className='flex justify-between'>
                        <ArrowLeftIcon className='w-10' onClick={handleMenu}/>
                        <Image src={logo} />
                    </div>
                    <ul className='h-full flex flex-col items-center justify-center gap-5 ' >
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/work'>Work</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/about'>About</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/contact'>Contact</Link>
                        </li>
                    </ul>
                    <ul className='flex flex-col gap-1 justify-center'>
                        <li>Français</li>
                        <li>Anglais</li>
                    </ul>
                </div>

            </nav>
            <nav className={'hidden md:flex fixed p-4 top-0 h-24 w-full justify-between'}>
                <Image src={logo} />
                <ul className={'flex flex-row justify-center items-center gap-5'}>
                    <li>
                        <Link href='/'>home</Link>
                    </li>
                    <li>
                        <Link href='/work'>work</Link>
                    </li>
                    <li>
                        <Link href='/about'>about</Link>
                    </li>
                    <li>
                        <Link href='/contact'>contact</Link>
                    </li>
                </ul>
                <ul className='flex flex-col gap-1 justify-center'>
                    <li>Français</li>
                    <li>Anglais</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
