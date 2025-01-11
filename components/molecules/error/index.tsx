import React, { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { CircleX } from "lucide-react";
import { useTheme } from "@/components/theme-provider.tsx";
import { SupportLink } from "@/components/atoms/support-link";

interface Props {
  className?: string;
}

export const Error: FC<Props> = ({ className }) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={cn(
          theme,
          "dark:text-white flex items-center justify-center flex-col gap-1",
          className,
        )}
      >
        <h3 className={"text-5xl text-destructive"}>Error</h3>
        <CircleX className={"stroke-destructive"} />
        <p>
          Please contact <SupportLink />
        </p>
        <p className="text-xs text-center">
          You can also mail us at orensayag500@gmail.com
        </p>
      </div>
    </>
  );
};
