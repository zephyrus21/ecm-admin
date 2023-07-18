import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    if (!productId)
      return new NextResponse('ProductId is required', { status: 400 });

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!name) return new NextResponse('Label is required', { status: 400 });
    if (!price) return new NextResponse('Price is required', { status: 400 });
    if (!categoryId)
      return new NextResponse('Category is required', { status: 400 });
    if (!sizeId) return new NextResponse('Size is required', { status: 400 });
    if (!colorId) return new NextResponse('Color is required', { status: 400 });
    if (!images || !images.length)
      return new NextResponse('Images are required', { status: 400 });
    if (!storeId)
      return new NextResponse('StoreId is required', { status: 400 });
    if (!productId)
      return new NextResponse('ProductId is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
