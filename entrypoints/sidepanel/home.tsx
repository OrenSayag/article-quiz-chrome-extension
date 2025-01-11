// HomePage.js
import React from "react";
import { EnabledForThisSite } from "@/components/molecules/enabled-for-this-site";
import { useTheme } from "@/components/theme-provider.tsx";
import { cn } from "@/lib/utils.ts";
import { UserInfo } from "@/types/auth";
import { useEnabledSites } from "@/hooks/use-enabled-sites.ts";
import { Welcome } from "@/components/molecules/welcome";
import { UpdateEnabledSitesParams } from "@/types/user/types.ts";
import { UserQuizHistory } from "@/components/organisms/user-quiz-history";
import { SupportLinks } from "@/components/molecules/support-links";

type Props = {
  userInfo: UserInfo;
  origin: string;
  onUpdateEnabledSites(input: UpdateEnabledSitesParams): void;
  pendingUpdateEnabledSites?: boolean;
};

export function Home({
  userInfo,
  origin,
  onUpdateEnabledSites,
  pendingUpdateEnabledSites,
}: Props) {
  const { theme } = useTheme();
  const { siteEnabled } = useEnabledSites({
    userInfo,
    origin,
  });
  return (
    <div className={cn(theme, "dark:text-white")}>
      <Welcome userInfo={userInfo} className={"mb-4"} />
      <div>
        <EnabledForThisSite
          disabled={pendingUpdateEnabledSites}
          origin={origin}
          onSwitch={(enabled) => {
            onUpdateEnabledSites({
              enabledSites: enabled
                ? [...userInfo.enabledSites, origin]
                : userInfo.enabledSites.filter((s) => s !== origin),
            });
          }}
          value={Boolean(siteEnabled)}
        />
      </div>
      <SupportLinks className={"my-2"} />
      <UserQuizHistory />
    </div>
  );
}
