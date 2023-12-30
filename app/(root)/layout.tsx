import getCurrentUser from "../actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  if (!userId) {
    redirect("/auth");
  }

  // const store = await prisma.store.findFirst({
  //   where: {
  //     userId,
  //   },
  // });

  // if (store) {
  //   redirect(`/${store.id}`);
  // }

  return <>{children}</>;
}
