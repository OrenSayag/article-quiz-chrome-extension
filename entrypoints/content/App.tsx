import React, { useEffect, useState } from "react";
import "./App.module.css";
import "../../assets/main.css";
import { browser } from "wxt/browser";
import ExtMessage, { MessageType } from "@/entrypoints/types.ts";
import { useTheme } from "@/components/theme-provider.tsx";
import { QuizDialog } from "@/components/quiz/quiz-dialog";
import links from "@/lib/links.ts";
import { useUserInfo } from "@/hooks/auth/use-user-info";

export default ({ container }: { container?: HTMLElement }) => {
  const [showContent, setShowContent] = useState(true);
  const { theme, toggleTheme } = useTheme();

  function domLoaded() {
    console.log("dom loaded");
  }

  const { notAuthenticated, retry: retryGetUserInfo } = useUserInfo();

  useEffect(() => {
    if (document.readyState === "complete") {
      // load event has already fired, run your code or function here
      console.log("dom complete");
      domLoaded();
    } else {
      // load event hasn't fired, listen for it
      window.addEventListener("load", () => {
        // your code here
        console.log("content load:");
        console.log(window.location.href);
        domLoaded();
      });
    }
    const serviceWorkerMessageListener = (message: unknown): undefined => {
      const msg = message as ExtMessage;
      switch (msg.messageType) {
        case MessageType.openDashboardLogin:
          openDashboardLogin();
          break;
        case MessageType.clickExtIcon:
          setShowContent(true);
          break;
        case MessageType.changeTheme:
          toggleTheme(msg.content);
          break;
      }
    };
    browser.runtime.onMessage.addListener(serviceWorkerMessageListener);
    const connectListener: Parameters<
      typeof browser.runtime.onConnect.addListener
    >[0] = (port) => {
      port.onMessage.addListener((msg) => {
        if (
          (msg as ExtMessage).messageType === MessageType.LOGGED_IN &&
          notAuthenticated
        ) {
          retryGetUserInfo();
          port.disconnect();
        }
      });
    };
    browser.runtime.onConnect.addListener(connectListener);
    return () => {
      browser.runtime.onMessage.removeListener(serviceWorkerMessageListener);
      browser.runtime.onConnect.removeListener(connectListener);
    };
  }, [notAuthenticated]);

  return (
    <div className={theme}>
      {showContent && container && (
        <div>
          <QuizDialog container={container} authenticated={!notAuthenticated} />
        </div>
      )}
    </div>
  );
};

function openDashboardLogin() {
  const a = document.createElement("a");
  a.href = links.LOGIN;
  a.target = "_blank";
  a.click();
}
