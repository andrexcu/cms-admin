import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SizeSchema } from "@/lib/Validation/SizesValidation";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;
    const body = await req.json();
    const parsedForm = SizeSchema.safeParse(body);

    if (!parsedForm.success) {
      return NextResponse.json(parsedForm.error, { status: 422 });
    }
    const { name, value } = parsedForm.data;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!value) {
      return new NextResponse("Value is required", {
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

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
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

    const sizes = await prisma.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
