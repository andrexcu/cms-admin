"use client";

import Heading from "@/components/ui/heading";
import { ArrowLeftToLine, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { ProductColumn, Columns } from "./Columns";
import { Button } from "@/components/ui/button";
import ProductItem from "./ProductItem";
import { Category, Color, Image, Product, Size } from "@prisma/client";

interface ProductClientProps {
  data: ProductColumn[];
  latestProduct:
    | (Product & { images: Image[] } & { category: Category } & {
        size: Size;
      } & { color: Color })
    | null;
}

const ProductClient = ({ data, latestProduct }: ProductClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Heading
            title={`Products`}
            description="Manage your store's Product"
            length={data.length}
          />
        </div>
      </div>
      <Separator />
      <ProductItem latestProduct={latestProduct} />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
      <Separator />

      <DataTable columns={Columns} data={data} searchKey="name" />
    </>
  );
};

export default ProductClient;
