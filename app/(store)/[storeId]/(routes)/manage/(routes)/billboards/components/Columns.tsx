"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

// const truncatedText = truncateText(label);

export const Columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
