import { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { UserInfo } from "@/types/auth";

interface Props {
  className?: string;
  userInfo: UserInfo;
}

export const Welcome: FC<Props> = ({ className, userInfo }) => {
  return (
    <>
      <div className={cn("text-lg font-semibold", className)}>
        {getGreeting()}, {userInfo.name.split(" ")[0]}
      </div>
    </>
  );
};

function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
