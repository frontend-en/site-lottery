import { FC } from 'react';
import { motion } from 'framer-motion';

const AnimatedPage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -2000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2000 }}
      transition={{ duration: 0.7 }}
      className="grow"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;