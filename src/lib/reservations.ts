import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from './firebase';
import { sendEmailNotification } from './emailService';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ReservationData {
  userId?: string | null;
  name: string;
  contact: string;
  category: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  status: ReservationStatus;
  notes: string;
  createdAt: Timestamp;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const createReservation = async (data: Omit<ReservationData, 'createdAt'>) => {
  const path = 'reservations';
  try {
    // 0. Ensure user is authenticated (Stealth Authentication)
    let currentUserId = auth.currentUser?.uid;
    
    if (!currentUserId) {
      console.log("[Stealth Auth] Signing in anonymously...");
      const userCredential = await signInAnonymously(auth);
      currentUserId = userCredential.user.uid;
    }

    const reservationData = {
      ...data,
      userId: currentUserId || null,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, path), reservationData);
    
    // 이메일 알림 발송 (비동기로 진행하여 예약 완료 처리에 지연이 없도록 함)
    sendEmailNotification(data).catch(err => console.error("Email notify error:", err));
    
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getReservationsByDate = async (date: string) => {
  const path = 'reservations';
  try {
    const q = query(collection(db, path), where('date', '==', date));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as ReservationData);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};
