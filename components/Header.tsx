import { ArrowLeftIcon, Bars3BottomLeftIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import logo from './../assets/images/logo.svg';
import MenuItems from './../data/Menu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='fixed z-50 top-5 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] md:w-auto'>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className='glass-strong !rounded-full px-6 py-3'
      >
        {/* Mobile */}
        <nav className='flex relative justify-between w-full md:hidden items-center'>
          <Bars3BottomLeftIcon className='w-7 cursor-pointer' onClick={handleMenu} />
          <Link href='/'>
            <figure className='cursor-pointer'>
              <Image width={28} height={28} src={logo} alt='Logo' />
            </figure>
          </Link>

          <motion.div
            initial={false}
            animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className='fixed top-0 left-0 w-screen h-screen z-10 p-6'
            style={{
              background: 'rgba(245, 245, 245, 0.97)',
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
            }}
          >
            <ArrowLeftIcon className='w-7 cursor-pointer' onClick={handleMenu} />
            <ul className='h-full flex flex-col items-center justify-center gap-10 -mt-20'>
              {MenuItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleMenu}
                >
                  <Link href={item.url}>
                    <span className='text-6xl font-bold cursor-pointer hover:opacity-40 transition-opacity duration-300'>
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </nav>

        {/* Desktop */}
        <nav className='hidden md:flex items-center gap-8'>
          <Link href='/'>
            <figure className='cursor-pointer'>
              <Image width={28} height={28} src={logo} alt='Logo' />
            </figure>
          </Link>
          <ul className='flex items-center gap-1 mx-auto'>
            {MenuItems.filter(i => i.label !== 'Home').map(item => (
              <li key={item.label}>
                <Link href={item.url}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className={`py-2 px-5 rounded-full cursor-pointer block text-sm font-medium transition-all duration-300 ${
                      router.asPath.includes(item.url)
                        ? 'bg-black text-white'
                        : 'text-black/50 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}

export default Header;
