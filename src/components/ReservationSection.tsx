import { motion } from 'motion/react';
import { Mail, Calendar } from 'lucide-react';

export default function ReservationSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section id="reservation" className="bg-brand-charcoal py-24 md:py-32 lg:py-52 px-10">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center px-0 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video md:aspect-square overflow-hidden lg:max-w-2xl mx-auto w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
            alt="Office"
            className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-1000"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-10 lg:space-y-16"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-6 mb-4">
              <span className="text-white/40 text-[10px] lg:text-xs tracking-[0.6em] font-bold uppercase whitespace-nowrap">
                PRIVATE CONSULTATION
              </span>
              <div className="h-[1px] w-full bg-white/10" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-4xl font-serif tracking-tight leading-tight lg:leading-[1.2] break-keep text-white">
              귀하의 가장 중요한 순간,<br />전문가와 직접 상의하십시오.
            </h2>
          </div>
          
          <p className="text-sm md:text-lg lg:text-xl text-white/50 leading-relaxed lg:leading-loose max-w-lg lg:max-w-xl break-keep font-light">
            모든 상담은 철저한 보안 원칙으로 보호됩니다.<br />
            사실 확인부터 전략 수립까지,<br />
            선진 민간수사 그룹이 귀하의 권리를 지켜드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-8 lg:pt-10">
            <button 
              onClick={onOpenBooking}
              className="w-full lg:w-80 flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold/90 text-black px-10 py-5 lg:py-6 rounded-none transition-all duration-500 font-medium tracking-widest text-xs lg:text-sm shadow-2xl shadow-brand-gold/20"
            >
              <Calendar className="w-4 h-4" />
              DATE & TIME RESERVATION
            </button>
            <a 
              href="mailto:contact@sunjin.v"
              className="w-full lg:w-80 flex items-center justify-center gap-3 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white px-10 py-5 lg:py-6 rounded-none transition-all duration-500 font-medium tracking-widest text-xs lg:text-sm"
            >
              <Mail className="w-4 h-4" />
              DIRECT INQUIRY
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
