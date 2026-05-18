import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { X, Check, XCircle, Clock, Search } from 'lucide-react';
import { db } from '../lib/firebase';
import { ReservationData, ReservationStatus } from '../lib/reservations';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export default function AdminDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reservations, setReservations] = useState<(ReservationData & { id: string })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<ReservationStatus | 'ALL'>('ALL');

  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as any)));
    });
    return () => unsubscribe();
  }, [isOpen]);

  const updateStatus = async (id: string, status: ReservationStatus) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (e) {
      console.error(e);
    }
  };

  const filteredReservations = reservations.filter(r => {
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch = 
      (r.name?.toLowerCase().includes(searchStr)) ||
      (r.contact?.toLowerCase().includes(searchStr)) ||
      (r.notes?.toLowerCase().includes(searchStr)) ||
      (r.userId?.toLowerCase().includes(searchStr)) ||
      (r.category?.toLowerCase().includes(searchStr));
      
    const matchesFilter = filter === 'ALL' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full h-full bg-brand-charcoal border border-white/10 flex flex-col overflow-hidden"
      >
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between p-8 md:p-12 border-b border-white/5 bg-black/20 gap-8">
          <div className="space-y-2">
            <h2 className="text-white/40 text-[10px] md:text-xs lg:text-[14px] tracking-[0.6em] font-bold uppercase font-sans">예약 내역 관리</h2>
            <h1 className="text-3xl md:text-4xl lg:text-[32px] lg:leading-[1.2] font-sans font-bold text-white tracking-tight">
              관리자 대시보드
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-[11px] font-sans tracking-widest focus:border-brand-gold outline-none transition-colors"
                />
             </div>
             <button onClick={onClose} className="p-3 border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 md:px-12 py-6 border-b border-white/5 flex overflow-x-auto scrollbar-none">
           <div className="flex gap-4 items-center">
              <span className="text-[10px] font-sans font-bold text-white/20 tracking-[0.3em] uppercase mr-4">필터:</span>
              {[
                { label: '전체', value: 'ALL' },
                { label: '대기', value: 'PENDING' },
                { label: '확정', value: 'CONFIRMED' },
                { label: '완료', value: 'COMPLETED' },
                { label: '취소', value: 'CANCELLED' }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value as any)}
                  className={cn(
                    "px-4 py-2 text-[11px] font-sans tracking-widest transition-all border border-transparent",
                    filter === f.value ? "border-brand-gold text-brand-gold font-bold" : "text-white/40 hover:text-white"
                  )}
                >
                  {f.label}
                </button>
              ))}
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-12 space-y-16 md:space-y-24">
           {filteredReservations.map((r) => (
             <div key={r.id} className="grid md:grid-cols-12 lg:grid-cols-[260px_1fr] gap-8 items-start border-t border-white/5 pt-12 first:border-0 first:pt-0">
                <div className="md:col-span-4 lg:col-span-1 space-y-4">
                  <div className="space-y-1">
                    <h4 className={cn(
                      "text-[10px] tracking-[0.6em] font-bold uppercase font-sans underline underline-offset-4 decoration-2",
                      r.status === 'PENDING' && "text-yellow-500/60 decoration-yellow-500/40",
                      r.status === 'CONFIRMED' && "text-blue-500/60 decoration-blue-500/40",
                      r.status === 'COMPLETED' && "text-green-500/60 decoration-green-500/40",
                      r.status === 'CANCELLED' && "text-red-500/60 decoration-red-500/40"
                    )}>
                      {r.status === 'PENDING' && '대기 중'}
                      {r.status === 'CONFIRMED' && '예약 확정'}
                      {r.status === 'COMPLETED' && '상담 완료'}
                      {r.status === 'CANCELLED' && '취소됨'}
                    </h4>
                    <h5 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight leading-tight">
                      {r.category}
                    </h5>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus(r.id, ReservationStatus.CONFIRMED)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-sans font-bold tracking-widest border transition-all",
                        r.status === 'CONFIRMED' ? "bg-blue-500 text-white border-blue-500" : "border-white/10 text-white/40 hover:border-blue-500/40 hover:text-blue-500"
                      )}
                    >
                       확정
                    </button>
                    <button 
                      onClick={() => updateStatus(r.id, ReservationStatus.COMPLETED)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-sans font-bold tracking-widest border transition-all",
                        r.status === 'COMPLETED' ? "bg-green-500 text-white border-green-500" : "border-white/10 text-white/40 hover:border-green-500/40 hover:text-green-500"
                      )}
                    >
                       완료
                    </button>
                    <button 
                      onClick={() => updateStatus(r.id, ReservationStatus.CANCELLED)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-sans font-bold tracking-widest border transition-all",
                        r.status === 'CANCELLED' ? "bg-red-500 text-white border-red-500" : "border-white/10 text-white/40 hover:border-red-500/40 hover:text-red-500"
                      )}
                    >
                       취소
                    </button>
                  </div>
                </div>

                <div className="md:col-span-8 lg:col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                     <div className="space-y-2">
                        <h6 className="text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase font-sans">고객 정보</h6>
                        <div className="space-y-1">
                          <p className="text-lg font-sans font-medium text-white">{r.name}</p>
                          <p className="text-base font-sans text-brand-gold">{r.contact}</p>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <h6 className="text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase font-sans">예약 일정</h6>
                        <p className="text-lg font-sans text-white">{r.date} <span className="text-white/40 mx-2">|</span> {r.timeSlot}</p>
                     </div>

                     <div className="pt-4 flex flex-col gap-2">
                        <span className="text-[10px] font-sans font-bold text-white/10 tracking-[0.2em] uppercase">ID: {r.id}</span>
                        <span className="text-[10px] font-sans font-bold text-white/10 tracking-[0.2em] uppercase">등록일시: {r.createdAt ? format(r.createdAt.toDate(), 'yyyy.MM.dd HH:mm') : 'N/A'}</span>
                     </div>
                   </div>

                   <div className="space-y-2">
                      <h6 className="text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase font-sans">상담 문의 내용</h6>
                      <div className="p-6 bg-white/[0.02] border border-white/5 min-h-[120px]">
                        <p className="text-sm md:text-base font-sans font-light text-white/80 leading-relaxed break-keep whitespace-pre-line">
                          {r.notes || "별도의 추가 요청 사항이 없습니다."}
                        </p>
                      </div>
                   </div>
                </div>
             </div>
           ))}

           {filteredReservations.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 font-sans">
                <Clock className="w-12 h-12 mb-4" />
                <p className="tracking-widest text-sm">예약 내역이 없습니다.</p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
