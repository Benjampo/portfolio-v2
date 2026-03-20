import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import logo from './../assets/images/logo.svg';
import MenuItems from './../data/Menu';

const ease = [0.16, 1, 0.3, 1] as const;

function SunIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
      <circle cx='12' cy='12' r='5' />
      <line x1='12' y1='1' x2='12' y2='3' />
      <line x1='12' y1='21' x2='12' y2='23' />
      <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
      <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
      <line x1='1' y1='12' x2='3' y2='12' />
      <line x1='21' y1='12' x2='23' y2='12' />
      <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
      <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const handleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (url: string) =>
    url === '/' ? router.asPath === '/' : router.asPath.startsWith(url);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsNavHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsNavHovered(false), 200);
  };

  return (
    <>
      <header className='fixed z-50 top-5 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] md:w-auto'>
        {/* Wrapper for hover zone — includes nav + bubble area */}
        <div
          className='relative hidden md:block'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.42, 0, 0.58, 1] }}
            className='glass-strong !rounded-full px-5 py-2'
          >
            <nav className='flex items-center gap-8'>
              <Link href='/'>
                <figure className='cursor-pointer'>
                  <Image width={28} height={28} src={logo} alt='Logo' className='dark:invert' />
                </figure>
              </Link>
              <ul className='flex items-center gap-1 mx-auto'>
                {MenuItems.filter(
                  (i: { labelKey: string }) => i.labelKey !== 'nav.home'
                ).map((item: { labelKey: string; url: string }) => (
                  <li key={item.labelKey}>
                    <Link href={item.url}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        className={`py-2 px-5 rounded-full cursor-pointer block text-sm font-medium transition-all duration-300 ${
                          isActive(item.url)
                            ? 'bg-white/30 dark:bg-white/10 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6),_0_2px_8px_rgba(100,160,220,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_2px_8px_rgba(100,160,220,0.15)] backdrop-blur-sm border border-white/30 dark:border-white/10'
                            : 'text-foreground/50 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] border border-transparent'
                        }`}
                      >
                        {t(item.labelKey as any)}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Floating bubbles — split out from nav on hover */}
          <AnimatePresence>
            {isNavHovered && (
              <div className='absolute right-0 top-0 bottom-0 flex items-center pointer-events-none' style={{ transform: 'translateX(100%)' }}>
                <div className='flex items-stretch gap-2 pl-3 pointer-events-auto h-full'>
                  {/* Theme bubble */}
                  <motion.button
                    key='theme-bubble'
                    initial={{ opacity: 0, scale: 0.3, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -20 }}
                    transition={{ duration: 0.35, ease, delay: 0 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className='glass-strong !rounded-full aspect-square h-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors cursor-pointer'
                    aria-label='Toggle theme'
                  >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  </motion.button>

                  {/* Language bubble */}
                  <motion.button
                    key='lang-bubble'
                    initial={{ opacity: 0, scale: 0.3, x: -24 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -24 }}
                    transition={{ duration: 0.35, ease, delay: 0.05 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLocale}
                    className='glass-strong !rounded-full aspect-square h-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors cursor-pointer'
                    aria-label='Toggle language'
                  >
                    {locale === 'en' ? 'FR' : 'EN'}
                  </motion.button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile nav — separate, no hover bubbles */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.42, 0, 0.58, 1] }}
          className='glass-strong !rounded-full px-6 py-3 md:hidden'
        >
          <nav className='flex relative justify-between w-full items-center'>
            <button
              onClick={handleMenu}
              className='w-7 h-7 flex flex-col justify-center items-center gap-[5px] cursor-pointer'
              aria-label='Open menu'
            >
              <motion.span
                animate={
                  isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.4, ease }}
                className='block w-5 h-[1.5px] bg-foreground origin-center'
              />
              <motion.span
                animate={
                  isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.4, ease }}
                className='block w-5 h-[1.5px] bg-foreground origin-center'
              />
            </button>

            <Link href='/'>
              <figure className='cursor-pointer'>
                <Image width={28} height={28} src={logo} alt='Logo' className='dark:invert' />
              </figure>
            </Link>

            {/* Spacer for centering */}
            <div className='w-7' />
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
              style={{
                background:
                  'linear-gradient(90deg, rgba(26,26,46,0.12), rgba(100,160,240,0.15), transparent)',
              }}
            />

            {/* Menu content */}
            <div className='relative h-full flex flex-col justify-between px-8 pt-28 pb-12'>
              {/* Navigation items */}
              <ul className='flex flex-col gap-1'>
                {MenuItems.map(
                  (item: { labelKey: string; url: string }, i: number) => (
                    <motion.li
                      key={item.labelKey}
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
                                ? 'font-semibold text-foreground'
                                : 'font-light text-foreground/60 group-hover:text-foreground group-hover:translate-x-2'
                            }`}
                          >
                            {t(item.labelKey as any)}
                          </span>

                          {isActive(item.url) && (
                            <motion.div
                              layoutId='mobile-active-dot'
                              className='w-1.5 h-1.5 rounded-full bg-[rgba(100,160,240,0.6)] ml-3'
                              transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                              }}
                            />
                          )}
                        </div>
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.5, ease }}
                className='flex items-end justify-between'
              >
                <div className='flex items-center gap-4'>
                  <p className='text-[10px] tracking-[0.2em] uppercase text-foreground/25 font-light'>
                    {t('footer.portfolio')} &mdash; 2026
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className='w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors cursor-pointer'
                    aria-label='Toggle theme'
                  >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLocale}
                    className='w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors cursor-pointer'
                    aria-label='Toggle language'
                  >
                    {locale === 'en' ? 'FR' : 'EN'}
                  </motion.button>
                </div>
                <div className='flex gap-4'>
                  <a
                    href='https://github.com/benjaminporchet'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground/90 transition-colors duration-300'
                  >
                    Github
                  </a>
                  <a
                    href='https://linkedin.com/in/benjaminporchet'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground/90 transition-colors duration-300'
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
