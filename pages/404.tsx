import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useTranslation } from '../lib/i18n';
import Oops from './../assets/icons/oops.png';

function Custom404() {
  const { t } = useTranslation();

  return (
    <section className='min-h-[80vh] flex items-center justify-center'>
      <div className='text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateZ: -10 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className='flex justify-center mb-8'
        >
          <Image alt='404' src={Oops} width={120} height={120} />
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
          className='text-foreground/50 text-sm mb-10'
        >
          {t('404.text')}
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
              className='glass-btn text-foreground text-sm font-medium px-8 py-4 rounded-full inline-block cursor-pointer'
            >
              {t('404.goHome')}
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Custom404;
