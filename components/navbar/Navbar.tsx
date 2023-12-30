import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { NavItems } from "./NavItems";

const Navbar = async () => {
  //   const { userId } = auth();

  //   if (!userId) {
  //     redirect("/sign-in");
  //   }

  //   const stores = await prisma.store.findMany({
  //     where: {
  //       userId,
  //     },
  //   });

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}

        <NavItems className="mx-6 hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
