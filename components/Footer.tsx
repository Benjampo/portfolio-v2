import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import MenuItems from '../data/Menu';
import Socials from '../data/Socials';

function Footer() {
  return (
    <footer className='relative pt-20 pb-12 px-6'>
      <div className='max-w-[1400px] mx-auto'>
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

        <nav>
          <ul className='flex items-center justify-center gap-8'>
            {MenuItems.map(item => (
              <li key={item.label}>
                <Link href={item.url}>
                  <span className='text-xs uppercase tracking-widest text-black/30 hover:text-black transition-colors duration-300 cursor-pointer'>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='mt-8'>
          <ul className='flex justify-center gap-5'>
            {Socials.map((social, index) => (
              <motion.li
                whileHover={{ scale: 1.2, y: -3 }}
                key={index}
              >
                <a href={social.url} target='_blank' rel='noreferrer'>
                  <Image alt={social.label} src={social.icon} width={20} />
                </a>
              </motion.li>
            ))}
          </ul>
          <p className='text-center mt-8 text-[11px] text-black/40 tracking-wide'>
            2025 Benjamin Porchet
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
