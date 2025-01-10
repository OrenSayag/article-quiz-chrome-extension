import { FC, useEffect } from "react";
import { cn } from "@/lib/utils.ts";
import { UserQuizHistoryTable } from "@/components/organisms/user-quiz-history-table";
import { H4 } from "@/components/ui/h4.tsx";
import { useQuizzesHistory } from "@/hooks/user/use-quizzes-history";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
}

export const UserQuizHistory: FC<Props> = ({ className }) => {
  const { history, pendingGet, error } = useQuizzesHistory();
  useEffect(() => {
    console.log({
      history,
    });
  }, [history]);
  return (
    <>
      <div className={cn(className)}>
        <H4 className={"underline"}>History</H4>
        {pendingGet && (
          <div className={"flex justify-center items-center p-4"}>
            <Loader2 />
          </div>
        )}
        {history && <UserQuizHistoryTable history={history} />}
        {error && <div>Error</div>}
      </div>
    </>
  );
};
