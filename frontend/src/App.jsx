import { Routes, Route } from "react-router-dom"; // make sure it's 'react-router-dom'
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

function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  },[fetchUser]);

  if(fetchingUser){
    return <p>Loading...</p>;
  } 

  return (
    <AppProvider>
    <ThemeProvider theme={theme}>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Books />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
    </AppProvider>
  );
}

export default App;
