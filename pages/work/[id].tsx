import React, { useEffect } from 'react';
import Projects from '../../data/projects';
import { useRouter } from 'next/router';
import Image from 'next/image';

export function Project({ data }) {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div>
            <h2>{data[0].subtitle}</h2>
            <h1>{data[0].title}</h1>
            <a href={data[0].url}>Access website</a>
            <div className=" relative w-full h-[30rem] rounded-xl my-shadow overflow-hidden">
                <figure className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer w-full h-full">
                    <Image src={data[0].coverSrc} alt={data[0].title} layout={'fill'} />
                </figure>
            </div>

            <div>
                <h3>The context</h3>
                <p>{data[0].context}</p>
            </div>
            <div>
                <h3>What I did</h3>
                <ul>
                    {data[0].tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>
            <div>
                <Image src={data[0].secSrc} />
                <Image src={data[0].thirdSrc} />
            </div>

            <div>
                <h3>Tech overview</h3>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}
export async function getStaticPaths() {
    const paths = Projects.map((item) => ({
        params: { id: item.id }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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
