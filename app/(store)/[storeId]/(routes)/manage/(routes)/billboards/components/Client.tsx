import Heading from "@/components/ui/heading";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
const BillboardClient = () => {
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
          <ArrowLeftToLine className="transform rotate-180" />
        </Link>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
