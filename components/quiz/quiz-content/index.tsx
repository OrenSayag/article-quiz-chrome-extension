import React, { FC } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useQuiz } from "@/hooks/quiz/use-quiz";
import { QuizForm } from "@/components/quiz/quiz-form";
import { cn } from "@/lib/utils.ts";

interface Props {
  className?: string;
}

export const QuizContent: FC<Props> = ({ className }) => {
  const { quiz, loadingQuiz, getQuizError } = useQuiz({
    type: "url",
    source: window.location.href,
  });
  const { theme } = useTheme();
  return (
    <>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
          <DialogDescription>Some quiz description</DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      {loadingQuiz && (
        <div className={cn(theme, "dark:text-white")}>LOADING...</div>
      )}
      {quiz && <QuizForm quiz={quiz} />}
      {getQuizError && (
        <div className={cn(theme, "dark:text-white")}>ERROR</div>
      )}
      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </>
  );
};
