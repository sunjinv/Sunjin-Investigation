import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const expertises = [
  {
    title: "이혼·가사 조사",
    subtitle: "DIVORCE & FAMILY",
    description: "결정적 사실로 가사 분쟁의 주도권을 장악합니다.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 lg:col-span-8 h-[400px] lg:h-[600px]",
    href: "/business/divorce"
  },
  {
    title: "소송·증거 조사",
    subtitle: "LITIGATION & EVIDENCE",
    description: "법률적 확신을 완성하는 사실 규명",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2071&auto=format&fit=crop",
    className: "col-span-12 lg:col-span-4 h-[400px] lg:h-[600px]",
    href: "/business/litigation"
  },
  {
    title: "TSCM 및 포렌식",
    subtitle: "DIGITAL & TSCM",
    description: "기술적 사각지대를 제거하는 보안 인프라",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 lg:col-span-4 h-[400px] lg:h-[450px]",
    href: "/business/forensics"
  },
  {
    title: "실종·소재 파악",
    subtitle: "MISSING PERSONS",
    description: "입체적 정보망으로 은닉된 소재 규명",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop",
    className: "col-span-12 lg:col-span-4 h-[400px] lg:h-[450px]",
    href: "/business/missing"
  },
  {
    title: "기업 리스크·보안",
    subtitle: "CORPORATE RISK",
    description: "기업의 가치를 수호하는 리스크 매니지먼트",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-12 lg:col-span-4 h-[400px] lg:h-[450px]",
    href: "/business/corporate"
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="bg-brand-charcoal py-24 lg:py-48">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-0 lg:px-6">
        <div className="grid grid-cols-12 gap-0 lg:gap-1">
          {expertises.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className={cn(
                "block",
                item.className
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group overflow-hidden cursor-pointer w-full h-full"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-white/40 text-[10px] lg:text-xs tracking-[0.6em] font-bold uppercase whitespace-nowrap">
                      {item.subtitle}
                    </span>
                    <div className="h-[1px] w-full bg-white/10" />
                  </div>
                  <h3 className="text-xl lg:text-4xl font-sans font-bold tracking-widest text-white mb-3 break-keep transition-transform duration-700 group-hover:translate-x-2">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-base text-white/60 max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 break-keep leading-relaxed">
                    {item.description}
                  </p>
                  <div className="w-0 group-hover:w-20 h-[1px] bg-brand-gold mt-8 transition-all duration-700" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
