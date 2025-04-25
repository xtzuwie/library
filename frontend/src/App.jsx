import { Routes, Route, Navigate } from "react-router-dom"; // make sure it's 'react-router-dom'
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Books from "./pages/Books";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import UnauthRedirect from "./providers/UnauthRedirect";
import AuthRedirect from "./providers/AuthRedirect";
import Inventory from "./pages/Inventory";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import UpdatePage from "./pages/UpdatePage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" />
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/book/:id/update" element={<UpdatePage />} />

          {/* Auth Routes */}
          <Route 
            path="/signup" 
            element={
              <AuthRedirect>
                <SignupPage />
              </AuthRedirect>
            } 
          />
          <Route 
            path="/login" 
            element={
              <AuthRedirect>
                <LoginPage />
              </AuthRedirect>
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
