import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
// import SettingsForm from "./components/SettingsForm";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsForm from "./components/SettingsForm";
// import { AlertModal } from "@/components/modals/alert-modal";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
