import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { H4 } from "@/components/ui/h4.tsx";
import { Card } from "@/components/ui/card.tsx";
import { SupportLink } from "@/components/atoms/support-link";

interface Props {
  className?: string;
}

export const SupportLinks: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>
        <H4>Support</H4>
        <Card className={"py-3 px-2 mt-1"}>
          <p>We'd love to help and get feedback</p>
          <div>
            <SupportLink />
          </div>
          <p className="text-xs">
            You can also mail us at orensayag500@gmail.com
          </p>
        </Card>
      </div>
    </>
  );
};
