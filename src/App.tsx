
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Lesson } from "./types";
import { createContext, useContext } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import LessonView from "./pages/LessonView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Lesson data
const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Como ACABAR com a Lombada de GORDURA Acima da Cicatriz da Cesárea",
    coverImage: "https://i.ibb.co/jkfsM4B6/imagem-gerada.png",
    videoUrl: "https://www.youtube.com/watch?v=e9LVJf6_wlA",
    isWistia: false
  },
  {
    id: 2,
    title: "Conheça 4 Tipos De BARRIGA e o MELHOR Tratamento Para Cada Uma Delas!",
    coverImage: "https://i.ibb.co/xSn7nXHv/imagem-gerada-1.png",
    videoUrl: "https://www.youtube.com/watch?v=SmqOR_DgsZA",
    isWistia: false
  },
  {
    id: 3,
    title: "Como ACABAR com a gordura da barriga em 6 minutos com Massagem Modeladora",
    coverImage: "https://i.ibb.co/gZn1GGn5/imagem-gerada-2.png",
    videoUrl: "https://www.youtube.com/watch?v=ASWNVhhPIr4",
    isWistia: false
  },
  {
    id: 4,
    title: "Você Consegue Desinchar a Barriga em 7 Dias?",
    coverImage: "https://i.ibb.co/hFmmL9sM/imagem-gerada-3.png",
    videoUrl: "",
    isWistia: true,
    mediaId: "68bopk7w3t"
  },
  {
    id: 5,
    title: "Treino de 12 minutos - Seca barriga em casa! (SEM EQUIPAMENTOS)",
    coverImage: "https://i.ibb.co/V02phjbw/imagem-gerada-4.png",
    videoUrl: "",
    isWistia: true,
    mediaId: "kzlfxcc2su"
  },
  {
    id: 6,
    title: "Como ELIMINAR a Pochete! (POUCOS sabem disso)",
    coverImage: "https://i.ibb.co/ynZy6wpq/imagem-gerada-5.png",
    videoUrl: "",
    isWistia: true,
    mediaId: "s7bsth9e9r"
  }
];

// Create Lessons Context
const LessonsContext = createContext<{ lessons: Lesson[] }>({
  lessons: []
});

export const useLessons = () => useContext(LessonsContext);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// App Component with Routes
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route 
      path="/" 
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/lesson/:id" 
      element={
        <ProtectedRoute>
          <LessonView />
        </ProtectedRoute>
      } 
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <LessonsContext.Provider value={{ lessons: lessonsData }}>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </LessonsContext.Provider>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
