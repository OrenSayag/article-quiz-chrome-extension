import links from "@/lib/links.ts";
import { UserQuizHistoryLog } from "@/types/user/types.ts";
import { useEffect, useState, useTransition } from "react";
import { browser } from "wxt/browser";
import ExtMessage, { MessageType } from "@/entrypoints/types.ts";

export const useQuizzesHistory = () => {
  const [pendingGet, startGet] = useTransition();
  const [error, setError] = useState<string>();
  const [history, setHistory] = useState<UserQuizHistoryLog[]>();
  const get = () => {
    startGet(() => {
      getHistory({
        onSuccess: (h) => {
          console.log("run onSuccess, setting history to:");
          console.log({ h });
          setHistory(h);
        },
        onError() {
          setError("Failed to update");
        },
      });
    });
  };
  useEffect(() => {
    get();
    browser.runtime.onMessage.addListener(
      (message: ExtMessage, sender, sendResponse) => {
        if (message.messageType == MessageType.GOT_QUIZ) {
          console.log("Got message GOT_QUIZ. Refetching history");
          get();
        }
      },
    );
  }, []);
  return {
    error,
    pendingGet,
    history,
  };
};

async function getHistory({
  onSuccess,
  onError,
}: {
  onError(): void;
  onSuccess(history: UserQuizHistoryLog[]): void;
}) {
  const res = await fetch(links.HISTORY_ENDPOINT, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const success = res.status === 200;
  const rbody = await res.json();
  console.log({
    rbody,
    status: res.status,
  });
  if (!success) {
    onError();
    return;
  }
  const history = rbody.history;
  onSuccess(history);
}
