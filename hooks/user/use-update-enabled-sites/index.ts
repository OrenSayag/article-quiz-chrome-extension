import links from "@/lib/links.ts";
import { UpdateEnabledSitesParams } from "@/types/user/types.ts";
import { useState, useTransition } from "react";
import { UserInfo } from "@/types/auth";
import { MessageType } from "@/entrypoints/types.ts";

type Input = {
  refetchUserInfo(onSuccess: (userInfo: UserInfo) => void): void;
};

export const useUpdatedEnabledSites = ({ refetchUserInfo }: Input) => {
  const [pendingUpdate, startUpdate] = useTransition();
  const [error, setError] = useState<string>();
  const update = (input: UpdateEnabledSitesParams) => {
    startUpdate(() => {
      updateEnabledSites({
        ...input,
        onSuccess: () => {
          refetchUserInfo((userInfo) => {
            browser.runtime.sendMessage({
              messageType: MessageType.UPDATE_USER_INFO,
              content: JSON.stringify(userInfo),
            });
          });
        },
        onError() {
          setError("Failed to update");
        },
      });
    });
  };
  return {
    error,
    pendingUpdate,
    update,
  };
};

async function updateEnabledSites({
  onSuccess,
  onError,
  ...input
}: UpdateEnabledSitesParams & {
  onError(): void;
  onSuccess(): void;
}) {
  const res = await fetch(links.UPDATE_ENABLED_SITES_ENDPOINT, {
    credentials: "include",
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const success = res.status === 200;
  if (!success) {
    onError();
    return;
  }
  onSuccess();
}
