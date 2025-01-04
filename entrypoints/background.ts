import { browser } from "wxt/browser";
import ExtMessage, { MessageType } from "@/entrypoints/types.ts";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id }); // background.js

  // @ts-ignore
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error));

  // background.js
  browser.runtime.onMessage.addListener(
    async (
      message: unknown,
      sender,
      sendResponse: (message: any) => void,
    ): Promise<true> => {
      console.log("background:");
      console.log(message);
      const msg: ExtMessage = message as ExtMessage;
      if (
        msg.messageType === MessageType.openDashboardLogin ||
        msg.messageType === MessageType.changeTheme ||
        msg.messageType === MessageType.LOGGED_IN ||
        msg.messageType === MessageType.changeLocale
      ) {
        let tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tabs) {
          for (const tab of tabs) {
            await browser.tabs.sendMessage(tab.id!, msg);
          }
        }
      }
      return true;
    },
  );

  const externalListener = async (msg: unknown): Promise<true> => {
    if ((msg as ExtMessage).messageType === MessageType.LOGGED_IN) {
      const tabs = await browser.tabs.query({
        currentWindow: true,
      });

      for (const tab of tabs) {
        const port = browser.tabs.connect(tab.id!);
        port.postMessage(msg);
      }
    }
    return true;
  };

  // background.js
  browser.runtime.onMessageExternal.addListener(externalListener);
});
