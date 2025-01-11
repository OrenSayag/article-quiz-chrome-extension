import { UserInfo } from "@/types/auth";
import { useEffect, useState } from "react";
import links from "@/lib/links.ts";

type Output = {
  userInfo?: UserInfo;
  notAuthenticated?: boolean;
  retry(): void;
  error?: boolean;
  setUserInfo(userInfo: UserInfo): void;
};

export const useUserInfo = (): Output => {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const get = (onSuccess?: (userInfo: UserInfo) => void) =>
    getUserInfo({
      onError() {
        setError(true);
      },
      onSuccess: (userInfo) => {
        setUserInfo(userInfo);
        onSuccess?.(userInfo);
      },
    });
  useEffect(() => {
    get();
  }, []);
  const retry = (onSuccess?: (userInfo: UserInfo) => void) => {
    get(onSuccess);
  };
  return {
    notAuthenticated: !userInfo,
    retry,
    error,
    userInfo,
    setUserInfo,
  };
};

async function getUserInfo({
  onSuccess,
  onError,
}: {
  onSuccess(userInfo: UserInfo): void;
  onError(): void;
}) {
  const res = await fetch(links.GET_USER_INFO_ENDPOINT, {
    credentials: "include",
  });
  const success = res.status === 200;
  if (!success) {
    if (res.status !== 401) {
      onError();
    }
    return;
  }
  onSuccess(await res.json());
}
