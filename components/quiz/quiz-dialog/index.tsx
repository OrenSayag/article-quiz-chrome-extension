import React, { FC } from "react";
import { cn } from "@/lib/utils.ts";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "@/components/theme-provider.tsx";
import { NotAuthenticatedTemplate } from "@/components/organisms/not-authenticated";
import { QuizContent } from "@/components/quiz/quiz-content";

interface Props {
  className?: string;
  container: HTMLElement;
  authenticated: boolean;
}

export const QuizDialog: FC<Props> = ({
  className,
  container,
  authenticated,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={"fixed z-[999999] right-4 bottom-4"}
            variant="default"
          >
            Quiz
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "sm:max-w-[80vw] overflow-y-scroll max-h-[80vh]",
            theme,
            className,
          )}
          portalContainer={container}
        >
          {authenticated && (
            <>
              <QuizContent className={"overflow-y-scroll"} />
            </>
          )}
          {!authenticated && <NotAuthenticatedTemplate />}
        </DialogContent>
      </Dialog>
    </>
  );
};
