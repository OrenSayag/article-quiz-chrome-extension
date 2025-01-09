import { ApiBaseResponse } from "@/types/app/types.ts";

export type QuizAnswer = {
  isCorrect: boolean;
  text: string;
  selected?: boolean;
  id: string;
};

export type QuizQuestion = {
  question: string;
  id: string;
  answers: QuizAnswer[];
  sourceQuote: string;
  answered?: Answered;
};

export type Quiz = {
  questions: QuizQuestion[];
};

export type GetQuizResponseBody = ApiBaseResponse<Quiz>;

export type QuizSourceType = "url" | "html";

export enum Answered {
  CORRECT = "correct",
  WRONG = "wrong",
}
