import React from 'react';
import Image from 'next/image';
import Oops from './../assets/icons/oops.png';
import Link from 'next/link';

function Custom404() {
  return (
    <section className='min-h-screen flex justify-center'>
      <div className='mt-48'>
        <div className='flex flex-shrink-0 justify-center'>
          <Link href='/' className='inline-flex'>
            <div>
              <Image alt={'404 face'} src={Oops} width={224} height={224} />
              <span className='sr-only'>Your Company</span>
            </div>
          </Link>
        </div>
        <div className='py-8'>
          <div className='text-center'>
            <p className='text-base font-semibold text-blue-400'>404</p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Page not found.
            </h1>
            <p className='mt-2 text-base text-gray-500'>
              Sorry, but what you are looking for is gone.
            </p>
            <div className='mt-6'>
              <button className='text-base font-medium text-blue-400'>
                <Link href={'/'}>Go back home</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Custom404;
