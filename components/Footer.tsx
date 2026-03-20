import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import MenuItems from '../data/Menu';
import Socials from '../data/Socials';

function Footer() {
  return (
    <footer className='relative mt-24'>
      {/* Gradient divider */}
      <div className='section-rule' />

      <div className='footer-glass py-16 px-6'>
        <div className='max-w-[1400px] mx-auto'>
          {/* Email icon */}
          <div className='flex justify-center mb-10'>
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className='w-14 h-14 glass-btn rounded-2xl flex items-center justify-center cursor-pointer'
              href='mailto:contact@benjampo.ch'
            >
              <EnvelopeIcon className='w-5 h-5 text-[#1a1a2e]' />
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
                  className='opacity-40 hover:opacity-70 transition-opacity duration-300'
                >
                  <Image alt={social.label} src={social.icon} width={18} height={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom line */}
          <div className='mt-10 pt-6 border-t border-[#1a1a2e]/[0.06]'>
            <p className='text-center text-[10px] text-[#1a1a2e]/30 tracking-[0.15em] uppercase'>
              &copy; 2025 Benjamin Porchet &mdash; Designed & built by hand
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
