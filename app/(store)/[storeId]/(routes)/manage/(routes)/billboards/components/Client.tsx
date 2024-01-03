"use client";

import Heading from "@/components/ui/heading";
import { ArrowLeftToLine, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { BillboardColumn, Columns } from "./Columns";
import { Button } from "@/components/ui/button";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards`}
          description="Manage your store's billboard"
        />
        <Link href={`/${params.storeId}/manage`}>
          <ArrowLeftToLine className="transform rotate-180 hover:translate-x-2 transition duration-300" />
        </Link>
      </div>
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="label" />
    </>
  );
};

export default BillboardClient;
