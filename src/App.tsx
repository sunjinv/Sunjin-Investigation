import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Expertise from './components/Expertise';
import Banner from './components/Banner';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import { signInWithGoogle } from './lib/firebase';

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleBookingClick = () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    setIsBookingOpen(true);
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdminOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-charcoal overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Intro />
        <Expertise />
        <Banner />
        <ReservationSection onOpenBooking={handleBookingClick} />
      </main>

      <Footer onOpenAdmin={handleAdminClick} />

      {/* Overlays */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
