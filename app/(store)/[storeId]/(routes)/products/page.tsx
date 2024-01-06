import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import BillboardClient from "./components/Client";
import { AddNewBillboardDrawer } from "./components/DrawerContent";
import prisma from "@/lib/prisma";
import { BillboardColumn } from "./components/Columns";
import { format } from "date-fns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <BillboardClient data={formattedBillboards} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-9">
        <AddNewBillboardDrawer />
      </div>
    </>
  );
};

export default BillboardsPage;
