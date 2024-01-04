import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import CategoryClient from "./components/Client";
import { AddNewCategoryDrawer } from "./components/DrawerContent";
import prisma from "@/lib/prisma";
import { CategoryColumn } from "./components/Columns";
import { format } from "date-fns";

interface CategorysPageProps {
  params: {
    storeId: string;
  };
}

const CategorysPage = async ({ params }: CategorysPageProps) => {
  const Categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = Categories.map((item) => ({
    id: item.id,
    name: item.name,
    label: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-9">
        <AddNewCategoryDrawer billboards={billboards} />
      </div>
    </>
  );
};

export default CategorysPage;
