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
            <div className="w-full md:w-5/6 h-96 rounded-xl  p-4 my-shadow">
                <Image src={data[0].coverSrc} />
            </div>

            <div>
                <h3>The context</h3>
                <p></p>
            </div>
            <div>
                <h3>What I did</h3>
                <ul>
                    <li></li>
                </ul>
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
