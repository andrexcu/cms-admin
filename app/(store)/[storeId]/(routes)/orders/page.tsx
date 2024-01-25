import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import OrdersClient from "./components/Client";

import prisma from "@/lib/prisma";
import { OrderColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),

    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 p-8 pt-6">
          <OrdersClient data={formattedOrders} />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
