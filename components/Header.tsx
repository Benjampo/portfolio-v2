import React, { useState } from 'react';
import Link from 'next/link';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    return (
        <header className='absolute top-0 w-full h-20 bg-white p-5 flex'>
          {/* mobile nav */}
            <nav className='flex justify-center md:hidden items-center' >
                <div className="space-y-2 md:hidden cursor-pointer" onClick={() => {setIsMenuOpen(!isMenuOpen)}}>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-5 h-0.5 bg-gray-600"></span>
                </div>
                <div className={'top-0 left-0 w-screen h-screen bg-white z-10 p-5 ' + (isMenuOpen ? 'absolute' : 'hidden')}>
                    <div className="space-y-2 md:hidden cursor-pointer" onClick={() => {setIsMenuOpen(!isMenuOpen)}}>
                        <span className="block w-8 h-0.5 bg-gray-600"></span>
                        <span className="block w-5 h-0.5 bg-gray-600"></span>
                    </div>
                    <ul className='h-full flex flex-col items-center justify-center gap-5 ' >
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/'>home</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/work'>work</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/about'>about</Link>
                        </li>
                        <li className='text-center font-bold text-6xl'>
                            <Link href='/contact'>contact</Link>
                        </li>
                    </ul>
                </div>

            </nav>
            <nav className={'hidden md:flex fixed top-0 h-24 w-full'}>
                <ul className={'hidden md:flex fixed top-0 h-24 w-full flex flex-row p-4 justify-center items-center gap-5'}>
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
            </nav>
        </header>
    );
}

export default Header;
