
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLessons } from "@/App";

const LessonView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lessons } = useLessons();
  const [isLoading, setIsLoading] = useState(true);

  // Find current lesson
  const currentLessonId = parseInt(id || "1");
  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId);
  
  // Find previous and next lessons
  const prevLesson = lessons.find(lesson => lesson.id === currentLessonId - 1);
  const nextLesson = lessons.find(lesson => lesson.id === currentLessonId + 1);

  useEffect(() => {
    if (!currentLesson) {
      navigate("/");
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentLesson, navigate]);

  if (!currentLesson) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <Link to="/" className="text-fitness-500 hover:underline inline-flex items-center gap-1 mb-4">
              <ChevronLeft size={16} />
              <span>Voltar para aulas</span>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold mb-4">{currentLesson.title}</h1>
          </div>

          {isLoading ? (
            <div className="video-container bg-muted animate-pulse flex items-center justify-center">
              <div className="text-muted-foreground">Carregando vídeo...</div>
            </div>
          ) : (
            <VideoPlayer 
              videoUrl={currentLesson.videoUrl}
              isWistia={currentLesson.isWistia}
              mediaId={currentLesson.mediaId}
            />
          )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => prevLesson && navigate(`/lesson/${prevLesson.id}`)}
              disabled={!prevLesson}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              <span>Aula Anterior</span>
            </Button>

            <Button
              onClick={() => nextLesson && navigate(`/lesson/${nextLesson.id}`)}
              disabled={!nextLesson}
              className="bg-fitness-500 hover:bg-fitness-600 flex items-center gap-2"
            >
              <span>Próxima Aula</span>
              <ChevronRight size={16} />
            </Button>
          </div>

          <div className="mt-8 p-6 bg-card rounded-lg border border-muted">
            <h2 className="text-lg font-semibold mb-3">Conteúdo desta aula</h2>
            <p className="text-muted-foreground">
              {currentLesson.title}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonView;
