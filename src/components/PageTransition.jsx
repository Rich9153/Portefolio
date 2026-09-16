import { motion, useReducedMotion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

const pageTransition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.38,
};

function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "initial"}
      animate={reduceMotion ? { opacity: 1 } : "animate"}
      exit={reduceMotion ? { opacity: 1 } : "exit"}
      variants={pageVariants}
      transition={reduceMotion ? { duration: 0 } : pageTransition}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
