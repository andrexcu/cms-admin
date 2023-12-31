import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { NavItems } from "./NavItems";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/app/actions/getCurrentUser";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "../theme-toggle";

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

  return (
    <div className="border-b flex flex-col lg:flex-row justify-between items-center px-4 gap-x-2">
      <div className="flex flex-row h-20 items-center px-4 justify-center w-full">
        <div className="flex flex-row gap-8 items-center">
          <NavItems className=" rounded-full bg-slate-500/15 p-4" />
        </div>
      </div>
      <div className="w-full h-10 lg:hidden flex flex-row justify-center items-center">
        <ModeToggle />
        <UserMenu currentUser={currentUser} />
      </div>
      <div className="flex flex-row h-20 justify-center items-center w-full">
        <StoreSwitcher items={stores} className="" />
      </div>
      <div className="h-20 hidden lg:flex flex-row w-full justify-end items-center">
        <ModeToggle />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
