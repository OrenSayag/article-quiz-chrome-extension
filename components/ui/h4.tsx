import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils.ts";

type Props = ComponentPropsWithoutRef<"h4">;

export function H4({ className, ...props }: Props) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight")}
      {...props}
    />
  );
}
