import { Answered, Quiz } from "@/types/quiz/types.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { shuffleArr } from "@/lib/utils.ts";

type Input = {
  quiz: Quiz;
};

export const useQuizForm = ({ quiz }: Input) => {
  const [formQuiz, setFormQuiz] = useState<Quiz>(quiz);
  const shuffle = (q: Quiz) => {
    const clone: Quiz = JSON.parse(JSON.stringify(q));
    clone.questions = shuffleArr(clone.questions);
    clone.questions.forEach((q) => {
      q.answers = shuffleArr(q.answers);
      q.answers.forEach((answer) => (answer.selected = false));
      q.answered = undefined;
    });
    return clone;
  };
  useEffect(() => {
    setFormQuiz(shuffle(quiz));
  }, []);
  const submitted = useMemo(
    () => formQuiz.questions.every((q) => q.answered),
    [formQuiz],
  );
  const onSelectAnswer = useCallback(
    ({ qid, aid }: { aid: string; qid: string }) => {
      if (submitted) {
        return;
      }
      setFormQuiz((q) => {
        const clone: Quiz = JSON.parse(JSON.stringify(q));
        clone.questions
          .find((question) => question.id === qid)!
          .answers.forEach((a) => (a.selected = a.id === aid));

        return clone;
      });
    },
    [submitted],
  );
  const canSubmit = useMemo(
    () =>
      formQuiz.questions.every((q) => {
        return q.answers.some((a) => a.selected);
      }),
    [formQuiz],
  );
  const onSubmit = useCallback(() => {
    setFormQuiz((q) => {
      const clone: Quiz = JSON.parse(JSON.stringify(q));
      clone.questions.forEach((q) => {
        const { answers } = q;
        const selectedAnswer = answers.find((a) => a.selected);
        if (selectedAnswer!.isCorrect) {
          q.answered = Answered.CORRECT;
        } else {
          q.answered = Answered.WRONG;
        }
      });
      return clone;
    });
  }, [formQuiz]);
  const reset = () => {
    setFormQuiz(shuffle(quiz));
  };
  return {
    formQuiz,
    onSelectAnswer,
    canSubmit,
    onSubmit,
    submitted,
    reset,
  };
};
