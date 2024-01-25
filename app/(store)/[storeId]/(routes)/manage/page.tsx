import EntitiesPage from "./components/EntitiesPage";
import prisma from "@/lib/prisma";

interface ManagePageProps {
  params: {
    storeId: string;
  };
}

const ManagePage = async ({ params }: ManagePageProps) => {
  const latestBillboard = await prisma.billboard.findFirst({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestCategory = await prisma.category.findFirst({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestColor = await prisma.color.findFirst({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestSize = await prisma.size.findFirst({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <EntitiesPage
      billboard={latestBillboard}
      category={latestCategory}
      color={latestColor}
      size={latestSize}
    />
  );
};

export default ManagePage;
