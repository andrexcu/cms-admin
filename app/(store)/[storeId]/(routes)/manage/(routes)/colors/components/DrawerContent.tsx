"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import ColorForm from "./ColorForm";
import { useParams } from "next/navigation";
import { Color } from "@prisma/client";

interface ColorFormProps {
  colors: Color[];
}

export function AddNewColorDrawer() {
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
                Add a new Color
              </p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <ColorForm />
    </Drawer>
  );
}
