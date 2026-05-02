import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import SubPageLayout from './components/SubPageLayout';
import { SUBPAGE_DATA } from './constants/subPageData';
import { signInWithGoogle } from './lib/firebase';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage({ onBooking }: { onBooking: () => void }) {
  return (
    <>
      <Hero />
      <Intro />
      <Expertise />
      <Banner />
      <ReservationSection onOpenBooking={onBooking} />
    </>
  );
}

function DynamicSubPage() {
  const location = useLocation();
  const content = SUBPAGE_DATA[location.pathname];

  if (!content) return (
    <div className="h-screen flex items-center justify-center pt-20">
      <h2 className="text-2xl font-serif opacity-50 tracking-widest">PAGE UNDER CONSTRUCTION</h2>
    </div>
  );

  return <SubPageLayout content={content} />;
}

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
    <div className="relative min-h-screen bg-brand-charcoal overflow-x-hidden selection:bg-brand-gold/30">
      <ScrollToTop />
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage onBooking={handleBookingClick} />} />
          <Route path="/company/*" element={<DynamicSubPage />} />
          <Route path="/business/*" element={<DynamicSubPage />} />
          <Route path="/framework/*" element={<DynamicSubPage />} />
          <Route path="/portfolio/*" element={<DynamicSubPage />} />
          <Route path="/contact" element={<HomePage onBooking={handleBookingClick} />} />
        </Routes>
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
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

