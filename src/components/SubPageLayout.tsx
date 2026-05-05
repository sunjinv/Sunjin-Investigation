import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export interface SectionContent {
  title: string;
  subtitle: string;
  sectionTitle?: string;
  description: string[];
  image?: string;
  gridItems?: { title: string; text: string; image?: string }[];
  variant?: 'classic' | 'modern' | 'editorial' | 'technical';
}

export default function SubPageLayout({ content }: { content: SectionContent }) {
  const variant = content.variant || 'classic';
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pb-20 bg-brand-charcoal min-h-screen">
      {/* Hero Section (Remains Consistent as requested) */}
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
          className="relative z-10 max-w-screen-xl space-y-6"
        >
          <span className="text-brand-gold text-[10px] md:text-sm tracking-[0.6em] font-semibold uppercase block">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif tracking-tight leading-tight whitespace-pre-line md:whitespace-pre">
            {content.title}
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold/50" />
        </motion.div>
      </section>

      {/* Main Content Section - Variants */}
      {variant === 'classic' && (
        <section className="py-24 px-6 md:px-20 bg-brand-charcoal text-white">
          <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif leading-snug text-white whitespace-pre-line">
                 {content.sectionTitle || "시대적 요구와\n수사 패러다임의 진화."}
              </h2>
              <div className="w-12 h-[2px] bg-brand-gold" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6 text-sm md:text-base leading-relaxed opacity-80 font-light whitespace-pre-line text-white/80">
              {content.description.map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
          </div>
        </section>
      )}

      {variant === 'modern' && (
        <section className="py-32 px-6 md:px-20 bg-brand-charcoal text-white border-y border-white/5">
          <div className="max-w-4xl mx-auto space-y-32">
            <div className="text-center space-y-32 relative">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                className="text-brand-gold text-3xl md:text-6xl font-serif italic tracking-tighter opacity-40 select-none leading-none"
              >
                {content.sectionTitle || "Mission"}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl font-serif leading-tight tracking-wide text-white/90"
              >
                {content.description[0]}
              </motion.div>
            </div>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="w-full h-[2px] bg-white/20" 
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg font-light leading-relaxed opacity-60 whitespace-pre-line text-center max-w-3xl mx-auto"
            >
              {content.description.slice(1).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {variant === 'editorial' && (
        <section className="py-24 px-6 md:px-20 bg-[#f8f8f8] text-brand-charcoal">
          <div className="max-w-screen-xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row gap-12 items-baseline border-b border-black/5 pb-10">
              <h2 className="text-5xl font-serif italic text-brand-gold">01</h2>
              <div className="text-sm tracking-[0.3em] font-bold opacity-30 uppercase">
                {content.sectionTitle || "Foundational Philosophy"}
              </div>
            </div>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-8 md:col-start-5 space-y-10">
                {content.description.map((para, i) => (
                  <p key={i} className="text-xl md:text-2xl font-serif font-light leading-snug whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid Features Section - Layout varies based on variant */}
      {content.gridItems && (
        <section className={cn(
          "py-32 px-6 md:px-20",
          (variant === 'classic' || variant === 'modern') ? "bg-white" : "bg-brand-charcoal"
        )}>
          <div className="max-w-screen-xl mx-auto">
            {variant === 'classic' ? (
              /* Conditional layout: Brand Story vs Responsibility & Values */
              content.subtitle === 'RESPONSIBILITY & VALUES' ? (
                /* Horizontal Titles Navigation and Content Area */
                <div className="space-y-4 md:space-y-6">
                  {/* Titles Navigation */}
                  <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-16 gap-y-6 border-b border-black/5 pb-10">
                    {content.gridItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                          "relative pb-4 text-lg md:text-xl font-serif text-brand-charcoal transition-all duration-500 hover:text-brand-gold outline-none cursor-pointer",
                          activeTab === idx ? "text-brand-gold" : "opacity-40"
                        )}
                      >
                        {item.title}
                        {activeTab === idx && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Content Area */}
                  <div className="max-w-4xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] border border-black/[0.02]"
                      >
                        <div className="space-y-8 md:space-y-12">
                          <div className="flex items-center gap-6">
                            <div className="h-[1px] w-12 bg-brand-gold/30" />
                          </div>
                          
                          {content.gridItems[activeTab].text.includes('\n\n') ? (
                            <div className="space-y-12">
                               <p className="text-xl md:text-2xl font-serif italic text-brand-charcoal leading-relaxed">
                                  {content.gridItems[activeTab].text.split('\n\n')[0]}
                               </p>
                               <div className="space-y-8">
                                 {content.gridItems[activeTab].text.split('\n\n').slice(1).map((para, pIdx) => (
                                   <p key={pIdx} className="text-sm md:text-base leading-8 md:leading-10 text-brand-charcoal/70 font-light whitespace-pre-line tracking-tight">
                                     {para}
                                   </p>
                                 ))}
                               </div>
                            </div>
                          ) : (
                            <p className="text-sm md:text-base leading-8 md:leading-10 text-brand-charcoal/70 font-light whitespace-pre-line">
                              {content.gridItems[activeTab].text}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Brand Story specific detailed layout (Vertical Stack) */
                <div className="space-y-24">
                  {content.gridItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 1 }}
                      className="flex flex-col items-center space-y-12 group max-w-4xl mx-auto"
                    >
                      <div className="space-y-8 w-full text-center">
                        <div className="flex items-center justify-center gap-6">
                          <div className="h-[1px] w-12 bg-brand-gold/30 group-hover:w-20 group-hover:bg-brand-gold transition-all duration-1000" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif tracking-tight text-brand-charcoal leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-full text-left">
                        <p className="text-xs md:text-sm leading-8 md:leading-9 tracking-tight text-brand-charcoal/70 font-light whitespace-pre-line group-hover:text-brand-charcoal transition-colors duration-700 px-4">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              /* Modern / Standard layout for Company Intro */
              <div className={cn(
                "grid gap-12",
                variant === 'technical' ? "md:grid-cols-2" : "md:grid-cols-3"
              )}>
                {content.gridItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="group relative transition-all duration-700 bg-transparent p-6 md:p-8"
                  >
                    <div className="space-y-10">
                      <div className={cn(
                        "w-full h-[2px] transition-colors duration-700",
                        variant === 'modern' ? "bg-brand-gold/20 group-hover:bg-brand-gold/60" : "bg-white/10 group-hover:bg-white/40"
                      )} />
                      <div className="space-y-6">
                        <h3 className={cn(
                          "text-xl md:text-2xl font-serif tracking-tight leading-tight border-l-4 border-brand-gold/0 group-hover:border-brand-gold/100 pl-0 group-hover:pl-6 transition-all duration-700",
                          variant === 'modern' ? "text-brand-charcoal" : "text-white"
                        )}>
                          {item.title}
                        </h3>
                        <p className={cn(
                          "text-xs md:text-sm leading-relaxed font-light whitespace-pre-line px-0 transition-colors duration-700",
                          variant === 'modern' 
                            ? "text-brand-charcoal/60 group-hover:text-brand-charcoal/90" 
                            : "text-white/60 group-hover:text-white/90"
                        )}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Atmosphere Visual */}
      <section className="h-[60vh] relative overflow-hidden">
         <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Atmospheric" 
            className="w-full h-full object-cover grayscale opacity-50"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal" />
      </section>
    </div>
  );
}

