import React, { FC } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useQuiz } from "@/hooks/quiz/use-quiz";
import { QuizForm } from "@/components/quiz/quiz-form";
import { cn } from "@/lib/utils.ts";
import { CircleX, Loader2 } from "lucide-react";

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
      {loadingQuiz ||
        (!quiz && !getQuizError && (
          <div
            className={cn(
              theme,
              "dark:text-white flex items-center justify-center h-[80vh] flex-col gap-1",
            )}
          >
            <h3 className={"text-3xl"}>Loading the quiz...</h3>
            <Loader2 className={"animate-spin"} />
          </div>
        ))}
      {quiz && <QuizForm quiz={quiz} />}
      {getQuizError && (
        <div
          className={cn(
            theme,
            "dark:text-white flex items-center justify-center h-[80vh] flex-col gap-1",
          )}
        >
          <h3 className={"text-5xl text-destructive"}>Error</h3>
          <CircleX className={"stroke-destructive"} />
        </div>
      )}
    </>
  );
};
