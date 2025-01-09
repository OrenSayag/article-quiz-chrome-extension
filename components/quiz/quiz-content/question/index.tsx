import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { Quiz } from "@/types/quiz/types.ts";
import { H4 } from "@/components/ui/h4.tsx";
import { Answers } from "@/components/quiz/quiz-content/answers";
import { Button } from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

interface Props {
  className?: string;
  question: Quiz["questions"][number];
  onSelectAnswer: (id: string) => void;
  submitted?: boolean;
}

export const Question: FC<Props> = ({
  className,
  question,
  onSelectAnswer,
  submitted,
}) => {
  return (
    <>
      <div className={cn(className)}>
        <H4>{question.question}</H4>
        <Answers
          className={"mt-2"}
          answers={question.answers}
          onSelectAnswer={onSelectAnswer}
          answered={question.answered}
        />
        {submitted && (
          <div className={"flex justify-end"}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Source</Button>
              </TooltipTrigger>
              <TooltipContent className={"max-w-96 text-wrap"} align={"end"}>
                <p>{question.sourceQuote}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};
