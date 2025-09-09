import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
type CardProps = {
    span: string;
    row: string;
    project: {
        id: string;
        coverSrc: string;
        title: string;
        subtitle: string;
    };
};

function ProjectCard({ project, span, row }: CardProps) {

    return (
        <motion.div whileHover={{ scale: 1.02 }}>
            <Link key={project.id} href={`/work/${project.id}`}>
                <article className="border-2 border-blue-200 relative w-full h-[15rem] md:h-[30rem] rounded-xl my-shadow overflow-hidden my-shadow">
                    <figure className="h-64 md:h-96">
                        <Image
                            layout={'fill'}
                            objectFit={'cover'}
                            src={project.coverSrc}
                            alt={`${project.title} main image`}
                            placeholder="blur"
                            priority={true}
                        />
                    </figure>
                    <div className="py-3">
                        <h1 className="font-medium text-base">{project.title}</h1>
                        <span className="text-gray-400 text-base">{project.subtitle}</span>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}

export default ProjectCard;
