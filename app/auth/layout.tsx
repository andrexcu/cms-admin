import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <LoginModal />
      <RegisterModal />
      {children}
    </div>
  );
}
