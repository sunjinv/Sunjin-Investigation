import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { createReservation, getReservationsByDate, ReservationStatus } from '../lib/reservations';
import { cn } from '../lib/utils';
import "react-day-picker/dist/style.css";

const CATEGORIES = [
  '이혼·가사 조사',
  '소송·증거 조사',
  'TSCM 및 포렌식',
  '실종·소재 파악',
  '기업 리스크·보안'
];

const TIME_SLOTS = [
  '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const AccordionSection = ({ 
  title, 
  isOpen, 
  summary, 
  onToggle, 
  children 
}: { 
  title: string; 
  isOpen: boolean; 
  summary?: string; 
  onToggle: () => void; 
  children: ReactNode; 
}) => {
  return (
    <div className="border-b border-white/5 last:border-0 relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center py-6 lg:py-8 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
          <span className={cn(
            "text-[16px] lg:text-[18px] font-medium tracking-[0.1em] transition-colors duration-300",
            isOpen ? "text-white" : "text-white/40 group-hover:text-white/60"
          )}>
            {title}
          </span>
          {summary && !isOpen && (
            <div className="flex items-center gap-4 lg:gap-6">
              <span className="text-white/20 hidden lg:inline">|</span>
              <span className="text-brand-gold text-[14px] lg:text-[16px] tracking-widest font-light">
                {summary}
              </span>
            </div>
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 lg:pb-12 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      getReservationsByDate(dateStr).then(res => {
        setOccupiedSlots(res.map(r => r.timeSlot));
      });
    }
  }, [selectedDate]);

  const handleSubmit = async () => {
    const missingFields = [];
    if (!category) missingFields.push("- BUSINESS CATEGORY (분야)");
    if (!selectedDate) missingFields.push("- SCHEDULE (날짜)");
    if (!selectedTime) missingFields.push("- TIME (시간)");
    if (!name) missingFields.push("- 성함");
    if (!contact) missingFields.push("- 연락처");
    if (!privacyAgreed) missingFields.push("- 개인정보 수집 및 이용 동의");

    if (missingFields.length > 0) {
      alert(`다음 필수 항목을 확인해 주십시오:\n\n${missingFields.join('\n')}`);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createReservation({
        userId: user?.uid, // Optional for non-members
        name,
        contact: contactMethod ? `${contact} [${contactMethod}]` : contact,
        category,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTime,
        status: ReservationStatus.PENDING,
        notes
      });
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert("예약 처리 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={() => !isSubmitting && !isSuccess && onClose()}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-none flex flex-col h-[90vh] lg:h-[85vh] shadow-2xl shadow-black/80"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 shrink-0">
          <span className="text-[18px] tracking-[0.2em] font-serif text-white/80">
            {isSuccess ? 'RESERVATION SUCCESSFUL' : 'PRIVATE SECURE LINE'}
          </span>
          <button onClick={onClose} className="text-white/40 hover:text-brand-gold transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-12 py-10 lg:py-12 scrollbar-none">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10">
              <CheckCircle2 className="w-20 h-20 text-brand-gold" />
              <h2 className="text-[32px] font-serif tracking-tight">예약이 안전하게 접수되었습니다.</h2>
              <p className="text-[18px] text-white/50 leading-[1.8] w-full max-w-2xl break-keep">
                담당자가 내용을 검토한 후, 지정하신 연락처로 신속히 연락드리겠습니다.<br className="hidden lg:block"/>
                선진의 모든 상담은 철저한 기밀 보안 원칙 아래 오프더레코드로 진행됩니다.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 bg-brand-gold text-black hover:bg-brand-gold/90 transition-all px-16 py-5 tracking-[0.2em] text-[16px] font-bold"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <div className="w-full">
              
              <AccordionSection
                title="1. BUSINESS CATEGORY"
                isOpen={step === 1}
                summary={category}
                onToggle={() => setStep(step === 1 ? 0 : 1)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setTimeout(() => setStep(2), 300);
                      }}
                      className={cn(
                        "p-6 border transition-all duration-500 text-left text-[16px] tracking-wide",
                        category === cat 
                          ? "border-brand-gold bg-brand-gold/5 text-white font-medium shadow-[0_0_15px_rgba(197,160,89,0.15)]" 
                          : "border-white/5 hover:border-white/20 text-white/40 font-light"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection
                title="2. SCHEDULE & TIME"
                isOpen={step === 2}
                summary={selectedDate && selectedTime ? `${format(selectedDate, 'yyyy.MM.dd')} ${selectedTime}` : undefined}
                onToggle={() => setStep(step === 2 ? 0 : 2)}
              >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                  <div className="space-y-6 flex justify-center lg:justify-start overflow-hidden">
                    <div className="bg-transparent">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: addDays(new Date(), 1) }}
                        className="booking-calendar m-0 p-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-4 h-max">
                        {TIME_SLOTS.map((time) => {
                          const isOccupied = occupiedSlots.includes(time);
                          return (
                            <button
                              key={time}
                              disabled={isOccupied}
                              onClick={() => {
                                setSelectedTime(time);
                                setTimeout(() => setStep(3), 300);
                              }}
                              className={cn(
                                "py-4 border transition-all duration-300 text-[16px] tracking-widest font-light",
                                selectedTime === time 
                                  ? "bg-brand-gold text-black border-brand-gold font-medium" 
                                  : "border-white/5 text-white/60 hover:border-brand-gold/50",
                                isOccupied && "opacity-20 cursor-not-allowed line-through hover:border-white/5 hover:text-white/60"
                              )}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-full min-h-[280px] flex items-center justify-center border border-white/5 bg-white/5 text-[16px] text-white/30 tracking-widest font-light">
                        날짜를 선택해 주십시오.
                      </div>
                    )}
                  </div>
                </div>
              </AccordionSection>

              <AccordionSection
                title="3. CLIENT INFORMATION"
                isOpen={step === 3}
                summary={name && contact ? `${name} | ${contactMethod ? `${contact} [${contactMethod}]` : contact}` : undefined}
                onToggle={() => setStep(step === 3 ? 0 : 3)}
              >
                <div className="space-y-12">
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <label className="text-[16px] text-white/40 font-light px-1">성함</label>
                      <input
                        type="text"
                        placeholder="입력란"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="allow-select w-full bg-transparent border-0 border-b border-white/20 p-3 px-1 focus:border-brand-gold focus:ring-0 outline-none transition-colors text-[18px] text-white placeholder-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[16px] text-white/40 font-light px-1">연락처</label>
                      <input
                        type="text"
                        placeholder="010-0000-0000"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="allow-select w-full bg-transparent border-0 border-b border-white/20 p-3 px-1 focus:border-brand-gold focus:ring-0 outline-none transition-colors text-[18px] text-white placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[16px] text-white/40 font-light px-1">연락 가능 수단</label>
                    <div className="flex gap-4">
                      {['전화', '이메일'].map(method => (
                        <button
                          key={method}
                          onClick={() => {
                            setContactMethod(method);
                            if (name && contact) {
                              setTimeout(() => setStep(4), 300);
                            }
                          }}
                          className={cn(
                            "px-6 py-2 border transition-colors text-[16px]",
                            contactMethod === method 
                              ? "border-brand-gold text-brand-gold bg-brand-gold/5" 
                              : "border-white/10 text-white/40 hover:border-white/30"
                          )}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionSection>

              <AccordionSection
                title="4. ADDITIONAL NOTES & SUBMIT"
                isOpen={step === 4}
                onToggle={() => setStep(step === 4 ? 0 : 4)}
              >
                <div className="space-y-12">
                  <div className="space-y-4">
                    <textarea
                      placeholder="대략적인 상황이나 증상을 간략히 남겨주시면,&#13;&#10;담당자가 확인 후 더욱 심도있는 상담을 준비합니다.&#13;&#10;기밀이 요구되는 사항은 기재하지 않으셔도 무방합니다."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="allow-select w-full h-40 bg-transparent border-0 border-b border-white/20 p-3 px-1 focus:border-brand-gold focus:ring-0 outline-none transition-colors text-[18px] text-white leading-[1.8] placeholder-white/20 resize-none font-light"
                    />
                  </div>

                  <div className="space-y-10 pt-8">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-1 shrink-0">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-6 h-6 border border-white/20 checked:bg-brand-gold checked:border-brand-gold transition-colors cursor-pointer"
                          checked={privacyAgreed}
                          onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        />
                        <CheckCircle2 className="w-4 h-4 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <div className="allow-select text-[16px] text-white/40 leading-[1.6] font-light group-hover:text-white/60 transition-colors cursor-pointer">
                        개인정보 수집 및 이용에 동의합니다.<br/>
                        <span className="text-[14px] text-white/30 opacity-70 mt-1 block font-sans">수집 목적: 상담 내역 확인 및 회신 / 수집 항목: 성함, 연락처 / 보유 기간: 목적 달성 후 파기</span>
                      </div>
                    </label>

                    <button
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="w-full bg-brand-gold text-black py-6 font-bold tracking-[0.2em] text-[18px] lg:text-[20px] hover:bg-[#e6c175] transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                    >
                      {isSubmitting ? 'PROCESSING...' : '상담 신청'}
                    </button>
                  </div>
                </div>
              </AccordionSection>

            </div>
          )}
        </div>
      </motion.div>

      <style>{`
        .booking-calendar {
          --rdp-cell-size: 44px;
          --rdp-background-color: transparent;
          --rdp-accent-color: #C5A059;
          color: rgba(255, 255, 255, 0.8);
          font-family: inherit;
        }
        @media (max-width: 400px) {
          .booking-calendar {
            --rdp-cell-size: 38px;
          }
        }
        @media (max-width: 350px) {
          .booking-calendar {
            --rdp-cell-size: 34px;
          }
        }
        .booking-calendar .rdp-day {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .booking-calendar .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .booking-calendar .rdp-day_selected {
          background-color: var(--rdp-accent-color) !important;
          color: black !important;
          font-weight: 500;
        }
        .booking-calendar .rdp-day_disabled {
          opacity: 0.15;
        }
        .booking-calendar .rdp-head_cell {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          padding-bottom: 12px;
        }
        .booking-calendar .rdp-nav_button {
          color: rgba(255, 255, 255, 0.5);
          width: 32px;
          height: 32px;
        }
        .booking-calendar .rdp-nav_button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .booking-calendar .rdp-caption_label {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.05em;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
