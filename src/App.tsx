// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GamificationProvider } from "./contexts/GamificationContext";
import Navigation from "./components/Navigation";
import GamificationBar from "./components/GamificationBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Organizations from "./pages/Organizations";
import GetInvolved from "./pages/GetInvolved";
import Community from "./pages/Community";
import Quiz from "./pages/Quiz";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GamificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <GamificationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/community" element={<Community />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </GamificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;