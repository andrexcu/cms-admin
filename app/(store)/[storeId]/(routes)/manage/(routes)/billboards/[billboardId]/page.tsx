import prisma from "@/lib/prisma";
import BillboardForm from "./components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
