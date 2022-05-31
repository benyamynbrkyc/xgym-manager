import { motion } from 'framer-motion';
import { NextRouter } from 'next/router';

export default function TransitionProvider({
  children,
  router,
}: {
  children: React.ReactNode;
  router: NextRouter;
}) {
  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
