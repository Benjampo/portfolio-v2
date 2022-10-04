import React from 'react';
import { motion } from 'framer-motion';
function Card(props: any) {
    const item = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0 }
    };
    return (
        <motion.div
            variants={item}
            className={`w-full  bg-white rounded-xl  p-4 my-shadow ${props.className}`}>
            {props.children}
        </motion.div>
    );
}

export default Card;
