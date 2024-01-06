import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { NavItems } from "./NavItems";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/app/actions/getCurrentUser";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "../theme-toggle";
import NavMain from "./NavMain";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  if (!userId) {
    redirect("/auth");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return <NavMain stores={stores} currentUser={currentUser} />;
};

export default Navbar;
