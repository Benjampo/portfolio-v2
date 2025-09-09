import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Projects from '../data/projects';
import benjampo from './../assets/benjampo_gif.gif';
const Home: NextPage = () => {
    return (
        <motion.section
            className="px-0 flex flex-col gap-16">
            <Head>
                <title>Benjamin Porchet | Full-stack Developper</title>
            </Head>
            <section className="w-full h-[64vh] md:h-[64vh] flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Image src={benjampo} priority={true} alt="Benjampo face" />
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 50 }}
      
                    animate={{ opacity: 1, y: 0 }}
                    className="block font-bold text-5xl text-center">
                    Hello
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ delay: 0.1 }}
                    animate={{ opacity: 1, y: 0 }}
                    className=" mt-2 font-medium text-2xl text-center text-gray-400">
                    I’m Benjamin, Full-Stack developper
                </motion.h1>
            </section>
            <section>
                <ul className=" flex flex-col gap-16">
                    {Projects.filter((project, index) => {
                        return index < 4;
                    }).map((project: any, index) => (
                        <li key={index}>
                            <Link href={`/work/${project.id}`}>
                                <article className="group flex flex-col md:flex-row gap-2">
                                    <div className="md:w-1/6">
                                        <motion.h1
                                            initial={{ opacity: 0.5, y: 10 }}
                                            transition={{ delay: 0.1 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            className="text-gray-400 text-base font-normal">
                                            {project.title}
                                        </motion.h1>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0.5, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="border-2 border-blue-200 relative w-full md:w-5/6  h-[15rem] md:h-[40rem] rounded-xl my-shadow overflow-hidden">
                                        <figure className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer w-full h-full">
                                            <Image
                                                layout={'fill'}
                                                objectFit={'cover'}
                                                src={project.coverSrc}
                                                priority={true}
                                                alt={project.title}
                                                placeholder="blur"
                                            />
                                        </figure>
                                    </motion.div>
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </motion.section>
    );
};

export default Home;
