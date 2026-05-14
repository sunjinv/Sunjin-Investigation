import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const expertises = [
  {
    title: "CORPORATE INVESTIGATION",
    subtitle: "기업 수사",
    description: "산업 스파이, 횡령, 배임 조사 및 기업 리스크 관리",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    className: "col-span-12 md:col-span-8 h-[400px] md:h-[600px]",
  },
  {
    title: "DIGITAL FORENSICS",
    subtitle: "디지털 포렌식",
    description: "모바일/PC 데이터 복구, 디지털 증거 분석 및 추적",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 md:col-span-4 h-[400px] md:h-[600px]",
  },
  {
    title: "PRIVATE INVESTIGATOR",
    subtitle: "개인·가정 조사",
    description: "신원 파악, 민·형사 소송 증거 수집 및 가계 보안",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 md:col-span-4 h-[400px]",
  },
  {
    title: "VIP RISK MANAGEMENT",
    subtitle: "VIP 위기 관리",
    description: "평판 관리, 수행 조사 및 고도화된 개인 경호 솔루션",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 md:col-span-8 h-[400px]",
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="bg-brand-charcoal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-4">
          {expertises.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative group overflow-hidden cursor-pointer",
                item.className
              )}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h4 className="text-brand-gold text-[10px] tracking-[0.4em] font-medium mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.subtitle}
                </h4>
                <h3 className="text-xl md:text-3xl font-serif tracking-widest text-white mb-2 break-keep">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 break-keep">
                  {item.description}
                </p>
                <div className="w-0 group-hover:w-16 h-[1px] bg-brand-gold mt-6 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
