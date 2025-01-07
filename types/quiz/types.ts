import { ApiBaseResponse } from "@/types/app/types.ts";

export type QuizAnswer = {
  isCorrect: boolean;
  text: string;
};

export type QuizQuestion = {
  question: string;
  answers: QuizAnswer[];
};

export type Quiz = {
  questions: QuizQuestion[];
};

export type GetQuizResponseBody = ApiBaseResponse<Quiz>;

export type QuizSourceType = "url" | "html";
