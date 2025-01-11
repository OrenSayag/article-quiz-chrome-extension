import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { browser } from "wxt/browser";
import { MessageType } from "@/entrypoints/types.ts";
import links from "@/lib/links.ts";

interface Props {
  className?: string;
}

export const SupportLink: FC<Props> = ({ className }) => {
  return (
    <>
      <Button
        className={cn(className)}
        variant={"link"}
        onClick={async () => {
          await browser.runtime.sendMessage({
            messageType: MessageType.GO_TO_URL,
            content: links.TICKETS_ENDPOINT,
          });
        }}
      >
        Support
      </Button>
    </>
  );
};
