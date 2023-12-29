import getCurrentUser from "../actions/getCurrentUser";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <>NO USER</>;

  return <>{children}</>;
}
