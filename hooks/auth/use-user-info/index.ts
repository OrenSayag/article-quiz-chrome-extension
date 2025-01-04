import { UserInfo } from "@/types/auth";
import { useEffect, useState } from "react";
import links from "@/lib/links.ts";

type Output = {
  userInfo?: UserInfo;
  notAuthenticated?: boolean;
  retry(): void;
  error?: boolean;
};

export const useUserInfo = (): Output => {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const get = () =>
    getUserInfo({
      onError() {
        setError(true);
      },
      onSuccess: setUserInfo,
    });
  useEffect(() => {
    get();
  }, []);
  const retry = () => {
    get();
  };
  return {
    notAuthenticated: !userInfo,
    retry,
    error,
    userInfo,
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
    onError();
    return;
  }
  onSuccess(await res.json());
}
