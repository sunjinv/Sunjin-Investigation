import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image / Video Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2076&auto=format&fit=crop"
          alt="Cinematic background"
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-charcoal/20 to-brand-charcoal" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="space-y-4"
        >
          <h2 className="text-[10vw] lg:text-7xl font-serif tracking-[0.2em] lg:tracking-[0.4em] font-light leading-tight break-keep overflow-wrap-anywhere">
            SURPASS THE SURFACE.
          </h2>
          <p className="text-xs lg:text-lg font-sans tracking-[0.1em] lg:tracking-[0.2em] font-light opacity-80 max-w-2xl mx-auto break-keep px-4">
            드러난 현상 이면의 위기, 견고한 자산으로 전환합니다.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.4em] font-light opacity-50">SCROLL</span>
          <div className="w-[1px] h-12 bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
