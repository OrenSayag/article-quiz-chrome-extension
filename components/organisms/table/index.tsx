import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import {
  Table as RawTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { cn } from "@/lib/utils.ts";

export type TableHeadData = {
  content: ReactNode;
  id: string;
  className?: string;
};

export type TableCellData = {
  content: ReactNode;
  id: string;
  className?: string;
};

export type TableRowData = {
  cells: TableCellData[];
  className?: string;
  id: string;
};

type Props = ComponentPropsWithoutRef<typeof RawTable> & {
  className?: string;
  caption?: string;
  heads: TableHeadData[];
  rows: TableRowData[];
};

export const Table: FC<Props> = ({
  className,
  caption,
  heads,
  rows,
  ...props
}) => {
  return (
    <>
      <RawTable
        containerClassname="h-fit max-h-[70vh] overflow-y-auto relative"
        className={cn(className)}
        {...props}
      >
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {heads.map(({ className, content, id }) => (
              <TableHead id={id} className={cn(className)}>
                {content}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className={"overflow-y-auto"}>
          {rows.map(({ className, id, cells }) => (
            <TableRow key={id} className={className}>
              {cells.map(({ className, id, content }) => (
                <TableCell className={className} key={id}>
                  {content}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </RawTable>
    </>
  );
};
