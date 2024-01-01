"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
      height={30}
      width={30}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
      priority
    />
  );
};

export default Avatar;
