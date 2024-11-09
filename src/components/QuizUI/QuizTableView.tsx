"use client"

import { ColumnDef } from "@tanstack/react-table"
import { QuizPost } from "../../types.ts"

export const columns: ColumnDef<QuizPost>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
