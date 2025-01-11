import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.module.css";
import "../../assets/main.css";
import Sidebar, {
  SidebarType,
  sidebarTypeMap,
} from "@/entrypoints/sidebar.tsx";
import { browser } from "wxt/browser";
import ExtMessage, { MessageType } from "@/entrypoints/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Home } from "@/entrypoints/sidepanel/home.tsx";
import { SettingsPage } from "@/entrypoints/sidepanel/settings.tsx";
import { useTheme } from "@/components/theme-provider.tsx";
import Header from "@/entrypoints/sidepanel/header.tsx";
import { useUserInfo } from "@/hooks/auth/use-user-info";
import { NotAuthenticatedTemplate } from "@/components/organisms/not-authenticated";
import { useUpdatedEnabledSites } from "@/hooks/user/use-update-enabled-sites";
import { Error } from "@/components/molecules/error";

export default () => {
  const [showButton, setShowButton] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [sidebarType, setSidebarType] = useState<SidebarType>(SidebarType.home);
  const headTitle = useMemo(
    () => sidebarTypeMap[sidebarType].title,
    [sidebarType],
  );
  const [buttonStyle, setButtonStyle] = useState<any>();
  const [cardStyle, setCardStyle] = useState<any>();
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    browser.runtime.onMessage.addListener(
      (message: ExtMessage, sender, sendResponse) => {
        if (message.messageType == MessageType.changeTheme) {
          toggleTheme(message.content);
        }
      },
    );
  }, []);

  const {
    notAuthenticated,
    userInfo,
    retry,
    error: getUserInfoError,
  } = useUserInfo();
  const {
    error,
    update: updateEnabledSites,
    pendingUpdate: pendingUpdateEnabledSites,
  } = useUpdatedEnabledSites({
    refetchUserInfo: retry,
  });
  const { origin } = useOrigin();

  return (
    <div className={theme}>
      {
        <div className="fixed top-0 right-0 h-screen w-full bg-background z-[1000000000000] rounded-l-xl shadow-2xl">
          <Header headTitle={headTitle} />
          <Sidebar
            sideNav={(sidebarType: SidebarType) => {
              setSidebarType(sidebarType);
            }}
          />
          <main className="mr-14 grid gap-4 p-4 md:gap-8 md:p-8">
            {sidebarType === SidebarType.home && userInfo && origin && (
              <Home
                userInfo={userInfo}
                origin={origin}
                onUpdateEnabledSites={updateEnabledSites}
                pendingUpdateEnabledSites={pendingUpdateEnabledSites}
              />
            )}
            {sidebarType === SidebarType.home &&
              notAuthenticated &&
              !getUserInfoError && <NotAuthenticatedTemplate />}
            {sidebarType === SidebarType.home &&
              notAuthenticated &&
              getUserInfoError && <Error />}
            {sidebarType === SidebarType.settings && <SettingsPage />}
          </main>
        </div>
      }
      {showButton && (
        <Button className="absolute z-[100000]" style={buttonStyle}>
          send Message
        </Button>
      )}
      {
        <Card
          ref={cardRef}
          className={`absolute z-[100000] w-[300px] h-[200px] ${showCard ? "block" : "hidden"}`}
          style={cardStyle}
        ></Card>
      }
    </div>
  );
};

function useOrigin() {
  const [origin, setOrigin] = useState<string>();
  const refreshOrigin = () => {
    browser.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then(([tab]) => {
        const origin = new URL(tab.url!).origin;
        setOrigin(origin);
      });
  };
  useEffect(() => {
    refreshOrigin();
    browser.tabs.onActivated.addListener(refreshOrigin);
    browser.tabs.onUpdated.addListener(refreshOrigin);
    return () => {
      browser.tabs.onActivated.removeListener(refreshOrigin);
      browser.tabs.onUpdated.removeListener(refreshOrigin);
    };
  }, []);

  return {
    origin,
  };
}
