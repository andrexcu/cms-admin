"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { OrderColumn, columns } from "./Columns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Heading
            title={`Orders`}
            description="Manage your store's Order"
            length={data.length}
          />
        </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
