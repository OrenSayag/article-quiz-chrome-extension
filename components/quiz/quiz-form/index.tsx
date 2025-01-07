import React, { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { Quiz } from "@/types/quiz/types.ts";

interface Props {
  className?: string;
  quiz: Quiz;
}

export const QuizForm: FC<Props> = ({ className, quiz }) => {
  const { theme } = useTheme();
  return (
    <>
      <div className={cn(theme, "dark:text-white", className)}>
        <pre>{JSON.stringify(quiz, null, 2)}</pre>
      </div>
    </>
  );
};
