import prisma from "@/lib/prisma";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce(
      (orderSum, item) => orderSum + item.product.price,
      0
    );
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
