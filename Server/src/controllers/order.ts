import { Request, Response } from 'express';
import cron from 'node-cron';
import prisma from '../../DB/prisma';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { updateOrderStatusSchema } from '../models/order';

export let generatedOrderNumber = 1;

cron.schedule('0 0 * * *', async () => {
  generatedOrderNumber = 1;
  console.log(
    'running a task every minute where a new order is generated : ' + generatedOrderNumber,
  );
});

export const createOrders = async (req: Request, res: Response) => {
  const cart = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
    },
    include: {
      product: true,
    },
  });

  const netAmount = cart.reduce(
    (total, item) => total + Number(item.product.price) * Number(item.quantity),
    0,
  );

  const totalQuantity = cart.reduce((total, item) => total + Number(item.quantity), 0);

  const orderNumber = generatedOrderNumber++;

  const order = await prisma.order.create({
    data: {
      userId: Number(req.user?.id),
      orderNumber: orderNumber,
      netAmount: netAmount,
      totalQuantity: totalQuantity,
    },
  });

  if (cart.length === 0) {
    throw new BadRequestException('Cart is empty', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  let orderItems: any = [];
  cart.forEach(async (item, index) => {
    orderItems[index] = await prisma.orderItem.create({
      data: {
        orderId: Number(order.id),
        quantity: Number(item.quantity),
        productId: Number(item.product.id),
        price: Number(item.product.price),
      },
    });
  });

  const orderEvent = await prisma.orderEvent.create({
    data: {
      orderId: Number(order.id),
    },
  });

  //   await prisma.cartItem.deleteMany({
  //     where: {
  //       userId: Number(req.user?.id),
  //     },
  //   });

  res.status(200).json({
    message: 'Order created successfully',
    order: order,
    orderEvent: orderEvent,
    orderItems: orderItems,
  });
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUniqueOrThrow({
    where: {
      id: Number(id),
    },
    include: {
      OrderItem: {
        include: {
          product: true,
        },
      },
      OrderEvent: true,
    },
  });

  res.status(200).json({
    message: 'Order fetched successfully',
    data: order,
  });
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findFirstOrThrow({
    where: {
      id: Number(id),
    },
    include: {
      OrderItem: true,
      OrderEvent: true,
    },
  });

  if (!order) {
    throw new BadRequestException('Order not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  await prisma.orderEvent.deleteMany({
    where: {
      orderId: Number(order.id),
    },
  });

  await prisma.orderItem.deleteMany({
    where: {
      orderId: Number(order.id),
    },
  });

  await prisma.order.delete({
    where: {
      id: Number(order.id),
    },
  });

  res.status(200).json({
    message: 'Order deleted successfully',
    data: order,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: {
      OrderItem: {
        include: {
          product: true,
        },
      },
      OrderEvent: true,
    },
  });

  res.status(200).json({
    message: 'Orders fetched successfully',
    data: orders,
  });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  updateOrderStatusSchema.parse(req.body);

  const { id } = req.params;
  const { status } = req.body;

  let order = await prisma.order.findUnique({
    where: {
      id: Number(id),
      userId: Number(req.user?.id),
    },
  });

  if (!order) {
    throw new BadRequestException('Order not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  const orderEvent = await prisma.orderEvent.findFirst({
    where: {
      orderId: Number(order.id), // Use `orderId` to find the correct orderEvent
    },
  });

  if (!orderEvent) {
    throw new BadRequestException('Order event not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  order = await prisma.order.update({
    where: {
      id: Number(order.id),
      userId: Number(req.user?.id),
    },
    data: {
      orderStatus: status,
    },
  });

  const updatedOrderEvent = await prisma.orderEvent.update({
    where: {
      id: orderEvent.id, // Use the `id` of the orderEvent to uniquely identify the record
    },
    data: {
      status: status, // Update the status field
    },
  });

  res.status(200).json({
    message: 'Order updated successfully',
    data: order,
    orderEvent: updatedOrderEvent,
  });
};
