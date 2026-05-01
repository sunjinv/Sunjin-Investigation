import { motion } from 'motion/react';
import { Mail, Calendar } from 'lucide-react';

export default function ReservationSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section id="reservation" className="bg-brand-charcoal py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video md:aspect-square overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
            alt="Office"
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-8"
        >
          <div className="space-y-4">
            <h4 className="text-brand-gold text-xs tracking-[0.3em] font-semibold">PRIVATE CONSULTATION</h4>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
              당신의 가장 중요한 순간,<br />전문가와 직접 상의하십시오.
            </h2>
          </div>
          
          <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-lg">
            모든 상담은 철저한 암호화 기술로 보호됩니다. 
            사실 확인부터 전략 수립까지, 선진 민간수사 그룹이 당신의 권리를 지켜드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onOpenBooking}
              className="flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold/90 text-black px-8 py-4 rounded-none transition-all duration-300 font-medium tracking-widest text-xs"
            >
              <Calendar className="w-4 h-4" />
              DATE & TIME RESERVATION
            </button>
            <a 
              href="mailto:contact@sunjin.v"
              className="flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 px-8 py-4 rounded-none transition-all duration-300 font-medium tracking-widest text-xs"
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
