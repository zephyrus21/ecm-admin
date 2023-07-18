import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    if (!categoryId)
      return new NextResponse('categoryId is required', { status: 400 });

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, categoryId },
  }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!name) return new NextResponse('Name is required ', { status: 400 });
    if (!billboardId)
      return new NextResponse('BillboardId is required', { status: 400 });
    if (!categoryId)
      return new NextResponse('categoryId is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, categoryId },
  }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
