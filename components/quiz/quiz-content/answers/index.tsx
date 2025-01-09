import React, { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Answered, QuizAnswer } from "@/types/quiz/types.ts";
import { Button } from "@/components/ui/button.tsx";

interface Props {
  className?: string;
  answers: QuizAnswer[];
  answered?: Answered;
  onSelectAnswer: (id: string) => void;
}

export const Answers: FC<Props> = ({
  className,
  answers,
  answered,
  onSelectAnswer,
}) => {
  return (
    <>
      <div className={cn(className)}>
        <RadioGroup
          onValueChange={(v) => {
            onSelectAnswer(v);
          }}
          value={answers.find((a) => a.selected)?.id ?? ""}
          defaultValue={""}
        >
          {answers.map((a) => (
            <div
              className={cn(
                "flex items-center space-x-2",
                a.selected &&
                  answered === Answered.CORRECT &&
                  a.isCorrect &&
                  "text-success-500",
                a.selected &&
                  answered === Answered.WRONG &&
                  !a.isCorrect &&
                  "text-warning-500",
              )}
              key={a.id}
            >
              <RadioGroupItem value={a.id} id={a.id} checked={a.selected} />
              <Label htmlFor={a.id}>{a.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};
