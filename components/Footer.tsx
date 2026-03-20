import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import mailIcon from '../assets/icons/mail.png';
import Link from 'next/link';
import MenuItems from '../data/Menu';
import Socials from '../data/Socials';

function Footer() {
  return (
    <footer className='relative mt-24'>
      {/* Gradient divider — fades out in center for button overlap */}
      <div className='h-px' style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(26,26,46,0.15) 15%, rgba(26,26,46,0.15) 38%, transparent 48%, transparent 52%, rgba(26,26,46,0.15) 62%, rgba(26,26,46,0.15) 85%, transparent 100%)'
      }} />

      <div className='footer-glass py-16 px-6'>
        <div className='max-w-[1400px] mx-auto'>
          {/* Email icon — overlaps top border */}
          <div className='absolute left-1/2 -translate-x-1/2 -top-7 z-10'>
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className='w-14 h-14 glass-btn rounded-2xl flex items-center justify-center cursor-pointer'
              href='mailto:contact@benjampo.ch'
            >
              <span className='invert flex items-center justify-center'><Image src={mailIcon} alt='Email' width={20} height={20} /></span>
            </motion.a>
          </div>

          {/* Nav + socials row */}
          <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
            <nav>
              <ul className='flex items-center gap-6'>
                {MenuItems.map(item => (
                  <li key={item.label}>
                    <Link href={item.url}>
                      <span className='text-[11px] uppercase tracking-[0.2em] text-[#1a1a2e]/35 hover:text-[#1a1a2e]/70 transition-colors duration-300 cursor-pointer'>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='flex items-center gap-5'>
              {Socials.map((social, index) => (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noreferrer'
                  className='opacity-40 hover:opacity-70 transition-opacity duration-300 invert'
                >
                  <Image alt={social.label} src={social.icon} width={32} height={32} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className='mt-10'>
            <p className='text-center text-[10px] text-[#1a1a2e]/30 tracking-[0.15em] uppercase'>
              &copy; 2026 Benjamin Porchet &mdash; Designed & built by hand
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
