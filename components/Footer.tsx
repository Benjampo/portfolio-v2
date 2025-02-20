import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MenuItems from '../data/Menu';
import Socials from '../data/Socials';
import mail from './../assets/images/mail.png';
function Footer() {
    return (
        <footer className="bg-white h-100 relative bottom-0 pt-12 pb-24 ">
            <div className="md:max-w-screen-2xl md:mx-auto">
                <motion.a
                    whileHover={{ borderRadius: '50%' }}
                    className="absolute transition-all ml-auto mr-auto top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 bg-black h-16 w-16 flex items-center justify-center rounded rounded-3xl hover:rounded-full hove:ease-in"
                    href="mailto:contact@benjampo.ch">
                    <Image width={'24px'} height={'24px'} alt="Mail icon" src={mail} />
                </motion.a>
                <nav>
                    <ul className="h-full mt-5 flex flex-row items-center justify-center gap-5 ">
                        {MenuItems.map((item) => (
                            <li key={item.label} className="">
                                <Link href={item.url}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <ul className="flex flex-row justify-center gap-5 ">
                        {Socials.map((social, index) => (
                            <motion.li
                                className="cursor-pointer"
                                whileHover={{ scale: 1.2 }}
                                key={index}>
                                <a href={social.url} target="_blank" rel="noreferrer">
                                    <Image alt={social.label} src={social.icon} width={24} />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="w-full text-center text-gray-300 md:flex md:flex-row md:justify-between">
                        <span className="block">designed and coded with ❤️ by me</span>
                        <span className="block">© 2025 Benjamin Porchet</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
