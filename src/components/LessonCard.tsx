
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lesson } from "@/types";
import OptimizedImage from "./OptimizedImage";

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <Link to={`/lesson/${lesson.id}`}>
      <Card className="overflow-hidden card-hover h-full transition-all duration-300 hover:shadow-md">
        <div className="overflow-hidden h-48">
          <OptimizedImage
            src={lesson.coverImage}
            alt={lesson.title}
            aspectRatio={16/9}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{lesson.title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-sm text-muted-foreground flex items-center">
            <span className="flex items-center">Aula {lesson.id}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LessonCard;
