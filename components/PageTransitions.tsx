import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
