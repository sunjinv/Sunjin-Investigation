import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { createReservation, getReservationsByDate, ReservationStatus } from '../lib/reservations';
import { cn } from '../lib/utils';
import "react-day-picker/dist/style.css";

const CATEGORIES = [
  { id: 'CORPORATE', name: 'CORPORATE INVESTIGATION', label: '기업 수사' },
  { id: 'DIGITAL_FORENSICS', name: 'DIGITAL FORENSICS', label: '디지털 포렌식' },
  { id: 'PRIVATE', name: 'PRIVATE INVESTIGATOR', label: '개인·가정 조사' },
  { id: 'VIP', name: 'VIP RISK MANAGEMENT', label: 'VIP 위기 관리' },
];

const TIME_SLOTS = [
  '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
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
    if (!user || !category || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    try {
      await createReservation({
        userId: user.uid,
        category,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTime,
        status: ReservationStatus.PENDING,
        notes
      });
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
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
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-brand-charcoal border border-white/10 rounded-none overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <span className="text-[10px] tracking-[0.5em] font-medium opacity-50 uppercase">
            Step {isSuccess ? 'Completed' : `${step} / 4`}
          </span>
          <button onClick={onClose} className="hover:text-brand-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 md:p-12 h-[600px] overflow-y-auto custom-scrollbar">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-brand-gold" />
              <h2 className="text-3xl font-serif">RESERVATION SUCCESSFUL</h2>
              <p className="text-white/60">
                예약이 완료되었습니다. 담당 전문가가 확인 후 개별 연락드리겠습니다.<br />
                철저한 기밀 유지를 약속합니다.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 bg-white text-black px-12 py-3 tracking-widest text-xs font-bold"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif">Select Consultation Category</h3>
                  <div className="grid gap-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setCategory(cat.id); setStep(2); }}
                        className={cn(
                          "flex items-center justify-between p-6 border transition-all duration-300 group hover:border-brand-gold",
                          category === cat.id ? "border-brand-gold bg-brand-gold/5" : "border-white/10"
                        )}
                      >
                        <div className="text-left">
                          <span className="block text-[10px] text-brand-gold tracking-widest mb-1">{cat.label}</span>
                          <span className="block text-sm tracking-widest font-medium">{cat.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 flex flex-col items-center">
                  <h3 className="text-2xl font-serif">Select Preferred Date</h3>
                  <div className="bg-white/5 p-4 rounded-none border border-white/10">
                    <DayPicker
                       mode="single"
                       selected={selectedDate}
                       onSelect={(date) => { setSelectedDate(date); if(date) setStep(3); }}
                       disabled={{ before: addDays(new Date(), 1) }}
                       className="booking-calendar"
                    />
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 mt-4 underline underline-offset-4">Back to categories</button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 text-center">
                  <h3 className="text-2xl font-serif">Choose Time Slot</h3>
                  <p className="text-xs text-white/50">{selectedDate ? format(selectedDate, 'PPP') : ''}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
                    {TIME_SLOTS.map((time) => {
                      const isOccupied = occupiedSlots.includes(time);
                      return (
                        <button
                          key={time}
                          disabled={isOccupied}
                          onClick={() => { setSelectedTime(time); setStep(4); }}
                          className={cn(
                            "py-4 border transition-all text-xs tracking-widest",
                            selectedTime === time ? "bg-brand-gold text-black border-brand-gold font-bold" : "border-white/10 hover:border-brand-gold",
                            isOccupied && "opacity-20 cursor-not-allowed line-through"
                          )}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setStep(2)} className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 mt-8 underline underline-offset-4">Modify date</button>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif text-center">Consultation Notes</h3>
                  <div className="space-y-6">
                    <div className="p-6 border border-white/10 bg-white/5 text-xs text-white/60 space-y-2">
                       <p><span className="text-brand-gold">CATEGORY:</span> {CATEGORIES.find(c => c.id === category)?.name}</p>
                       <p><span className="text-brand-gold">SCHEDULE:</span> {selectedDate && format(selectedDate, 'PPP')} @ {selectedTime}</p>
                    </div>
                    
                    <textarea
                      placeholder="상담을 원하시는 상세 내용을 입력해 주세요. (보안이 필요한 사항은 생략하셔도 무방합니다)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-40 bg-transparent border border-white/10 p-4 focus:border-brand-gold outline-none transition-colors text-sm leading-relaxed"
                    />

                    <button
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="w-full bg-brand-gold text-black py-4 font-bold tracking-[0.3em] text-xs hover:bg-brand-gold/90 transition-colors"
                    >
                      {isSubmitting ? 'PROCESSING...' : 'CONFIRM RESERVATION'}
                    </button>
                    
                    <button onClick={() => setStep(3)} className="w-full text-center text-xs uppercase tracking-widest opacity-40 hover:opacity-100 underline underline-offset-4">Modify time</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>

      <style>{`
        .booking-calendar {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #C5A059;
          --rdp-background-color: #C5A059;
          color: white;
        }
        .rdp-day_selected {
          background-color: var(--rdp-accent-color) !important;
          color: black !important;
          font-weight: bold;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
           background-color: rgba(197, 160, 89, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
