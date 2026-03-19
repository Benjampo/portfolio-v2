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
      className='mt-24 max-w-xl mx-auto'
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
        className='font-bold text-7xl md:text-9xl text-center mb-6 tracking-tight'
      >
        Contact
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className='text-center text-black/25 text-sm mb-16'
      >
        Have a project in mind or just want to say hello?
      </motion.p>

      {showSuccessMessage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className='text-center py-20'
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className='inline-block'
          >
            <Image src={success} width={100} height={100} alt='Success' />
          </motion.div>
          <h2 className='font-bold text-xl mt-8'>Thanks for your message!</h2>
          <p className='text-black/30 text-sm mt-2'>I will answer you as soon as I can</p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className='flex flex-col'
        >
          <label className='text-[11px] font-semibold uppercase tracking-[0.15em] text-black/20 mt-10'>Name</label>
          <input
            type='text'
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            name='fullname'
            className='clean-input'
            placeholder='Your name'
          />

          <label className='text-[11px] font-semibold uppercase tracking-[0.15em] text-black/20 mt-10'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='clean-input'
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

          <label className='text-[11px] font-semibold uppercase tracking-[0.15em] text-black/20 mt-10'>Subject</label>
          <input
            type='text'
            name='subject'
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className='clean-input'
            placeholder='What is this about?'
          />

          <label className='text-[11px] font-semibold uppercase tracking-[0.15em] text-black/20 mt-10'>Message</label>
          <textarea
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className='clean-input min-h-[120px] resize-none'
            placeholder='Tell me more...'
          />

          <div className='flex items-center justify-end mt-12'>
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

      {/* ── Divider ── */}
      <div className='w-12 h-[1px] bg-black/[0.06] mx-auto my-16' />

      {/* ── Alt contact ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className='text-center mb-8'
      >
        <motion.a
          whileHover={{ scale: 1.02 }}
          className='text-xl md:text-2xl font-light text-black/20 hover:text-black transition-colors duration-500 cursor-pointer'
          href='mailto:contact@benjampo.ch'
        >
          contact@benjampo.ch
        </motion.a>

        <ul className='flex justify-center gap-6 mt-8'>
          {Socials.map(social => (
            <motion.li key={social.label} whileHover={{ scale: 1.2, y: -3 }}>
              <a href={social.url} target='_blank' rel='noreferrer' className='opacity-20 hover:opacity-100 transition-opacity duration-300'>
                <Image src={social.icon} alt={social.label} height={22} width={22} />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
