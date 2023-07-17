import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params: { colorId } }: { params: { colorId: string } }
) {
  try {
    if (!colorId)
      return new NextResponse('SizeId is required', { status: 400 });

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name, value } = body;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });
    if (!value) return new NextResponse('Value is required', { status: 400 });
    if (!colorId)
      return new NextResponse('SizeId is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
