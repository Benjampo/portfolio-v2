import React from 'react';
import mail from './../assets/images/mail.png'
import Image from 'next/image'
function Footer() {
    return (
        <footer className='bg-white h-100 relative bottom-0'>
            <a className='absolute ml-auto mr-auto top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 bg-black h-16 w-16 block rounded rounded-12' href='mailto:contact@benjampo.ch'>

                    <Image className='w-3' src={mail} />

            </a>
            <div>
                <ul className='flex flex-row gap-5 w-full justify-center'>
                    <li>
                        Github
                    </li>
                    <li>
                        LinkedIn
                    </li>
                    <li>
                        Github
                    </li>
                </ul>
                <div>
                    <span> designed and coded with ❤️ by me</span>
                    <span>© 2022 Benjamin Porchet</span>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
