import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import BillboardClient from "./components/Client";
import { AddNewBillboardDrawer } from "./components/DrawerContent";
import prisma from "@/lib/prisma";
import { ProductColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

interface ProductsPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  const product = await prisma.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <BillboardClient data={formattedProducts} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-9">
        <AddNewBillboardDrawer
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </>
  );
};

export default ProductsPage;
