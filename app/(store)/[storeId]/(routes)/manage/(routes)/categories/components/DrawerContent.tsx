"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import { useParams } from "next/navigation";
import { Billboard } from "@prisma/client";

interface CategoryFormProps {
  billboards: Billboard[];
}

export function AddNewCategoryDrawer({ billboards }: CategoryFormProps) {
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
                Add a new category
              </p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <CategoryForm billboards={billboards} />
    </Drawer>
  );
}
