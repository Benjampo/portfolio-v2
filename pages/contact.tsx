import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from "next/legacy/image";
import { useRef, useState } from 'react';
import Socials from './../data/Socials';

import Head from 'next/head';
import success from './../assets/icons/success.png';

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingLabel({ children, active }: { children: string; active: boolean }) {
  return (
    <motion.span
      className='absolute left-0 pointer-events-none origin-left'
      animate={{
        y: active ? -28 : 0,
        scale: active ? 0.75 : 1,
        opacity: active ? 1 : 0.35,
      }}
      transition={{ duration: 0.35, ease }}
      style={{
        fontSize: '0.95rem',
        fontWeight: 500,
        letterSpacing: '0.03em',
        color: '#1a1a2e',
      }}
    >
      {children}
    </motion.span>
  );
}

function AnimatedLine({ active }: { active: boolean }) {
  return (
    <motion.div
      className='absolute bottom-0 left-0 h-[2px]'
      initial={{ scaleX: 0 }}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease }}
      style={{
        transformOrigin: 'left',
        width: '100%',
        background: 'linear-gradient(90deg, #1a1a2e, rgba(100, 160, 240, 0.6))',
      }}
    />
  );
}

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  name,
  isTextarea = false,
  delay = 0,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: any) => void;
  name: string;
  isTextarea?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease }}
      className='relative pt-6 mb-2'
    >
      <FloatingLabel active={active}>{label}</FloatingLabel>
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className='w-full bg-transparent border-none outline-none text-[#1a1a2e] text-[0.95rem] pb-3 resize-none'
        style={{ minHeight: isTextarea ? '100px' : undefined }}
        rows={isTextarea ? 4 : undefined}
      />
      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1a2e]/[0.06]' />
      <AnimatedLine active={active} />
    </motion.div>
  );
}

function GlassFormCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className='perspective-container'>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease }}
        className='glass-form p-8 md:p-12'
      >
        {children}
      </motion.div>
    </div>
  );
}

function Contact() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [formLoadTime] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState('Send message');
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
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let isValidForm = handleValidation();
    if (isValidForm) {
      setButtonText('Sending...');
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
        setButtonText('Send message');
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText('Send message');
    }
  };

  return (
    <motion.section
      className='mt-20 md:mt-28'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Benjamin Porchet | Contact</title>
      </Head>

      {/* ── Editorial Split Layout ── */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start'>
        {/* Left — Typography Block */}
        <div className='md:col-span-5 md:sticky md:top-32'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='mb-6'
          >
            <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1a1a2e]/40'>
              Get in touch
            </span>
          </motion.div>

          <div className='overflow-hidden'>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease }}
              className='font-bold text-6xl md:text-[5.5rem] leading-[0.9] tracking-tight'
            >
              Let&apos;s
            </motion.h1>
          </div>
          <div className='overflow-hidden'>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className='font-bold text-6xl md:text-[5.5rem] leading-[0.9] tracking-tight'
            >
              work
            </motion.h1>
          </div>
          <div className='overflow-hidden pb-3'>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease }}
              className='font-bold text-6xl md:text-[5.5rem] leading-[0.9] tracking-tight text-[#1a1a2e]/20'
            >
              together.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease }}
            className='mt-10 text-[#1a1a2e]/45 text-[0.95rem] leading-relaxed max-w-xs'
          >
            Have a project in mind, a question, or just want to say hello? I&apos;d love to hear from you.
          </motion.p>

          {/* ── Direct contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
            className='mt-10'
          >
            <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a2e]/25 block mb-4'>
              Or reach out directly
            </span>
            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
              className='text-[#1a1a2e]/60 hover:text-[#1a1a2e] text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 cursor-pointer'
              href='mailto:contact@benjampo.ch'
            >
              contact@benjampo.ch
              <ArrowUpRightIcon className='h-3.5 w-3.5' />
            </motion.a>

            <ul className='flex gap-5 mt-6'>
              {Socials.map((social, i) => (
                <motion.li
                  key={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5, ease }}
                >
                  <motion.a
                    href={social.url}
                    target='_blank'
                    rel='noreferrer'
                    whileHover={{ y: -3 }}
                    className='opacity-30 hover:opacity-100 transition-opacity duration-300 block invert'
                  >
                    <Image src={social.icon} alt={social.label} height={18} width={18} />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right — Form Card */}
        <div className='md:col-span-7'>
          {showSuccessMessage ? (
            <GlassFormCard>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center py-16 md:py-24'
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.15 }}
                  className='inline-block mb-8'
                >
                  <Image src={success} width={80} height={80} alt='Success' />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease }}
                  className='font-bold text-2xl tracking-tight'
                >
                  Message sent
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className='text-[#1a1a2e]/35 text-sm mt-3'
                >
                  Thanks! I&apos;ll get back to you soon.
                </motion.p>
              </motion.div>
            </GlassFormCard>
          ) : (
            <GlassFormCard>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                  <FormField
                    label='Name'
                    name='fullname'
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    delay={0.4}
                  />
                  <FormField
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    delay={0.5}
                  />
                </div>

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

                <FormField
                  label='Subject'
                  name='subject'
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  delay={0.6}
                />
                <FormField
                  label='Message'
                  name='message'
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  isTextarea
                  delay={0.7}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.6, ease }}
                  className='flex items-center justify-between mt-6'
                >
                  <div>
                    {showFailureMessage && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='text-[#1a1a2e]/40 text-xs'
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                    type='submit'
                    className='group glass-btn text-[#1a1a2e] text-sm font-medium px-7 py-3.5 rounded-full flex items-center gap-2.5 cursor-pointer'
                  >
                    {buttonText}
                  </motion.button>
                </motion.div>
              </form>
            </GlassFormCard>
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className='h-24' />
    </motion.section>
  );
}

export default Contact;
