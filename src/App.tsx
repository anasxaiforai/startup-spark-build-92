
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import IdeaInput from "./pages/IdeaInput";
import Blueprint from "./pages/Blueprint";
import PromptEditor from "./pages/PromptEditor";
import BuildPreview from "./pages/BuildPreview";
import SmartFeedback from "./pages/SmartFeedback";
import TechAdvisor from "./pages/TechAdvisor";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/start" element={<IdeaInput />} />
              <Route path="/blueprint" element={<Blueprint />} />
              <Route path="/prompt-editor" element={<PromptEditor />} />
              <Route path="/build-preview" element={<BuildPreview />} />
              <Route path="/feedback" element={<SmartFeedback />} />
              <Route path="/tech-advisor" element={<TechAdvisor />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
