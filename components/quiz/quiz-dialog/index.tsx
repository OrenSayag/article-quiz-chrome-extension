import React, { FC } from "react";
import { cn } from "@/lib/utils.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTheme } from "@/components/theme-provider.tsx";
import { NotAuthenticatedTemplate } from "@/components/organisms/not-authenticated";

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
          className={cn("sm:max-w-[425px]", theme, className)}
          portalContainer={container}
        >
          {authenticated && (
            <>
              <VisuallyHidden>
                <DialogHeader>
                  <DialogTitle>Quiz</DialogTitle>
                  <DialogDescription>Some quiz description</DialogDescription>
                </DialogHeader>
              </VisuallyHidden>
              <div className={cn(theme, "dark:text-white")}>
                THE QUIZ CONTENT
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </>
          )}
          {!authenticated && <NotAuthenticatedTemplate />}
        </DialogContent>
      </Dialog>
    </>
  );
};
