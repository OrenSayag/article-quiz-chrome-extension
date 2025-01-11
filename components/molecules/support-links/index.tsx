import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { H4 } from "@/components/ui/h4.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { browser } from "wxt/browser";
import { MessageType } from "@/entrypoints/types.ts";
import links from "@/lib/links.ts";

interface Props {
  className?: string;
}

export const SupportLinks: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>
        <H4>Support</H4>
        <Card className={"py-3 px-2"}>
          <p>We'd love to help and get feedback</p>
          <div>
            <Button
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
          </div>
          <p className="text-xs">
            You can also mail us at orensayag500@gmail.com
          </p>
        </Card>
      </div>
    </>
  );
};
