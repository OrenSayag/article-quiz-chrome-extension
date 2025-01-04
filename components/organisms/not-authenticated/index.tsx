import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { useTheme } from "@/components/theme-provider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { browser } from "wxt/browser";
import { MessageType } from "@/entrypoints/types.ts";

interface Props {
  className?: string;
}

export const NotAuthenticatedTemplate: FC<Props> = ({ className }) => {
  const { theme } = useTheme();
  const onClick = async () => {
    await browser.runtime.sendMessage({
      messageType: MessageType.openDashboardLogin,
    });
  };
  return (
    <>
      <div
        className={cn(
          "dark:text-white flex flex-col items-center justify-center gap-3 text-center",
          theme,
          className,
        )}
      >
        <h1 className={"text-2xl"}>Welcome to Article Quiz</h1>
        <h3 className={"text-lg"}>Please login and start learning!</h3>
        <div>
          <Button onClick={onClick} className={"text-lg"}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
