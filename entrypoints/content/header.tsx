import React from "react";

const Header = ({ headTitle }: { headTitle: string }) => {
  return (
    <div className="flex justify-start w-full h-[40px] border-b-[1px] p-4 text-card-foreground text-2xl items-center font-bold">
      {headTitle}
    </div>
  );
};

export default Header;
