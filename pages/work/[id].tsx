import React, { useEffect } from 'react';
import Projects from '../../data/projects';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Router from 'next/router';
import { motion } from 'framer-motion';

export function Project({ data }: any) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-4">
            <div className="mb-4 relative">
                <button
                    className="absolute w-7 top-0 left-0 cursor-pointer -translate-x-[200%]"
                    onClick={() => Router.back()}>
                    <ArrowLeftIcon className="text-gray-400" />
                </button>
                <h2 className="text-gray-400 text-xl font-medium">{data[0].subtitle}</h2>
                <h1 className="font-bold mb-2 text-4xl">{data[0].title}</h1>
                <ul className="flex flex-wrap gap-1">
                    {data[0].tech.map((tech: string, index: number) => (
                        <li
                            className="border rounded-full text-gray-300 px-3 w-fit pointer-events-none "
                            key={index}>
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className=" border border-2 border-blue-200 col-span-4  relative w-full h-[15rem] md:h-[40rem] rounded-xl my-shadow overflow-hidden">
                    <figure className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer w-full h-full">
                        <Image
                            src={data[0].coverSrc}
                            alt={`Main image of ${data[0].title}`}
                            objectFit={'cover'}
                            layout={'fill'}
                        />
                    </figure>
                </div>
                <div className="border border-2 border-blue-200 col-span-4 lg:col-span-2  relative w-full h-[15rem] md:h-[30rem] rounded-xl my-shadow overflow-hidden">
                    <figure className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer w-full h-full">
                        <Image
                            layout={'fill'}
                            src={data[0].secSrc}
                            objectFit={'cover'}
                            alt={`Second media of ${data[0].title}`}
                        />
                    </figure>
                </div>
                <div className=" border border-2 border-blue-200 col-span-4 lg:col-span-2 relative w-full h-[15rem] md:h-[30rem] rounded-xl my-shadow overflow-hidden">
                    <figure className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer w-full h-full">
                        <Image
                            priority={true}
                            layout={'fill'}
                            src={data[0].thirdSrc}
                            objectFit={'cover'}
                            alt={`Third media of ${data[0].title}`}
                        />
                    </figure>
                </div>
            </div>

            <div className="md:flex my-5 ">
                <div className="my-4  pr-7 md:w-1/2">
                    <h3 className="font-medium text-gray-400 text-xl  mb-3">The context</h3>
                    <p className="font-normal text-xl">{data[0].context}</p>
                </div>
                <div className="my-4  md:w-1/2">
                    <h3 className="font-medium text-gray-400 text-xl mb-3">What I did</h3>
                    <ul className="list-disc">
                        {data[0].tasks.map((task: string, index: number) => (
                            <li className="ml-6 font-normal text-xl" key={index}>
                                {task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex w-full  items-center justify-center">
                {data[0].url && (
                    <a
                        className="text-gray-400 my-12 md:mx-24  text-2xl underline underline-offset-4"
                        href={data[0].url}
                        target="_blank"
                        rel="noreferrer">
                        Access website
                    </a>
                )}
                {data[0].info && (
                    <span className="text-gray-300 mt-24 mb-24 text-2xl ">{data[0].info}</span>
                )}
            </div>
        </motion.section>
    );
}
export async function getStaticPaths() {
    const paths = Projects.map((item) => ({
        params: { id: item.id }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
    const id = params.id;
    const data = Projects.filter((item) => {
        if (item.id === id) {
            return item;
        }
    });
    // Pass post data to the page via props
    return { props: { data } };
}
export default Project;
