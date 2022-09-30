import React from 'react';
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Socials from './../data/Socials';
import Image from 'next/image';
import { motion } from 'framer-motion';
function Contact() {
    // States for contact form fields
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState({});

    const [buttonText, setButtonText] = useState('Send');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const handleValidation = () => {
        let tempErrors: any = {};
        let isValid = true;

        if (fullname.length <= 0) {
            tempErrors['fullname'] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors['email'] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors['subject'] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors['message'] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log('errors', errors);
        return isValid;
    };

    //   Handling form submit

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText('Sending');
            const res = await fetch('/api/sendgrid', {
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: subject,
                    message: message
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
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
        console.log(fullname, email, subject, message);
    };

    return (
        <section>
            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                transition={{ delay: 0.1 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-6xl text-center my-6 ">
                Contact
            </motion.h1>
            <motion.form
                initial={{ opacity: 0, y: 25 }}
                transition={{ delay: 0.2 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="rounded-2xl my-shadow flex flex-col px-8 py-8 bg-white dark:bg-blue-500">
                <h2 className="text-2xl font-normal dark:text-gray-50">Drop a line</h2>

                <label
                    htmlFor="fullname"
                    className="text-gray-500 font-normal mt-8 dark:text-gray-50 ">
                    Full name<span className="text-blue-300 dark:text-gray-50">*</span>
                </label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => {
                        setFullname(e.target.value);
                    }}
                    name="fullname"
                    className="bg-gray-50  py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-400 font-light text-gray-500"
                />

                <label htmlFor="email" className="text-gray-500 font-normal mt-4 dark:text-gray-50">
                    E-mail<span className="text-blue-300">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    className="bg-gray-50  py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-400 font-light text-gray-500"
                />

                <label
                    htmlFor="subject"
                    className="text-gray-500 font-normal mt-4 dark:text-gray-50">
                    Subject<span className="text-blue-300">*</span>
                </label>
                <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    className="bg-gray-50 py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-400 font-light text-gray-500"
                />

                <label
                    htmlFor="message"
                    className="text-gray-500 font-normal mt-4 dark:text-gray-50">
                    Message<span className="text-blue-300">*</span>
                </label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    className="bg-gray-50 py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-blue-400 font-light text-gray-500"></textarea>

                <div className="flex flex-row items-center justify-end">
                    <motion.button
                        whileTap={{ scale: 1.15 }}
                        type="submit"
                        className="group px-4 mt-8 py-4 bg-black text-gray-50 font-bold rounded-full  flex flex-row items-center">
                        <PaperAirplaneIcon className="h-6 group-hover:translate-x-1 ease-out transition duration-500 ease-in-out" />
                    </motion.button>
                </div>
            </motion.form>
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                transition={{ delay: 0.3 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex mt-5 flex-col md:flex-row gap-5">
                <div className="group text-center w-full bg-white rounded-xl  p-4 cursor-pointer my-shadow">
                    <a
                        className="text-center text-3xl text-gray-400 group-hover:text-blue-400"
                        href=" mailto:contact@benjampo.ch">
                        contact@benjampo.ch
                    </a>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    transition={{ delay: 0.4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group w-full bg-white rounded-xl  p-4 cursor-pointer my-shadow">
                    <ul className="flex justify-center gap-5">
                        {Socials.map((social) => (
                            <li key={social.label}>
                                <Image src={social.icon} height={30} width={30} />
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Contact;
