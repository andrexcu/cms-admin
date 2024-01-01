"use client";

import Avatar from "@/components/Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { AlignJustify, Shield, UserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  return (
    <Popover>
      <div className=" relative flex flex-row">
        <PopoverTrigger asChild>
          <div className="flex flex-row items-center gap-3">
            <div
              className="
                py-1.5
                px-4
                border
                
                flex
                flex-row
                items-center
                rounded-full
                cursor-pointer
                hover:shadow-md
            "
            >
              {/* <AlignJustify /> */}
              {/* <Shield size={20} /> */}
              <span className="font-bold tracking-wide">ADMIN</span>
              {/* <div className="pl-2 hidden lg:flex">
                <Avatar src={currentUser?.image} />
              </div> */}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-row justify-center w-28 p-0">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={signOut} label="Sign out" />
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default UserMenu;
