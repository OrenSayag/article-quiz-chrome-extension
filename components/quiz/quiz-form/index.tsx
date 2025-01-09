import React, { FC } from "react";
import { cn, shuffleArr } from "@/lib/utils.ts";
import { Quiz } from "@/types/quiz/types.ts";
import { Question } from "@/components/quiz/quiz-content/question";
import { Button } from "@/components/ui/button.tsx";
import { useQuizForm } from "@/hooks/quiz/use-quiz/methods/use-quiz-form";

interface Props {
  className?: string;
  quiz: Quiz;
}

export const QuizForm: FC<Props> = ({ className, quiz }) => {
  const { theme } = useTheme();
  const { formQuiz, onSelectAnswer, canSubmit, onSubmit, submitted, reset } =
    useQuizForm({
      quiz,
    });
  return (
    <>
      <div className={cn(theme, "dark:text-white", className)}>
        {formQuiz.questions.map((q) => (
          <Question
            question={q}
            key={q.id}
            className={"mb-2"}
            submitted={submitted}
            onSelectAnswer={(aid) =>
              onSelectAnswer({
                qid: q.id,
                aid,
              })
            }
          />
        ))}
        <div className={"mt-4"}>
          {!submitted && (
            <Button disabled={!canSubmit} onClick={onSubmit}>
              Submit
            </Button>
          )}
          {submitted && <Button onClick={reset}>Retry</Button>}
        </div>
      </div>
    </>
  );
};
