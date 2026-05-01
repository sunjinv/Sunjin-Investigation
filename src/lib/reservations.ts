import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ReservationData {
  userId: string;
  category: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  status: ReservationStatus;
  notes: string;
  createdAt: Timestamp;
}

export const createReservation = async (data: Omit<ReservationData, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), {
      ...data,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating reservation", error);
    throw error;
  }
};

export const getReservationsByDate = async (date: string) => {
  const q = query(collection(db, 'reservations'), where('date', '==', date));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as ReservationData);
};
