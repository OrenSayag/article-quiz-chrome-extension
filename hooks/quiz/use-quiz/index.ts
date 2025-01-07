import {
  GetQuizInput,
  useGetQuiz,
} from "@/hooks/quiz/use-quiz/methods/use-get-quiz";
import { useEffect } from "react";

type Input = GetQuizInput;

export const useQuiz = (input: Input) => {
  const { pendingGetQuiz, quiz, get, error } = useGetQuiz();
  useEffect(() => {
    get(input);
  }, []);
  return {
    loadingQuiz: pendingGetQuiz,
    quiz,
    getQuizError: error,
  };
};
