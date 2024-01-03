"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine } from "lucide-react";
import BillboardsPage from "../(routes)/billboards/page";

// interface EntitiesPageProps {
//   storeId: string;
// }

const EntitiesPage = () => {
  return (
    <div className="flex h-dvh lg:flex-row flex-col w-full">
      <div className={cn("h-1/4 lg:h-full lg:w-1/4 lg:border-r")}>
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/billboards">Billboards</Link>
          <p className="text-sm text-muted-foreground">
            Manage store billboards
          </p>
        </div>
      </div>

      <div className={cn("h-1/4 lg:h-full lg:w-1/4 lg:border-r ")}>
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/billboards">Categories</Link>
          <p className="text-sm text-muted-foreground">
            Manage store categories
          </p>
        </div>
      </div>

      <div className={cn("h-1/4 lg:h-full lg:w-1/4 lg:border-r ")}>
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/billboards">Colors</Link>
          <p className="text-sm text-muted-foreground">Manage store colors</p>
        </div>
      </div>

      <div className={cn("h-1/4 lg:w-1/4 ")}>
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/billboards">Sizes</Link>
          <p className="text-sm text-muted-foreground">Manage store sizes</p>
        </div>
      </div>
    </div>
  );
};

export default EntitiesPage;
