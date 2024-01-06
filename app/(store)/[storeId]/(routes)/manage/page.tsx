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
  return <EntitiesPage />;
};

export default ManagePage;
