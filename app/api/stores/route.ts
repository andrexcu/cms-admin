import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;

    const body = await req.json();
    const { name, type } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
        type,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
