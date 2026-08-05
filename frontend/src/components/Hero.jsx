import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1781275370365-d97490e563d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxhcHBsZSUyMGRldmljZXMlMjBtaW5pbWFsaXN0JTIwc2V0dXB8ZW58MHx8fHwxNzg1ODE4NTY5fDA&ixlib=rb-4.1.0&q=85";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Line = ({ children, i, className }) => (
  <span className="block overflow-hidden">
    <motion.span
      className={`block ${className || ""}`}
      variants={line}
      custom={i}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero({ onCta }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 pt-28 pb-16 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Parallax backdrop image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-istore-alt via-istore-bg to-istore-bg" />
        <img
          src={HERO_IMG}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute right-0 bottom-0 w-[70%] max-w-3xl object-contain opacity-[0.14] blur-[1px]"
        />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-istore-blue mb-6"
          data-testid="hero-eyebrow"
        >
          Ofertas exclusivas por tempo limitado
        </motion.span>

        <h1
          className="font-display font-bold tracking-tighter text-istore-ink text-4xl sm:text-6xl lg:text-7xl leading-[0.95]"
          data-testid="hero-title"
        >
          <Line i={0}>Os melhores iPhones</Line>
          <Line i={1}>
            com os <span className="text-istore-blue">melhores preços</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-7 text-base md:text-lg text-istore-muted max-w-xl mx-auto"
          data-testid="hero-subtitle"
        >
          Do iPhone 12 ao novíssimo iPhone 17. Originais, lacrados e com garantia
          — em até 12x sem juros.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onCta}
            className="group bg-istore-blue text-white rounded-full px-8 py-4 text-sm font-medium hover:bg-[#0077ED] transition-all duration-300 hover:scale-[1.03] active:scale-95"
            data-testid="hero-cta-button"
          >
            Ver ofertas
          </button>
          <a
            href="#iphones"
            className="rounded-full px-8 py-4 text-sm font-medium text-istore-ink border border-istore-border hover:bg-istore-alt transition-colors duration-300"
            data-testid="hero-secondary-button"
          >
            Explorar modelos
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-istore-muted text-[11px] tracking-widest uppercase"
      >
        <span className="animate-pulse">Role para descobrir</span>
      </motion.div>
    </section>
  );
}
