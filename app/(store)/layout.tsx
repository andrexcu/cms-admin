import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userId = getCurrentUser();
  //   const store = await prisma.store.findFirst({
  //     where: {
  //       id: params.storeId,
  //       userId,
  //     },
  //   });

  //   if (!store) {
  //     redirect("/");
  //   }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
