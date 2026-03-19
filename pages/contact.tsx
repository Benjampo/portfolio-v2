import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import { useState } from 'react';
import Socials from './../data/Socials';

import Head from 'next/head';
import success from './../assets/icons/success.png';

function Contact() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [formLoadTime] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState('Send');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors: any = {};
    let isValid = true;
    if (fullname.length <= 0) { tempErrors['fullname'] = true; isValid = false; }
    if (email.length <= 0) { tempErrors['email'] = true; isValid = false; }
    if (subject.length <= 0) { tempErrors['subject'] = true; isValid = false; }
    if (message.length <= 0) { tempErrors['message'] = true; isValid = false; }
    setErrors({ ...tempErrors });
    console.log('errors', errors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let isValidForm = handleValidation();
    if (isValidForm) {
      setButtonText('Sending');
      const res = await fetch('/api/sendgrid', {
        body: JSON.stringify({ email, fullname, subject, message, website, formLoadTime }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText('Send');
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText('Send');
    }
  };

  return (
    <motion.section
      className='mt-24 max-w-2xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Benjamin Porchet | Contact</title>
      </Head>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='font-bold text-7xl md:text-9xl text-center mb-12 tracking-tight'
      >
        Contact
      </motion.h1>

      {showSuccessMessage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className='glass flex justify-center items-center h-80 flex-col'
        >
          <motion.figure
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          >
            <Image src={success} width={140} height={140} alt='Success' />
          </motion.figure>
          <h2 className='font-bold text-lg mt-6'>Thanks for your message!</h2>
          <p className='text-black/35 text-sm mt-1'>I will answer you as soon as I can</p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className='glass glass-shimmer flex flex-col p-8 md:p-10'
        >
          <span className='text-[11px] uppercase tracking-[0.2em] text-black/25 font-semibold'>
            Drop a line
          </span>

          <label className='text-xs font-medium text-black/30 mt-8'>Name</label>
          <input
            type='text'
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            name='fullname'
            className='glass-input mt-2'
            placeholder='Your name'
          />

          <label className='text-xs font-medium text-black/30 mt-6'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='glass-input mt-2'
            placeholder='hello@example.com'
          />

          {/* Honeypot */}
          <input
            type='text'
            name='website'
            value={website}
            onChange={e => setWebsite(e.target.value)}
            className='absolute -left-[9999px] opacity-0'
            tabIndex={-1}
            autoComplete='off'
            aria-hidden='true'
          />

          <label className='text-xs font-medium text-black/30 mt-6'>Subject</label>
          <input
            type='text'
            name='subject'
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className='glass-input mt-2'
            placeholder='What is this about?'
          />

          <label className='text-xs font-medium text-black/30 mt-6'>Message</label>
          <textarea
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className='glass-input mt-2 min-h-[140px] resize-none'
            placeholder='Tell me more...'
          />

          <div className='flex items-center justify-end mt-8'>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              type='submit'
              className='bg-black text-white text-sm font-medium px-8 py-4 rounded-full flex items-center gap-2 cursor-pointer'
            >
              {buttonText}
              <PaperAirplaneIcon className='h-4 w-4' />
            </motion.button>
          </div>

          {showFailureMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-black/40 text-xs mt-4 text-right'
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className='flex mt-5 flex-col md:flex-row gap-4'
      >
        <motion.a
          whileHover={{ scale: 1.02 }}
          className='glass text-center w-full p-5 cursor-pointer block'
          href='mailto:contact@benjampo.ch'
        >
          <span className='text-lg md:text-xl font-medium text-black/30 hover:text-black transition-colors duration-300'>
            contact@benjampo.ch
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className='glass w-full p-5 flex items-center justify-center'
        >
          <ul className='flex gap-6'>
            {Socials.map(social => (
              <motion.li key={social.label} whileHover={{ scale: 1.2, y: -3 }}>
                <a href={social.url} target='_blank' rel='noreferrer'>
                  <Image src={social.icon} alt={social.label} height={24} width={24} />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
