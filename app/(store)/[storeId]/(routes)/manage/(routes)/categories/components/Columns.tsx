"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type CategoryColumn = {
  id: string;
  name: string;
  label: string;
  createdAt: string;
};

// const truncatedText = truncateText(label);

export const Columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.label,
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
