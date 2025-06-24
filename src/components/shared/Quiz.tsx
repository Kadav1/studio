"use client";

import { useState } from "react";
import type { Quiz } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Award, RotateCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizProps {
  quiz: Quiz;
}

export default function QuizComponent({ quiz }: QuizProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  
  const activeQuestion = quiz.questions[activeQuestionIndex];
  const selectedOption = selectedAnswers[activeQuestion.id];

  const handleNext = () => {
    if (activeQuestionIndex < quiz.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };
  
  const handleReset = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  }

  const score = quiz.questions.reduce((acc, question) => {
    return selectedAnswers[question.id] === question.correctOptionId ? acc + 1 : acc;
  }, 0);

  if (isFinished) {
    return (
      <Card className="w-full max-w-lg mx-auto border-0 shadow-none">
        <CardHeader className="text-center">
          <Award className="h-16 w-16 text-accent mx-auto" />
          <CardTitle className="font-headline text-2xl text-primary mt-4">Quiz Complete!</CardTitle>
          <CardDescription>You've finished the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold">{score} / {quiz.questions.length}</p>
          <p className="text-muted-foreground">Your Score</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleReset}>
            <RotateCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{activeQuestion.text}</CardTitle>
        <CardDescription>Question {activeQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
        <Progress value={((activeQuestionIndex + 1) / quiz.questions.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={(optionId) => handleSelectAnswer(activeQuestion.id, optionId)}
          className="space-y-2"
        >
          {activeQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 p-3 rounded-md border has-[:checked]:bg-accent/10 has-[:checked]:border-accent transition-colors">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleNext} disabled={!selectedOption}>
          {activeQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
