"use client";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { NavItems } from "./NavItems";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/app/actions/getCurrentUser";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "../theme-toggle";
import { useEffect, useRef, useState } from "react";

interface NavMainProps {
  stores: any;
  currentUser: any;
}

const NavMain = ({ stores, currentUser }: NavMainProps) => {
  return (
    <header
      className={`padding-x z-40 w-full bg-pale-blue/90
      
  `}
    >
      <nav className="border-b flex flex-col lg:flex-row justify-between">
        <div className="flex h-20 items-center justify-center pl-4 gap-4">
          <NavItems
            stores={stores}
            className="rounded-full bg-slate-500/15 p-2"
          />
          {/* <StoreSwitcher items={stores} className="hidden lg:flex" /> */}
        </div>

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
      </nav>
    </header>
  );
};

export default NavMain;
