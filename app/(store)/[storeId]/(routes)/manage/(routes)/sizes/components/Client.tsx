"use client";

import Heading from "@/components/ui/heading";
import { ArrowLeftToLine, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { SizeColumn, Columns } from "./Columns";
import { Button } from "@/components/ui/button";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Heading
            title={`Sizes`}
            description="Manage your store's Size"
            length={data.length}
          />
        </div>
        <Link href={`/${params.storeId}/manage`}>
          <LogOut className="transform hover:translate-x-2 transition duration-300" />
        </Link>
      </div>
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
    </>
  );
};

export default SizeClient;
