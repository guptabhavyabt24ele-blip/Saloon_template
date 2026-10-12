'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type HomeHeroMotionProps = {
  eyebrow: ReactNode;
  headline: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  proof: ReactNode;
  visual: ReactNode;
};

export function HomeHeroMotion({
  eyebrow,
  headline,
  description,
  actions,
  proof,
  visual
}: HomeHeroMotionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 12 };
  const visible = { opacity: 1, y: 0 };
  const transition = (delay: number) => ({
    duration: 0.65,
    delay,
    ease: [0.16, 1, 0.3, 1] as const
  });

  return (
    <section className="relative overflow-hidden border-b border-warm-stone bg-bone">
      <div className="container-shell grid items-center gap-12 py-14 md:grid-cols-[0.82fr_1.18fr] md:py-20 lg:gap-20 lg:py-24">
        <div className="max-w-xl">
          <motion.div initial={initial} animate={visible} transition={transition(0)}>
            {eyebrow}
          </motion.div>
          <motion.div initial={initial} animate={visible} transition={transition(0.1)}>
            {headline}
          </motion.div>
          <motion.div initial={initial} animate={visible} transition={transition(0.2)}>
            {description}
          </motion.div>
          <motion.div initial={initial} animate={visible} transition={transition(0.3)}>
            {actions}
          </motion.div>
          <motion.div initial={initial} animate={visible} transition={transition(0.4)}>
            {proof}
          </motion.div>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition(0.15)}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
