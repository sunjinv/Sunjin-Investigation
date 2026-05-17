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
    const matchesSearch = r.userId.toLowerCase().includes(searchTerm.toLowerCase()) || r.notes.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-serif tracking-widest">CONTROL DASHBOARD</h2>
             <span className="text-[9px] bg-brand-gold text-black px-2 py-0.5 font-bold tracking-tighter">SECURE ACCESS</span>
          </div>
          <button onClick={onClose} className="hover:text-brand-gold">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex bg-white/5 p-1 rounded-none border border-white/10">
              {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-4 py-1.5 text-[9px] tracking-widest transition-all",
                    filter === f ? "bg-brand-gold text-black font-bold" : "text-white/40 hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>

           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="SEARCH RESERVATIONS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-[10px] tracking-widest focus:border-brand-gold outline-none"
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto p-6 md:p-8 space-y-4">
           {filteredReservations.map((r) => (
             <div key={r.id} className="border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className={cn(
                           "text-[9px] font-bold px-2 py-0.5 tracking-tighter",
                           r.status === 'PENDING' && "bg-yellow-500/20 text-yellow-500",
                           r.status === 'CONFIRMED' && "bg-blue-500/20 text-blue-500",
                           r.status === 'COMPLETED' && "bg-green-500/20 text-green-500",
                           r.status === 'CANCELLED' && "bg-red-500/20 text-red-500"
                         )}>
                            {r.status}
                         </span>
                         <span className="text-[10px] tracking-[0.2em] font-medium text-brand-gold">{r.category}</span>
                      </div>
                      
                      <div className="space-y-1">
                         <p className="text-lg font-serif">Scheduled for {r.date} @ {r.timeSlot}</p>
                         <p className="text-[10px] text-white/40 tracking-widest mt-1">성함: {r.name} | 연락처: {r.contact}{r.userId && ` | USER_ID: ${r.userId}`}</p>
                      </div>

                      {r.notes && (
                        <div className="p-4 bg-black/40 border-l-2 border-brand-gold italic text-white/60 text-xs">
                          "{r.notes}"
                        </div>
                      )}
                   </div>

                   <div className="flex flex-row md:flex-col gap-2 items-end justify-center">
                      <button 
                        onClick={() => updateStatus(r.id, ReservationStatus.CONFIRMED)}
                        className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 transition-all rounded-full"
                        title="Confirm"
                      >
                         <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, ReservationStatus.COMPLETED)}
                        className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 transition-all rounded-full"
                        title="Complete"
                      >
                         <div className="w-4 h-4 flex items-center justify-center font-bold">✓✓</div>
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, ReservationStatus.CANCELLED)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all rounded-full"
                        title="Cancel"
                      >
                         <XCircle className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-40 text-[8px] tracking-[0.2em]">
                   <span>CREATED: {r.createdAt ? format(r.createdAt.toDate(), 'PPP p') : 'N/A'}</span>
                   <span>RESERVATION ID: {r.id}</span>
                </div>
             </div>
           ))}

           {filteredReservations.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                <Clock className="w-12 h-12 mb-4" />
                <p className="tracking-widest">NO RESERVATIONS FOUND</p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
