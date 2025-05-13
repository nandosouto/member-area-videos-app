
import React from "react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { useLessons } from "@/App";

const Index = () => {
  const { lessons } = useLessons();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-fitness-500 mb-2">Programa de Redução Abdominal</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Acompanhe nossas aulas especializadas para eliminar gordura abdominal e transformar seu corpo.
          </p>
        </div>
        
        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
