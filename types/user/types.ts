import { ApiBaseResponse } from "@/types/app/types.ts";

export type UpdateEnabledSitesParams = {
  enabledSites: string[];
};

export type UpdateEnabledSitesResponse = ApiBaseResponse<undefined>;

export type UserQuizHistoryLog = {
  quizSource: string;
  faviconUrl?: string;
  createdAt: string;
  title?: string;
};
