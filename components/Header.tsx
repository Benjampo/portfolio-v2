import { AnimatePresence, motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import logo from './../assets/images/logo.svg';
import MenuItems from './../data/Menu';

const ease = [0.16, 1, 0.3, 1] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (url: string) =>
    url === '/' ? router.asPath === '/' : router.asPath.startsWith(url);

  return (
    <>
      <header className='fixed z-50 top-5 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] md:w-auto'>
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0, 0, 0.58, 1] }}
          className='glass-strong !rounded-full px-6 py-3'
        >
          {/* Mobile */}
          <nav className='flex relative justify-between w-full md:hidden items-center'>
            <button
              onClick={handleMenu}
              className='w-7 h-7 flex flex-col justify-center items-center gap-[5px] cursor-pointer'
              aria-label='Open menu'
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className='block w-5 h-[1.5px] bg-[#1a1a2e] origin-center'
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className='block w-5 h-[1.5px] bg-[#1a1a2e] origin-center'
              />
            </button>

            <Link href='/'>
              <figure className='cursor-pointer'>
                <Image width={28} height={28} src={logo} alt='Logo' />
              </figure>
            </Link>

            {/* Spacer for centering */}
            <div className='w-7' />
          </nav>

          {/* Desktop */}
          <nav className='hidden md:flex items-center gap-8'>
            <Link href='/'>
              <figure className='cursor-pointer'>
                <Image width={28} height={28} src={logo} alt='Logo' />
              </figure>
            </Link>
            <ul className='flex items-center gap-1 mx-auto'>
              {MenuItems.filter((i: { label: string }) => i.label !== 'Home').map((item: { label: string; url: string }) => (
                <li key={item.label}>
                  <Link href={item.url}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      className={`py-2 px-5 rounded-full cursor-pointer block text-sm font-medium transition-all duration-300 ${
                        isActive(item.url)
                          ? 'bg-white/30 text-[#1a1a2e] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),_0_2px_8px_rgba(100,160,220,0.08)] backdrop-blur-sm border border-white/30'
                          : 'text-black/50 hover:text-black hover:bg-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key='mobile-menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className='fixed inset-0 z-40 md:hidden mobile-menu-overlay'
          >
            {/* Glass background */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease }}
              className='absolute inset-0 mobile-menu-glass'
            />

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className='absolute top-24 left-8 right-8 h-px origin-left'
              style={{ background: 'linear-gradient(90deg, rgba(26,26,46,0.12), rgba(100,160,240,0.15), transparent)' }}
            />

            {/* Menu content */}
            <div className='relative h-full flex flex-col justify-between px-8 pt-28 pb-12'>
              {/* Navigation items */}
              <ul className='flex flex-col gap-1'>
                {MenuItems.map((item: { label: string; url: string }, i: number) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.6,
                      ease,
                    }}
                  >
                    <Link href={item.url} onClick={handleMenu}>
                      <div className='group flex items-center py-5 cursor-pointer'>
                        <span
                          className={`text-[2.5rem] leading-none tracking-tight transition-all duration-500 ${
                            isActive(item.url)
                              ? 'font-semibold text-[#1a1a2e]'
                              : 'font-light text-[#1a1a2e]/60 group-hover:text-[#1a1a2e] group-hover:translate-x-2'
                          }`}
                        >
                          {item.label}
                        </span>

                        {isActive(item.url) && (
                          <motion.div
                            layoutId='mobile-active-dot'
                            className='w-1.5 h-1.5 rounded-full bg-[rgba(100,160,240,0.6)] ml-3'
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.5, ease }}
                className='flex items-end justify-between'
              >
                <p className='text-[10px] tracking-[0.2em] uppercase text-black/25 font-light'>
                  Portfolio &mdash; 2026
                </p>
                <div className='flex gap-4'>
                  <a
                    href='https://github.com/benjaminporchet'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[10px] tracking-[0.15em] uppercase text-black/30 hover:text-black/60 transition-colors duration-300'
                  >
                    Github
                  </a>
                  <a
                    href='https://linkedin.com/in/benjaminporchet'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[10px] tracking-[0.15em] uppercase text-black/30 hover:text-black/60 transition-colors duration-300'
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
