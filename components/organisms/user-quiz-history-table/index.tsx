import { FC, useMemo } from "react";
import { Table, TableHeadData, TableRowData } from "../table";
import { format, isBefore, isThisWeek, isThisYear, isToday } from "date-fns";
import { ExternalLink } from "lucide-react";
import { UserQuizHistoryLog } from "@/types/user/types.ts";
import { cn } from "@/lib/utils.ts";
import { browser } from "wxt/browser";
import { MessageType } from "@/entrypoints/types.ts";

interface Props {
  className?: string;
  history: UserQuizHistoryLog[];
}

const tableHeads: TableHeadData[] = [
  {
    id: "favicon",
    content: "",
  },
  {
    id: "quizSource",
    content: "🌎",
  },
  {
    id: "createdAt",
    content: "⏰",
  },
];

export const UserQuizHistoryTable: FC<Props> = ({ className, history }) => {
  const { rows } = useTable({
    history,
  });
  return (
    <>
      <div
        className={cn(
          "flex-grow flex flex-col justify-between pb-2",
          className,
        )}
      >
        <Table heads={tableHeads} rows={rows} />
      </div>
    </>
  );
};

function useTable({ history }: { history: UserQuizHistoryLog[] }) {
  const rows = useMemo<TableRowData[]>(
    () =>
      history.map((l) => ({
        id: l.createdAt,
        cells: [
          {
            id: "favicon",
            content: (
              <img
                src={l.faviconUrl}
                alt={"logo"}
                className={"w-[16px] max-w-[16px]"}
              />
            ),
          },
          {
            id: "quizSource",
            className: "break-all",
            content: (
              <button
                onClick={async () => {
                  await browser.runtime.sendMessage({
                    messageType: MessageType.GO_TO_QUIZ_SOURCE,
                    content: l.quizSource,
                  });
                }}
                className={"flex gap-2"}
              >
                {l.title ?? l.quizSource}
                <span>
                  <ExternalLink size={10} />
                </span>
              </button>
            ),
          },
          {
            id: "createdAt",
            content: customFormatDate(new Date(l.createdAt)),
          },
        ],
      })),
    [history],
  );
  return {
    rows,
  };
}

function customFormatDate(date: Date) {
  const today = new Date();

  if (isToday(date)) {
    return format(date, "HH:mm");
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "EEEE, HH:mm"); // Day name (e.g., "Monday")
  }
  if (isThisYear(date)) {
    return format(date, "MMMM d, HH:mm"); // Month and day (e.g., "March 15")
  }
  if (isBefore(date, today)) {
    return format(date, "PP, , HH:mm"); // Full date (e.g., "01/10/2022")
  }
  throw new Error("logic error in customFormatDate");
}
