"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function NavItems({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/manage`,
      label: "Manage",
      active:
        pathname === `/${params.storeId}/manage` ||
        pathname === `/${params.storeId}/manage/billboards` ||
        pathname === `/${params.storeId}/manage/categories` ||
        pathname === `/${params.storeId}/manage/colors` ||
        pathname === `/${params.storeId}/manage/sizes` ||
        pathname ===
          `/${params.storeId}/manage/billboards/${params.billboardId}` ||
        pathname ===
          `/${params.storeId}/manage/categories/${params.categoryId}` ||
        pathname === `/${params.storeId}/manage/colors/${params.colorId}` ||
        pathname === `/${params.storeId}/manage/sizes/${params.sizeId}`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-md font-medium transition-colors hover:text-primary rounded-full",
            route.active
              ? "text-white dark:text-white bg-slate-950/80 rounded-full py-0.5 px-2 hover:text-gray-300"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
