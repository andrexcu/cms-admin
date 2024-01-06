import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import SizeClient from "./components/Client";
import { AddNewSizeDrawer } from "./components/DrawerContent";
import prisma from "@/lib/prisma";
import { SizeColumn } from "./components/Columns";
import { format } from "date-fns";

interface SizePageProps {
  params: {
    storeId: string;
  };
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <SizeClient data={formattedSize} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-9">
        <AddNewSizeDrawer />
      </div>
    </>
  );
};

export default SizePage;
