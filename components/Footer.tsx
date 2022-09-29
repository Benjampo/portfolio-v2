import React from 'react';
import mail from './../assets/images/mail.png'
import Image from 'next/image'
function Footer() {
    const socials = [
        {
            label: 'Github',
            url: "https://github.com/Benjampo",
            icon: ''
        },
        {
            label: 'LinkedIn',
            url: "https://www.linkedin.com/in/benjamin-porchet-701ba1148/",
            icon: ''
        },

    ];
    return (
        <footer className='bg-white h-100 relative bottom-0 pt-12 pb-12'>
            <a className='absolute ml-auto mr-auto top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 bg-black h-16 w-16 flex items-center justify-center rounded rounded-2xl' href='mailto:contact@benjampo.ch'>
                <Image width={'24px'} height={'24px'} src={mail} />
            </a>
            <div>
                <ul className='flex flex-row gap-5 w-full justify-center'>
                    {socials.map((social) => (
                        <li key={social.label}>
                            <a target='_blank ' href={social.url}>
                                {social.label}
                            </a>
                        </li>
                    ))}

                </ul>
                <div className='w-full text-center text-gray-300'>
                    <span className='block'>designed and coded with ❤️ by me</span>
                    <span className='block'>© 2022 Benjamin Porchet</span>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
