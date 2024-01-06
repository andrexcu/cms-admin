import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import ColorClient from "./components/Client";
import { AddNewColorDrawer } from "./components/DrawerContent";
import prisma from "@/lib/prisma";
import { ColorColumn } from "./components/Columns";
import { format } from "date-fns";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

const ColorsPage = async ({ params }: ColorsPageProps) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <ColorClient data={formattedColors} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-9">
        <AddNewColorDrawer />
      </div>
    </>
  );
};

export default ColorsPage;
