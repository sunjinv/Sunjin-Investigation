import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export interface SectionContent {
  title: string;
  subtitle: string;
  description: string[];
  image?: string;
  gridItems?: { title: string; text: string; image?: string }[];
}

export default function SubPageLayout({ content }: { content: SectionContent }) {
  return (
    <div className="pb-20 bg-brand-charcoal min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
            alt={content.title}
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/40 via-transparent to-brand-charcoal" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl space-y-6"
        >
          <span className="text-brand-gold text-[10px] md:text-sm tracking-[0.6em] font-semibold uppercase block">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif tracking-tight leading-tight">
            {content.title}
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold/50" />
        </motion.div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-24 px-6 md:px-20 bg-white text-brand-charcoal">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif leading-snug">
               전문성과 신뢰의 가치가<br />
               완벽한 결과를 증명합니다.
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-sm md:text-base leading-relaxed opacity-80 font-light"
          >
            {content.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      {content.gridItems && (
        <section className="py-24 px-6 md:px-20 bg-brand-charcoal">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {content.gridItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 space-y-6 hover:border-brand-gold transition-colors duration-500"
                >
                  <h4 className="text-brand-gold text-[10px] tracking-[0.4em] font-bold uppercase">
                    Feature {idx + 1}
                  </h4>
                  <h3 className="text-xl font-serif tracking-wide">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full Width Visual Section */}
      <section className="h-[50vh] relative grayscale hover:grayscale-0 transition-all duration-1000">
         <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
            alt="Atmospheric" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-brand-charcoal/20" />
      </section>
    </div>
  );
}
