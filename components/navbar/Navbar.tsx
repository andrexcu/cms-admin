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
    <div className="border-b flex flex-col lg:flex-row">
      <div className="flex h-20 items-center justify-center pl-4 py-4 gap-4">
        <NavItems className="rounded-full bg-slate-500/15 p-4" />
        <StoreSwitcher items={stores} className="hidden lg:flex" />
      </div>
      {/* <div className="w-full h-10 lg:hidden flex flex-row justify-center items-center">

      </div> */}
      <div className="flex flex-row h-20 justify-center items-center w-full gap-x-2">
        <div className="flex flex-row lg:hidden">
          <ModeToggle />
          <div className="sm:flex">
            <UserMenu currentUser={currentUser} />
          </div>
        </div>

        <StoreSwitcher items={stores} className="lg:hidden" />
      </div>
      <div className="h-20 hidden lg:flex flex-row w-full justify-end items-center pr-4">
        <ModeToggle />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
