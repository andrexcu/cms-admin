import LoginModal from "@/components/modals/LoginModal";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <LoginModal />
      {children}
    </div>
  );
}
