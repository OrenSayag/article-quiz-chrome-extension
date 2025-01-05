import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { Switch } from "@/components/ui/switch.tsx";

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
      <div className={cn(className)}>
        <label className={"mb-6 underline text-lg font-semibold"}>
          Enable Quizzes for this Site
        </label>
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
