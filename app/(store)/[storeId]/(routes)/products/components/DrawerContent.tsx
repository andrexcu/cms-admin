"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";

import { useParams } from "next/navigation";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import ProductForm from "./ProductForm";

interface ProductFormProps {
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
}

export function AddNewBillboardDrawer({
  categories,
  sizes,
  colors,
  initialData,
}: ProductFormProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-x-4">
          <div className="group">
            <div className="flex flex-row items-center">
              <Button
                variant="outline"
                className="overflow-hidden group-hover:rounded-full group-hover:bg-accent transition-all duration-250 p-3 group-hover:p-2"
                size="lg"
              >
                <Plus size={28} />
              </Button>
              <p className="text-muted-foreground text-md opacity-0 fixed pl-16 group-hover:opacity-100 transition-opacity duration-250">
                Add a new billboard
              </p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <ProductForm
        categories={categories}
        sizes={sizes}
        colors={colors}
        initialData={initialData}
      />
    </Drawer>
  );
}
