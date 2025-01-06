import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <motion.div
      key={router.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
