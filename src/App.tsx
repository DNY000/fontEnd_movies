import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import PromotionsPage from './pages/PromotionsPage';
import SettingsPage from './pages/SettingsPage';
import ContactPage from './pages/ContactPage';
import CinemasPage from './pages/CinemasPage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes - without MainLayout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Main app routes - with MainLayout */}
          <Route path="/*" element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<HomePage />} />
                <Route path="/movies/:id" element={<MovieDetailsPage />} />
                <Route path="/movies/:id/showtimes" element={<MovieDetailsPage />} />
                <Route path="/booking/:showtimeId" element={<BookingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/booking-history" element={<BookingHistoryPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/bookings" element={<BookingHistoryPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/cinemas" element={<CinemasPage />} />
                <Route path="/cinemas/:id" element={<CinemasPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
