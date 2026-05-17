import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

export interface SectionContent {
  title: string;
  subtitle: string;
  sectionTitle?: string;
  description: string[];
  image?: string;
  gridItems?: { title: string; text: string; image?: string }[];
  variant?: 'classic' | 'modern' | 'editorial' | 'technical' | 'service' | 'framework' | 'casestudy' | 'contact';
  approach?: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      text: string;
      icon?: string;
    }[];
  };
  operations?: {
    title: string;
    cards: {
      title: string;
      text: string;
      image: string;
    }[];
  };
  frameworkSections?: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      text: string;
    }[];
  }[];
  caseStudySections?: {
    category: string;
    cases: {
      title: string;
      subject: string;
      solution: string;
    }[];
  }[];
}

export default function SubPageLayout({ content, onBooking }: { content: SectionContent; onBooking?: () => void }) {
  const variant = content.variant || 'classic';
  const [activeTab, setActiveTab] = useState(0);
  
  const newDesignTitles = [
    'Divorce & Family',
    'Litigation & Evidence',
    'Digital & TSCM',
    'Missing Persons',
    'Corporate Risk'
  ];
  const isNewDesignPage = newDesignTitles.includes(content.title);
  const isBrandStoryPage = content.subtitle === 'BRAND STORY';
  const isCompanyIntroPage = content.subtitle === 'COMPANY INTRO';
  const isResponsibilityPage = content.subtitle === 'RESPONSIBILITY & VALUES';
  const isCoreCompetencyPage = content.subtitle === 'CORE COMPETENCY';

  const keywordsToBold = [
    '친환경 데이터 오퍼레이션',
    '인권 중심의 정보 보호',
    '무결점 지배구조 및 컴플라이언스',
    '공익적 인텔리전스 지원',
    '공공 안전망 기여',
    '산업 표준화 선도',
    '전략적 상생 생태계 조성'
  ];

  const renderBoldText = (text: string) => {
    if (!text) return text;
    
    // Escape keywords for regex
    const escapedKeywords = keywordsToBold.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');
    
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      if (keywordsToBold.includes(part)) {
        return <strong key={i} className="font-bold text-brand-charcoal opacity-100">{part}</strong>;
      }
      return part;
    });
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setExpandedId(null);
    setCurrentPage(1);
  };

  const allCategories = ['전체', ...(content.caseStudySections?.map(s => s.category) || [])];
  const filteredCases = selectedCategory === '전체' 
    ? content.caseStudySections?.flatMap(s => s.cases.map(c => ({ ...c, category: s.category }))) || []
    : content.caseStudySections?.find(s => s.category === selectedCategory)?.cases.map(c => ({ ...c, category: selectedCategory })) || [];

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const currentCases = filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getVisiblePages = () => {
    const totalVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(totalVisible / 2));
    let end = Math.min(totalPages, start + totalVisible - 1);

    if (end - start + 1 < totalVisible) {
      start = Math.max(1, end - totalVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="pb-20 bg-brand-charcoal min-h-screen">
      {/* Hero Section */}
      <section className={cn(
        "relative flex items-center overflow-hidden px-6 md:px-20",
        (isBrandStoryPage || isCompanyIntroPage || isResponsibilityPage || isCoreCompetencyPage) && "lg:px-[12vw]",
        variant === 'service' ? "h-[85vh] md:h-[90vh] justify-center" :
        (variant === 'framework' || variant === 'casestudy' || variant === 'contact') ? "h-[70vh] md:h-[80vh] justify-center" :
        "h-[70vh] md:h-[80vh] justify-start"
      )}>
        <div className="absolute inset-0 z-0">
          <img
            src={content.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
            alt={content.title}
            className="w-full h-full object-cover brightness-[0.3]"
          />
          {(variant !== 'service' && variant !== 'framework' && variant !== 'casestudy' && variant !== 'contact') && <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/40 to-transparent" />}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/40 via-transparent to-brand-charcoal" />
        </div>

        {(variant === 'service' || variant === 'framework' || variant === 'casestudy' || variant === 'contact') ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
              "relative z-10 text-center space-y-10 mx-auto",
              (isNewDesignPage || variant === 'framework' || variant === 'casestudy' || variant === 'contact') ? "max-w-screen-2xl" : "max-w-4xl"
            )}
          >
            <div className="space-y-6">
              <h1 className={cn(
                "font-serif leading-tight text-white px-[6vw] md:px-4 break-keep mx-auto",
                variant === 'contact' ? "tracking-[0.2em]" : "tracking-tight",
                (variant === 'casestudy') ? "text-2xl md:text-4xl lg:text-[64px] md:whitespace-nowrap lg:whitespace-nowrap w-full leading-[1.4] md:leading-tight" :
                (variant === 'contact') ? "text-2xl md:text-5xl lg:text-[64px] md:whitespace-nowrap lg:whitespace-nowrap w-full font-medium" :
                (variant === 'framework') ? "text-2xl md:text-5xl lg:text-[64px] leading-[1.3] md:leading-tight lg:whitespace-nowrap w-full" :
                isNewDesignPage ? "text-3xl md:text-6xl lg:text-[64px] font-normal lg:whitespace-nowrap w-full" :
                (content.sectionTitle && content.sectionTitle.length > 24) ? "text-xl md:text-4xl md:whitespace-nowrap" : 
                (content.sectionTitle && content.sectionTitle.length > 18) ? "text-2xl md:text-5xl md:whitespace-nowrap" : "text-3xl md:text-6xl"
              )}>
                {content.sectionTitle}
              </h1>
              <div className={cn(
                "w-12 h-[2px] mx-auto",
                (variant === 'framework' || variant === 'casestudy' || variant === 'contact' || isNewDesignPage || isCompanyIntroPage || isResponsibilityPage || isCoreCompetencyPage) ? "bg-white" : "bg-brand-gold"
              )} />
            </div>
            <p className={cn(
              "text-base md:text-lg text-white/70 font-light leading-[1.65] mx-auto whitespace-pre-line px-[6vw] md:px-4 break-keep",
              (variant === 'service' || variant === 'framework' || variant === 'casestudy' || variant === 'contact') ? "max-w-2xl lg:max-w-4xl xl:max-w-5xl" : "max-w-2xl",
              (isNewDesignPage || variant === 'framework' || variant === 'casestudy' || variant === 'contact') && "lg:text-[18px] lg:leading-[1.8]"
            )}>
              {content.description.join('\n')}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 max-w-screen-xl space-y-6"
          >
            <span className={cn(
              "text-[10px] md:text-sm tracking-[0.6em] font-semibold uppercase block",
              (isBrandStoryPage || isCompanyIntroPage || isResponsibilityPage || isCoreCompetencyPage) ? "text-white/40" : "text-brand-gold"
            )}>
              {content.subtitle}
            </span>
            <h1 className={cn(
              "font-serif tracking-tight leading-tight whitespace-pre-line md:whitespace-pre break-keep",
              "text-4xl md:text-7xl",
              (isBrandStoryPage || isCompanyIntroPage || isResponsibilityPage || isCoreCompetencyPage) && "text-[7vw] md:text-5xl lg:text-7xl px-4 md:px-0 leading-[1.4] md:leading-tight"
            )}>
              {content.title}
            </h1>
            <div className={cn(
              "w-20 h-[1px]",
              (isNewDesignPage || isBrandStoryPage || isCompanyIntroPage || isResponsibilityPage || isCoreCompetencyPage) ? "bg-white" : "bg-brand-gold/50"
            )} />
          </motion.div>
        )}
      </section>

      {/* Main Content Section - Variants */}
      {variant === 'service' && (
        <>
          {/* Approach Section */}
          {content.approach && (
            <section className={cn(
              "py-20 md:py-32 px-6 md:px-20",
              isNewDesignPage ? "bg-white lg:py-[150px]" : "bg-[#f9f9f9]"
            )}>
              <div className="max-w-screen-xl mx-auto space-y-12 md:space-y-20">
                <div className="text-center space-y-6 px-[6vw] md:px-0">
                  <h2 className={cn(
                    "text-3xl md:text-6xl tracking-tight text-brand-charcoal break-keep",
                    isNewDesignPage ? "font-sans font-bold uppercase" : "font-serif"
                  )}>
                    {content.approach.title}
                  </h2>
                  <p className="text-brand-charcoal/50 text-sm md:text-base font-light">
                    {content.approach.subtitle}
                  </p>
                </div>

                <div className="relative">
                  {/* Connecting Line (Desktop) - Hidden for New Design Pages */}
                  {!isNewDesignPage && <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-black/5" />}
                  
                  <div className={cn(
                    "flex flex-col md:grid md:grid-cols-4 gap-0 md:gap-12 relative z-10",
                    isNewDesignPage && "lg:gap-16"
                  )}>
                    {content.approach.steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={cn(
                          "space-y-6 md:space-y-8 mb-0 md:mb-0",
                          isNewDesignPage ? "text-left p-6 pt-10 relative border-t md:border-t-0" : "text-center py-8"
                        )}
                      >
                        {isNewDesignPage && idx > 0 && (
                          <div className="hidden md:block absolute left-0 top-24 bottom-12 w-[1px] bg-black/[0.05]" />
                        )}
                        {isNewDesignPage ? (
                          <>
                            <div className="space-y-3 md:space-y-4 relative z-10">
                              <span className="text-brand-charcoal/30 text-[10px] tracking-[0.4em] font-bold uppercase block">
                                STEP 0{idx + 1}
                              </span>
                              <h3 className={cn(
                                "text-lg md:text-2xl font-sans font-bold text-brand-charcoal tracking-tight group-hover:text-brand-gold transition-colors duration-500 break-keep",
                                isNewDesignPage && "lg:text-[24px]"
                              )}>
                                {step.title}
                              </h3>
                              <p className={cn(
                                "text-sm leading-[1.6] text-brand-charcoal/50 font-light break-keep",
                                isNewDesignPage && "lg:text-[18px] lg:leading-[1.6]"
                              )}>
                                {step.text}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center space-y-3 md:space-y-4">
                              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/5 bg-white flex items-center justify-center shadow-sm group-hover:border-brand-gold/30 transition-colors">
                                <span className="text-brand-gold font-serif italic text-xl md:text-2xl">0{idx + 1}</span>
                              </div>
                              <div className="space-y-2">
                                <span className="text-brand-gold text-[10px] tracking-[0.3em] font-bold uppercase block">
                                  STEP 0{idx + 1}
                                </span>
                                <h3 className="text-lg md:text-xl font-serif text-brand-charcoal break-keep">
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-sm leading-[1.6] text-brand-charcoal/60 font-light px-4 break-keep">
                              {step.text}
                            </p>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Key Operations Section */}
          {content.operations && (
            <section className={cn(
              "py-20 md:py-32 px-0 md:px-20 bg-brand-charcoal",
              isNewDesignPage && "lg:py-[150px]"
            )}>
              <div className="max-w-screen-xl mx-auto space-y-16 md:space-y-20">
                <div className="text-center space-y-6 px-[6vw] md:px-0">
                  <h2 className={cn(
                    "text-3xl md:text-6xl tracking-tight px-6 md:px-0",
                    isNewDesignPage ? "font-sans font-bold uppercase text-white" : "font-serif text-brand-gold"
                  )}>
                    {content.operations.title}
                  </h2>
                  <div className={cn(
                    "w-12 h-[1px] mx-auto",
                    isNewDesignPage ? "bg-white" : "bg-brand-gold/30"
                  )} />
                </div>

                <div className={cn(
                  "grid md:grid-cols-2 gap-[1px] md:gap-6 w-full",
                  isNewDesignPage && "lg:grid-cols-2 lg:gap-8"
                )}>
                  {content.operations.cards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "group relative w-full overflow-hidden md:rounded-sm",
                        isNewDesignPage ? "bg-[#1a1a1a] aspect-video" : "aspect-[16/9] md:h-[450px]"
                      )}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className={cn(
                          "absolute inset-0 w-full h-full object-cover transition-all duration-1000",
                          isNewDesignPage 
                            ? "grayscale-[0.9] brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45]" 
                            : "grayscale brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.6]"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      <div className={cn(
                        "absolute inset-0 p-8 md:p-10 px-[6vw] md:px-10 flex flex-col justify-end space-y-4 md:space-y-6",
                        isNewDesignPage && "lg:p-12 lg:space-y-8"
                      )}>
                        <div className="space-y-2 md:space-y-4">
                          <h3 className={cn(
                            "text-xl md:text-3xl text-white tracking-tighter leading-tight break-keep",
                            isNewDesignPage ? "font-sans font-bold uppercase lg:text-[24px]" : "font-serif"
                          )}>
                            {card.title}
                          </h3>
                        </div>
                        <p className={cn(
                          "text-xs md:text-sm text-white/50 font-light leading-relaxed max-w-md opacity-100 transition-opacity duration-700 break-keep",
                          isNewDesignPage && "lg:text-[18px] lg:leading-[1.6]"
                        )}>
                          {card.text}
                        </p>
                        <div className={cn(
                          "w-0 h-[1px] transition-all duration-700 group-hover:w-16",
                          isNewDesignPage ? "bg-white" : "bg-brand-gold"
                        )} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {variant === 'framework' && (
        <>
          <section className="py-24 md:py-32 px-[6vw] md:px-20 bg-brand-charcoal text-white overflow-hidden">
            <div className="max-w-screen-xl mx-auto space-y-24 md:space-y-32 lg:space-y-[150px]">
              {content.frameworkSections?.map((section, sIdx) => (
                <div key={sIdx} className="space-y-10 md:space-y-16 relative">
                  {/* Section Label */}
                  <div className="flex items-center gap-10">
                    <div className="text-white/40 text-[10px] md:text-xs tracking-[0.6em] font-bold uppercase whitespace-nowrap">
                      {section.subtitle}
                    </div>
                    <div className="h-[1px] w-full bg-white/10" />
                  </div>

                  <div className="grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-24 items-start">
                    <div className="md:col-span-4 space-y-6 mb-8 md:mb-0">
                      <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-[24px] font-serif tracking-tight leading-tight break-keep"
                      >
                        {section.title}
                      </motion.h2>
                      <div className="w-12 h-[2px] bg-white/20" />
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-[50px] md:gap-10 lg:gap-[50px]">
                      {section.items.map((item, iIdx) => (
                        <motion.div
                          key={iIdx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: iIdx * 0.1 }}
                          className="group relative bg-[#121212]/50 md:bg-[#121212] p-8 md:p-12 rounded-sm transition-all duration-700 overflow-hidden"
                        >
                          {/* Roman Numeral Background */}
                          <div className="absolute top-4 left-4 text-3xl md:text-4xl font-serif font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-700">
                            {['I', 'II', 'III', 'IV', 'V'][iIdx] || iIdx + 1}
                          </div>

                          <div className="grid md:grid-cols-3 gap-3 md:gap-8 relative z-10">
                            <div className="md:col-span-1">
                              <h3 className="text-lg md:text-xl lg:text-[24px] font-sans font-bold text-white tracking-tight uppercase break-keep">
                                {item.title}
                              </h3>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm md:text-base lg:text-[18px] text-white/40 font-light leading-[1.65] lg:leading-[1.8] group-hover:text-white/80 transition-colors duration-700 break-keep lg:max-w-2xl">
                                {item.text}
                              </p>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-brand-gold/30 transition-colors duration-700" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {variant === 'classic' && (
        <section className={cn(
          "py-24 md:py-32 lg:py-32 bg-brand-charcoal text-white",
          isBrandStoryPage ? "px-10 lg:px-20" : isCompanyIntroPage ? "px-[5vw] md:px-20 lg:px-[12vw]" : "px-10 md:px-20"
        )}>
          <div className={cn(
            "max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-10 lg:gap-24 items-start",
            isCompanyIntroPage && "w-full"
          )}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8 lg:col-span-4">
              <h2 className={cn(
                "text-2xl md:text-4xl lg:text-[24px] font-serif leading-relaxed md:leading-snug text-white whitespace-pre-line break-keep",
                isCompanyIntroPage && "mb-12 md:mb-0 lg:mb-16"
              )}>
                 {content.sectionTitle || "시대적 요구와\n수사 패러다임의 진화."}
              </h2>
              <div className={cn(
                "w-12 lg:w-16 h-[2px]",
                (isBrandStoryPage || isResponsibilityPage || isCompanyIntroPage) ? "bg-white" : "bg-brand-gold"
              )} />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className={cn(
                "space-y-6 text-sm md:text-base lg:text-[18px] lg:col-span-8 lg:pl-16 opacity-80 font-light whitespace-pre-line text-white/80 break-keep max-w-3xl",
                (isBrandStoryPage || isCompanyIntroPage) ? "leading-[1.8] lg:leading-[2.2]" : "leading-relaxed"
              )}
            >
              {content.description.map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
          </div>
        </section>
      )}

      {variant === 'modern' && (
        <section className="py-32 px-6 md:px-20 bg-brand-charcoal text-white border-y border-white/5">
          <div className="max-w-4xl mx-auto space-y-32">
            <div className="text-center space-y-32 relative">
              {content.sectionTitle && (
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  className="text-brand-gold text-3xl md:text-6xl font-serif italic tracking-tighter opacity-40 select-none leading-none break-keep"
                >
                  {content.sectionTitle}
                </motion.h2>
              )}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl lg:text-[24px] font-serif leading-tight tracking-wide text-white/90 break-keep"
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
              className={cn(
                "whitespace-pre-line text-center max-w-3xl mx-auto break-keep",
                (isCompanyIntroPage || isCoreCompetencyPage) 
                  ? "text-sm md:text-base lg:text-[18px] opacity-80 font-light leading-relaxed lg:leading-[1.8] text-white/80"
                  : "text-base md:text-lg font-light leading-relaxed opacity-60"
              )}
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
                  <p key={i} className="text-xl md:text-2xl font-serif font-light leading-snug whitespace-pre-line break-keep">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {variant === 'casestudy' && (
        <section className="py-32 px-6 md:px-20 bg-brand-charcoal text-white">
          <div className="max-w-4xl lg:max-w-screen-xl mx-auto space-y-16">
            {/* Category Filter */}
            <div className="relative -mx-6 md:mx-0">
              <div className={cn(
                "flex flex-nowrap md:flex-wrap items-center gap-x-8 md:gap-x-12 lg:gap-x-16 overflow-x-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden border-b border-white/5 pb-10 px-6 md:px-0 md:justify-center",
                "mask-tabs-mobile md:[mask-image:none]"
              )}>
                {allCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "text-sm md:text-base lg:text-[18px] font-sans transition-all duration-500 hover:text-white outline-none cursor-pointer whitespace-nowrap flex-shrink-0",
                      selectedCategory === cat ? "text-white font-bold" : "text-white/30 font-light"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-0 px-[2vw] md:px-0">
              <AnimatePresence mode="popLayout">
                {currentCases.map((cs, idx) => {
                  const actualIdx = (currentPage - 1) * itemsPerPage + idx;
                  const itemId = `${cs.category}-${actualIdx}`;
                  const isExpanded = expandedId === itemId;

                  return (
                    <motion.div
                      key={itemId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-white/10"
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : itemId)}
                        className="w-full py-8 md:py-14 lg:py-12 flex items-start justify-between gap-8 md:gap-12 text-left group outline-none cursor-pointer"
                      >
                        <div className="flex items-start gap-5 md:gap-12 lg:gap-16 flex-grow">
                          <span className="text-xs md:text-base lg:text-[18px] font-sans font-bold text-white/20 group-hover:text-white transition-colors pt-1.5 flex-shrink-0">
                            {String(actualIdx + 1).padStart(2, '0')}
                          </span>
                          <h3 className={cn(
                            "text-sm md:text-xl lg:text-[24px] font-sans tracking-tight leading-relaxed transition-all duration-500 break-keep underline-offset-8",
                            isExpanded ? "text-white font-bold" : "text-white/70 font-light group-hover:text-white"
                          )}>
                            {cs.subject}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center mt-2 flex-shrink-0 lg:mt-3"
                        >
                          <div className="absolute w-full h-[1.5px] bg-white/30 group-hover:bg-white transition-colors" />
                          <div className="absolute h-full w-[1.5px] bg-white/30 group-hover:bg-white transition-colors" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-12 pl-8 md:pl-28 lg:pl-32 space-y-10">
                              <div className="space-y-8 lg:space-y-12 max-w-4xl lg:max-w-6xl">
                                <div className="space-y-4 lg:space-y-6">
                                  <span className="text-[10px] md:text-xs lg:text-[16px] font-sans font-bold tracking-[0.5em] text-white/40 uppercase block">
                                    CASE
                                  </span>
                                  <p className="text-xs md:text-base lg:text-[18px] text-white/80 font-light leading-relaxed lg:leading-[1.8] break-keep">
                                    {cs.title}
                                  </p>
                                </div>
                                <div className="space-y-4 lg:space-y-6">
                                  <span className="text-[10px] md:text-xs lg:text-[16px] font-sans font-bold tracking-[0.5em] text-white/40 uppercase block">
                                    SOLUTION
                                  </span>
                                  <p className="text-sm md:text-[17px] lg:text-[18px] text-white/90 font-light leading-relaxed lg:leading-[1.8] break-keep">
                                    {cs.solution}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-12">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-white/30 hover:text-white disabled:opacity-0 transition-colors cursor-pointer text-xs tracking-widest font-bold"
                >
                  PREV
                </button>
                <div className="flex gap-4">
                  {getVisiblePages().map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "text-sm tracking-tighter transition-all duration-300 relative py-2 px-1",
                        currentPage === page ? "text-white font-bold" : "text-white/20 hover:text-white"
                      )}
                    >
                      {String(page).padStart(2, '0')}
                      {currentPage === page && (
                        <motion.div 
                          layoutId="pageUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-white/30 hover:text-white disabled:opacity-0 transition-colors cursor-pointer text-xs tracking-widest font-bold"
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Grid Features Section - Layout varies based on variant */}
      {content.gridItems && (
        <section className={cn(
          "px-10 md:px-20 lg:px-24",
          variant === 'contact' ? "pt-8 md:pt-8 pb-32 lg:pb-64" : "py-32 lg:py-64",
          (variant === 'classic' || variant === 'modern' || variant === 'contact') ? "" : "bg-brand-charcoal",
          (variant === 'classic' || variant === 'modern') && "bg-white",
          variant === 'contact' && "px-[6vw] md:px-20 bg-brand-charcoal",
          isBrandStoryPage ? "px-8 md:px-20" : isCompanyIntroPage ? "px-[6vw] md:px-20 lg:px-[12vw]" : isResponsibilityPage ? "px-0 md:px-20" : isCoreCompetencyPage ? "px-10 md:px-20" : ""
        )}>
          <div className="max-w-screen-xl mx-auto">
            {variant === 'contact' ? (
              <div className="w-full max-w-[800px] lg:max-w-none lg:w-fit mx-auto space-y-16 md:space-y-24 lg:space-y-[120px]">
                {/* Information Section */}
                <div className="grid md:grid-cols-12 lg:grid-cols-[260px_420px] gap-8 md:gap-12 lg:gap-[350px] items-start border-t border-white/5 pt-16 md:pt-24">
                  <div className="md:col-span-5 lg:col-span-1 space-y-6 md:space-y-2">
                    <h2 className="text-white/40 text-[10px] md:text-xs lg:text-[14px] tracking-[0.6em] font-bold uppercase font-sans">INFORMATION</h2>
                    <h3 className="text-3xl md:text-4xl lg:text-[32px] lg:leading-[1.2] font-sans text-white tracking-tight break-keep whitespace-nowrap">
                      선진 본사
                    </h3>
                  </div>
                  <div className="md:col-span-7 lg:col-span-1 space-y-12 md:pt-[24px] lg:pt-[36px]">
                    <div className="grid gap-0">
                      {content.gridItems.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative py-8 md:py-0 md:pb-10"
                        >
                          <h4 className="text-white/40 text-sm md:text-base lg:text-[16px] font-sans font-medium tracking-tight uppercase mb-2 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-base md:text-lg lg:text-[18px] lg:leading-[1.8] text-white font-light leading-relaxed whitespace-pre-line transition-colors duration-700 break-keep">
                            {item.text}
                          </p>
                          {idx !== content.gridItems.length - 1 && (
                            <div className="absolute bottom-0 left-0 w-[160px] md:w-[240px] lg:w-[320px] h-[1px] bg-white/10" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reservation Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-12 lg:grid-cols-[260px_420px] gap-8 md:gap-12 lg:gap-[350px] items-start border-t border-white/5 pt-16 md:pt-24"
                >
                  <div className="md:col-span-5 lg:col-span-1 space-y-6 md:space-y-2">
                    <h2 className="text-white/40 text-[10px] md:text-xs lg:text-[14px] tracking-[0.6em] font-bold uppercase font-sans">RESERVATION</h2>
                    <h3 className="text-3xl md:text-4xl lg:text-[32px] lg:leading-[1.2] font-sans text-white tracking-tight break-keep whitespace-nowrap">
                      사건 의뢰 및 상담
                    </h3>
                  </div>
                  <div className="md:col-span-7 lg:col-span-1 space-y-12 md:space-y-20 md:pt-[24px] lg:pt-[36px] lg:space-y-16">
                    <p className="text-base md:text-lg lg:text-[18px] lg:leading-[1.8] text-white/40 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-700 whitespace-pre-line break-keep">
                      모든 상담은 철저한 보안 원칙 아래 진행됩니다.{"\n"}
                      아래 버튼을 통해 원하시는 일정을 선택해 주십시오.
                    </p>
                    <div className="pt-8 md:pt-4 flex flex-col items-start gap-4 lg:gap-6">
                      <button
                        onClick={onBooking}
                        className="w-full md:w-72 lg:w-96 flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold/90 text-black px-8 py-5 md:py-4 lg:py-6 transition-all duration-300 font-medium tracking-widest text-xs lg:text-[15px]"
                      >
                        <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                        DATE & TIME RESERVATION
                      </button>
                      <a 
                        href="mailto:office@sunjinv.com"
                        className="w-full md:w-72 lg:w-96 flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 px-8 py-5 md:py-4 lg:py-6 transition-all duration-300 font-medium tracking-widest text-xs lg:text-[15px]"
                      >
                        <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                        DIRECT INQUIRY
                      </a>
                      <div className="mt-6 flex items-center gap-4 text-[10px] tracking-widest font-bold text-white/20 uppercase">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        SECURE LINE ACTIVE
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : variant === 'classic' ? (
              /* Conditional layout: Brand Story vs Responsibility & Values */
              (content.subtitle === 'RESPONSIBILITY & VALUES') ? (
                /* Horizontal Titles Navigation and Content Area */
                <div className="space-y-4 md:space-y-6">
                  {/* Titles Navigation */}
                  <div className={cn("relative group/tabs md:mx-0", isResponsibilityPage ? "mx-0" : "-mx-10")}>
                    <div className={cn(
                      isResponsibilityPage ? "grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-wrap md:justify-center md:gap-x-16 md:overflow-x-visible" : "flex flex-nowrap md:flex-wrap items-center md:justify-center gap-x-10 md:gap-x-16 lg:gap-x-24 overflow-x-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden",
                      "border-b border-black/5 pb-10 md:px-0",
                      isResponsibilityPage ? "px-4" : "px-10",
                      "mask-tabs-mobile md:[mask-image:none]"
                    )}>
                      {content.gridItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                          "relative pb-4 text-base md:text-xl lg:text-2xl lg:tracking-tight font-serif text-brand-charcoal transition-all duration-500 hover:text-brand-gold outline-none cursor-pointer whitespace-nowrap flex-shrink-0",
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
                          className="bg-white py-12 px-5 md:p-20 lg:py-32 lg:px-20 w-full md:w-full mx-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] border border-black/[0.02]"
                        >
                          <div className="space-y-12 md:space-y-12 lg:space-y-24">
                            {/* Removed decoration as requested */}
                            
                            {content.gridItems[activeTab].text.includes('\n\n') ? (
                              <div className="space-y-16 md:space-y-12 lg:space-y-24">
                                 <p className={cn(
                                   "text-lg md:text-2xl lg:text-[24px] font-serif italic text-brand-charcoal leading-[1.8] md:leading-relaxed break-keep overflow-wrap-anywhere",
                                   isResponsibilityPage && "text-center"
                                 )}>
                                    {content.gridItems[activeTab].text.split('\n\n')[0]}
                                 </p>
                                 <div className="space-y-12 md:space-y-8 lg:space-y-20">
                                   {content.gridItems[activeTab].text.split('\n\n').slice(1).map((para, pIdx) => (
                                     <p key={pIdx} className="text-xs md:text-base lg:text-[18px] leading-8 md:leading-10 lg:leading-[1.8] text-brand-charcoal/70 font-light whitespace-pre-line tracking-tight border-l border-brand-gold/20 pl-6 break-keep overflow-wrap-anywhere">
                                       {renderBoldText(para)}
                                     </p>
                                   ))}
                                 </div>
                              </div>
                            ) : (
                              <p className="text-xs md:text-base leading-8 md:leading-10 text-brand-charcoal/70 font-light whitespace-pre-line break-keep overflow-wrap-anywhere">
                                {renderBoldText(content.gridItems[activeTab].text)}
                              </p>
                            )}
                          </div>
                        </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Brand Story specific detailed layout (Vertical Stack) */
                <div className="space-y-32 md:space-y-24 lg:space-y-64">
                  {content.gridItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 1 }}
                      className="flex flex-col items-center space-y-16 md:space-y-12 lg:space-y-20 group max-w-4xl lg:max-w-6xl mx-auto"
                    >
                      <div className="space-y-8 lg:space-y-12 w-full text-center">
                        <div className="flex items-center justify-center gap-6">
                          <div className="h-[1px] w-12 lg:w-20 bg-brand-gold/30 group-hover:w-20 lg:group-hover:w-32 group-hover:bg-brand-gold transition-all duration-1000" />
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-[24px] font-serif tracking-tight text-brand-charcoal leading-tight break-keep overflow-wrap-anywhere">
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-full text-left lg:max-w-3xl lg:mx-auto">
                        <p className={cn(
                          "text-xs md:text-sm lg:text-[18px] tracking-tight text-brand-charcoal/70 font-light whitespace-pre-line group-hover:text-brand-charcoal transition-colors duration-700 break-keep",
                          isBrandStoryPage ? "px-6 md:px-4 leading-9 md:leading-9 lg:leading-[2.2]" : "px-4 leading-8 md:leading-9"
                        )}>
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (variant === 'modern' && content.subtitle === 'CORE COMPETENCY') ? (
              /* Specific layout for Core Competency: Title Left, Text Right */
              <div className="space-y-20 md:space-y-24 lg:space-y-32">
                {content.gridItems.map((item, idx) => (
                   <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1, duration: 0.8 }}
                     className="border-t border-black/5 pt-12 md:pt-16 lg:pt-24 group"
                   >
                     <div className="grid md:grid-cols-12 gap-4 md:gap-16 items-start">
                       <div className="md:col-span-5 space-y-6">
                          <h3 className="text-lg md:text-2xl lg:text-[24px] font-serif tracking-tight text-brand-charcoal leading-[1.5] md:leading-tight break-keep overflow-wrap-anywhere">
                            {item.title}
                          </h3>
                          <div className="h-[1px] w-8 bg-brand-gold/30 group-hover:w-16 transition-all duration-700" />
                       </div>
                       <div className="md:col-span-7">
                          <p className="text-sm md:text-[15px] lg:text-[18px] leading-[1.8] md:leading-[1.8] lg:leading-[1.8] text-brand-charcoal/60 font-light whitespace-pre-line group-hover:text-brand-charcoal transition-colors duration-700 break-keep overflow-wrap-anywhere">
                            {item.text}
                          </p>
                       </div>
                     </div>
                   </motion.div>
                ))}
              </div>
            ) : (
              /* Modern / Standard layout for Company Intro */
              <div className={cn(
                "grid gap-12",
                variant === 'technical' ? "md:grid-cols-2" : "md:grid-cols-3",
                isCompanyIntroPage && "gap-16 md:gap-12 lg:gap-24"
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
                          "text-xl md:text-2xl lg:text-[24px] font-serif tracking-tight leading-tight transition-all duration-700 break-keep",
                          !isCompanyIntroPage && "border-l-4 border-brand-gold/0 group-hover:border-brand-gold/100 pl-0 group-hover:pl-6",
                          variant === 'modern' ? "text-brand-charcoal" : "text-white"
                        )}>
                          {item.title}
                        </h3>
                        <p className={cn(
                          "text-xs md:text-sm lg:text-[18px] leading-relaxed lg:leading-[1.8] font-light whitespace-pre-line px-0 transition-colors duration-700 break-keep",
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
      <section className={cn(
        "h-[60vh] relative overflow-hidden",
        isCompanyIntroPage && "min-h-[40vh]"
      )}>
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

