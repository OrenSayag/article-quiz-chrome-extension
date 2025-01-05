import { UserInfo } from "@/types/auth";

export function useEnabledSites({
  userInfo,
  origin,
}: {
  userInfo?: UserInfo;
  origin: string;
}) {
  const siteEnabled = userInfo?.enabledSites.some((es) => es.includes(origin));
  return {
    siteEnabled,
  };
}
