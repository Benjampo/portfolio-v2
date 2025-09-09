import { motion } from 'framer-motion';
function Card(props: any) {
  const item = {
    hidden: {
      opacity: 0,
      y: 25,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },

    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };
  return (
    <motion.div
      variants={item}
      className={`w-full  bg-white rounded-xl  p-4 my-shadow ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
}

export default Card;
