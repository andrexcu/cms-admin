import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EntitiesPage from "./components/EntitiesPage";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

interface ManagePageProps {
  params: {
    storeId: string;
  };
}

const ManagePage = async () => {
  // const currentUser = await getCurrentUser();
  // const userId = currentUser?.id;

  // if (!currentUser) {
  //   redirect("/auth");
  // }

  // const store = await prisma?.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId,
  //   },
  // });

  // if (!store) {
  //   redirect("/");
  // }

  return <EntitiesPage />;
};

export default ManagePage;
