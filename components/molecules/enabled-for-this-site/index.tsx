import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { H4 } from "@/components/ui/h4.tsx";

interface Props {
  className?: string;
  onSwitch(checked: boolean): void;
  value: boolean;
  origin: string;
  disabled?: boolean;
}

export const EnabledForThisSite: FC<Props> = ({
  className,
  value,
  onSwitch,
  origin,
  disabled,
}) => {
  return (
    <>
      <div className={cn("flex flex-col gap-2", className)}>
        <H4>Enable Quizzes for this Site</H4>
        <p>{origin}</p>
        <Switch
          disabled={disabled}
          onCheckedChange={onSwitch}
          checked={value}
        />
      </div>
    </>
  );
};
