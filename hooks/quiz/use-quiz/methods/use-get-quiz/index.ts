import { Quiz, QuizSourceType } from "@/types/quiz/types.ts";
import { useState, useTransition } from "react";
import links from "@/lib/links.ts";
import { nanoid } from "nanoid";
import { MessageType } from "@/entrypoints/types.ts";

export type GetQuizInput = {
  type: QuizSourceType;
  source: string;
};

export const useGetQuiz = () => {
  const [pendingGetQuiz, startGetQuiz] = useTransition();
  const [error, setError] = useState<string>();
  const [quiz, setQuiz] = useState<Quiz>();
  const get = (input: GetQuizInput) => {
    startGetQuiz(() => {
      getQuiz({
        ...input,
        onSuccess: (q) => {
          setQuiz(q);
          browser.runtime.sendMessage({
            messageType: MessageType.GOT_QUIZ,
            content: "",
          });
        },
        onError: () => {
          setError("Failed to get quiz");
        },
      });
    });
  };
  return {
    get,
    quiz,
    error,
    pendingGetQuiz,
  };
};

async function getQuiz({
  onSuccess,
  onError,
  ...input
}: GetQuizInput & {
  onError(): void;
  onSuccess(quiz: Quiz): void;
}) {
  const res = await fetch(
    `${links.QUIZ_ENDPOINT}?${new URLSearchParams({ ...input }).toString()}`,
    {
      credentials: "include",
      method: "GET",
    },
  );
  const success = res.status === 200;
  if (!success) {
    onError();
    return;
  }
  const rbody: { data: Quiz } = await res.json();
  rbody.data.questions.forEach((question) => {
    question.id = nanoid();
    question.answers.forEach((answer) => {
      answer.id = nanoid();
    });
  });
  onSuccess(rbody.data);
}
