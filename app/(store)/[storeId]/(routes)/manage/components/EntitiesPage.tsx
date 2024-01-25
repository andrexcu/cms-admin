"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine } from "lucide-react";
import BillboardsPage from "../(routes)/billboards/page";
import { Billboard, Category, Color, Size } from "@prisma/client";
import { format } from "date-fns";

interface EntitiesPageProps {
  billboard: Billboard | null;
  category: Category | null;
  color: Color | null;
  size: Size | null;
}

const EntitiesPage = ({
  billboard,
  category,
  color,
  size,
}: EntitiesPageProps) => {
  return (
    <div className="flex h-dvh lg:flex-row flex-col">
      <div
        className={cn(
          "flex flex-col h-1/4 lg:h-full lg:w-1/4 lg:border-r justify-between"
        )}
      >
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center"
          )}
        >
          <Link href="manage/billboards">Billboards</Link>
          <p className="text-sm text-muted-foreground">
            Manage store billboards
          </p>
        </div>

        {billboard && (
          <div className="hidden lg:flex flex-col text-center border-y p-8 ">
            <p className="text-muted-foreground text-sm font-semibold">
              Most Recent Billboard:
            </p>
            <p className="font-semibold">{billboard?.label}</p>
            <p className="font-semibold text-muted-foreground text-sm">
              {format(billboard?.createdAt as Date, "MMMM do, yyyy")}
            </p>
          </div>
        )}
        <div></div>
      </div>
      <div
        className={cn(
          "flex flex-col justify-between h-1/4 lg:h-full lg:w-1/4 lg:border-r "
        )}
      >
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/categories">Categories</Link>
          <p className="text-sm text-muted-foreground">
            Manage store categories
          </p>
        </div>
        {category && (
          <div className="hidden lg:flex flex-col text-center border-y p-8 ">
            <p className="text-muted-foreground text-sm font-semibold">
              Most Recent Category:
            </p>
            <p className="font-semibold">{category?.name}</p>
            <p className="font-semibold text-muted-foreground text-sm">
              {format(category?.createdAt as Date, "MMMM do, yyyy")}
            </p>
          </div>
        )}
        <div></div>
      </div>

      <div
        className={cn(
          "flex flex-col justify-between h-1/4 lg:h-full lg:w-1/4 lg:border-r "
        )}
      >
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/colors">Colors</Link>
          <p className="text-sm text-muted-foreground">Manage store colors</p>
        </div>
        {color && (
          <div className="hidden lg:flex flex-col text-center border-y p-8 ">
            <p className="text-muted-foreground text-sm font-semibold">
              Most Recent Color:
            </p>
            <p className="font-semibold">{color?.name}</p>
            <p className="font-semibold text-muted-foreground text-sm">
              {format(color?.createdAt as Date, "MMMM do, yyyy")}
            </p>
          </div>
        )}
        <div></div>
      </div>

      <div
        className={cn("flex flex-col justify-between h-1/4 lg:h-full lg:w-1/4")}
      >
        <div
          className={cn(
            "font-bold text-xl w-full flex pt-8 flex-col items-center justify-center "
          )}
        >
          <Link href="manage/sizes">Sizes</Link>
          <p className="text-sm text-muted-foreground">Manage store sizes</p>
        </div>
        {size && (
          <div className="hidden lg:flex flex-col text-center border-y p-8 ">
            <p className="text-muted-foreground text-sm font-semibold">
              Most Recent Size:
            </p>
            <p className="font-semibold">{size?.name}</p>
            <p className="font-semibold text-muted-foreground text-sm">
              {format(size?.createdAt as Date, "MMMM do, yyyy")}
            </p>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default EntitiesPage;
