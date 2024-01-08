"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import {
  Category,
  Color,
  Image as ImageType,
  Product,
  Size,
} from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface ProductItemProps {
  latestProduct:
    | (Product & { images: ImageType[] } & { category: Category } & {
        size: Size;
      } & { color: Color })
    | null;
}

const ProductItem = ({ latestProduct }: ProductItemProps) => {
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 ">
      <Carousel
        className={`border border-secondary w-[300px] lg:w-1/3 overflow-hidden
        
          }`}
        orientation={`${
          (latestProduct?.images.length as number) > 1
            ? "horizontal"
            : "vertical"
        }`}
      >
        <CarouselContent className="m-2">
          {latestProduct?.images.map((image) => (
            <CarouselItem key={image.url} className="p-2">
              <Card className="rounded-lg">
                <CardContent className="relative h-[200px] bg-secondary flex items-center justify-center rounded-lg">
                  <Image
                    src={image.url}
                    alt="image"
                    fill
                    sizes="100vh"
                    className={`object-cover h-[400px] ${
                      latestProduct.images.length <= 1
                        ? "transition duration-300 ease-in-out transform hover:scale-110 opacity-70"
                        : ""
                    }`}
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className=" flex flex-col w-full p-2 gap-4 ">
        <div className="text-muted-foreground font-semibold text-xl">
          MOST RECENT PRODUCT
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-x-2">
          <p className="space-x-1">
            <span className="text-muted-foreground">Name: </span>
            <span>{latestProduct?.name}</span>
          </p>
          <p className="space-x-1">
            <span className="text-muted-foreground">Price:</span>
            <span>{formatter.format(latestProduct?.price as number)}</span>
          </p>
          <p className="space-x-1">
            <span className="text-muted-foreground">Category:</span>
            <span>{latestProduct?.category.name}</span>
          </p>
          <p className="space-x-1">
            <span className="text-muted-foreground">Created: </span>
            <span>
              {format(latestProduct?.createdAt as Date, "MMMM do, yyyy")}
            </span>
          </p>
        </div>

        <Separator className="w-full" />
        <div className="flex flex-row gap-x-4">
          <p className="space-x-1">
            <span className="text-muted-foreground font-mono">
              {latestProduct?.isArchived
                ? "This Product is archived"
                : "This Product is not archived"}
            </span>
          </p>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-row gap-x-4">
          <p className="space-x-1">
            <span className="text-muted-foreground font-mono">
              {latestProduct?.isFeatured
                ? "This Product is featured"
                : "This Product is not featured"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
