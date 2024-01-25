import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { CategorySchema } from "@/lib/Validation/CategoriesValidation";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;
    const body = await req.json();

    const parsedForm = CategorySchema.safeParse(body);

    if (!parsedForm.success) {
      return NextResponse.json(parsedForm.error, { status: 422 });
    }
    const { name, billboardId } = parsedForm.data;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!billboardId) {
      return new NextResponse("Billboard id is required", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const categories = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
