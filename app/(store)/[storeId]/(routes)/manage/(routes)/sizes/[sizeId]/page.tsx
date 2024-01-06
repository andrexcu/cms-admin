import prisma from "@/lib/prisma";
import SizeForm from "./components/SizeForm";

const CategoryPage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default CategoryPage;
