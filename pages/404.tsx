import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import Oops from './../assets/icons/oops.png';

function Custom404() {
  return (
    <section className='min-h-[80vh] flex items-center justify-center'>
      <div className='text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateZ: -10 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className='flex justify-center mb-8'
        >
          <div className='glass-strong p-8 rounded-[32px] inline-block'>
            <Image alt='404' src={Oops} width={140} height={140} />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='text-7xl font-bold mb-4'
        >
          404
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className='text-black/30 text-sm mb-10'
        >
          This page doesn't exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href='/'>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-black text-white text-sm font-medium px-8 py-4 rounded-full inline-block cursor-pointer'
            >
              Go home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Custom404;
