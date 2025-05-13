
import React, { Suspense } from "react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { useLessons } from "@/App";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Card skeleton loader
const LessonCardSkeleton = () => (
  <div className="h-full">
    <Skeleton className="h-48 w-full mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

const Index = () => {
  const { lessons } = useLessons();
  const isMobile = useIsMobile();

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
        
        <div className={`grid gap-6 ${
          isMobile 
            ? "grid-cols-1" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}>
          {lessons.map((lesson) => (
            <Suspense key={lesson.id} fallback={<LessonCardSkeleton />}>
              <LessonCard lesson={lesson} />
            </Suspense>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
