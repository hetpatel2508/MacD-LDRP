import { Request, Response } from 'express';
import cron from 'node-cron';
import prisma from '../../DB/prisma';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { updateOrderStatusSchema } from '../models/order';
import { OrderServingTypeOptions } from '@prisma/client';

export let generatedOrderNumber = 1;

cron.schedule('0 0 * * *', async () => {
  generatedOrderNumber = 1;
  console.log(
    'running a task every minute where a new order is generated : ' + generatedOrderNumber,
  );
});

// export const createOrders = async (req: Request, res: Response) => {
//   const cart = await prisma.cartItem.findMany({
//     where: {
//       userId: Number(req.user?.id),
//     },
//     include: {
//       product: true,
//     },
//   });

//   const netAmount = cart.reduce(
//     (total, item) => total + Number(item.product.price) * Number(item.quantity),
//     0,
//   );

//   const totalQuantity = cart.reduce((total, item) => total + Number(item.quantity), 0);

//   const orderNumber = generatedOrderNumber++;

//   const order = await prisma.order.create({
//     data: {
//       userId: Number(req.user?.id),
//       orderNumber: orderNumber,
//       netAmount: netAmount,
//       totalQuantity: totalQuantity,
//     },
//   });

//   if (cart.length === 0) {
//     throw new BadRequestException('Cart is empty', ErrorCode.UNPROCESSABLE_ENTITY);
//   }

//   let orderItems: any = [];
//   cart.forEach(async (item, index) => {
//     orderItems[index] = await prisma.orderItem.create({
//       data: {
//         orderId: Number(order.id),
//         quantity: Number(item.quantity),
//         productId: Number(item.product.id),
//         price: Number(item.product.price),
//       },
//     });
//   });

//   const orderEvent = await prisma.orderEvent.create({
//     data: {
//       orderId: Number(order.id),
//     },
//   });

//   //   await prisma.cartItem.deleteMany({
//   //     where: {
//   //       userId: Number(req.user?.id),
//   //     },
//   //   });

//   res.status(200).json({
//     message: 'Order created successfully',
//     order: order,
//     orderEvent: orderEvent,
//     orderItems: orderItems,
//   });
// };

export const createOrders = async (req: Request, res: Response) => {

  const {name , email, OrderType,paymentMethod} = req.body
  // Step 1: Fetch the user's cart
  const cart = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
      mealId: null,
    },
    include: {
      product: true,
    },
  });

  const cart_meal = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
      productId: null,
    },
    include: {
      meal: {
        include: {
          mealItems: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        }
      }
    },
  });

  // Step 2: Check if the cart is empty
  if (cart.length+cart_meal.length === 0) {
    throw new BadRequestException('Cart is empty', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  // Step 3: Calculate the total amount and quantity
  const netAmount = cart.reduce(
    (total, item) => total + Number(item.product.price) * Number(item.quantity),
    0,
  );

  const netAmount_meal = cart_meal.reduce(
    (total, item) => total + Number(item.meal.price) * Number(item.quantity),
    0,
  );

  const netAmount_total = netAmount + netAmount_meal;

  const totalQuantity = cart.reduce((total, item) => total + Number(item.quantity), 0);

  const totalQuantity_meal = cart_meal.reduce((total, item) => total + Number(item.quantity), 0);

  const totalQuantity_total = totalQuantity + totalQuantity_meal;

  // Step 4: Generate the order
  const orderNumber = generatedOrderNumber++;

  const orderservingmethodused = OrderType === 'EATIN' ?OrderServingTypeOptions.EATIN:OrderServingTypeOptions.DELIVERY;

  const order = await prisma.order.create({
    data: {
      userId: Number(req.user?.id),
      orderNumber: orderNumber,
      netAmount: netAmount_total,
      totalQuantity: totalQuantity_total,
      customerName: name,
      customerEmail: email,
      OrderServingType: orderservingmethodused,
      paymentMethod: paymentMethod,
    },
  });

  // Step 5: Create order items using Promise.all
  const orderItems = await Promise.all(
    cart.map(async (item) => {
      return prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.product.id,
          quantity: item.quantity,
          price: Number(item.product.price),
        },
      });
    }),
  );

  const orderItems_meal = await Promise.all(
    cart_meal.map(async (item) => {
      return prisma.orderItem.create({
        data: {
          orderId: order.id,
          mealId: item.meal.id,
          quantity: item.quantity,
          price: Number(item.meal.price),
        },
      });
    })
  );

  // Step 6: Create an order event
  const orderEvent = await prisma.orderEvent.create({
    data: {
      orderId: order.id,
    },
  });

  // Step 7: Optionally clear the cart
  // await prisma.cartItem.deleteMany({
  //   where: {
  //     userId: Number(req.user?.id),
  //   },
  // });

  const sokcetOrder = await prisma.order.findUniqueOrThrow({
    where: {
      id: order.id,
    },
    include: {
      OrderItem: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
          meal: {
            include: {
              category: true,
              mealItems: {
                include: {
                  product: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      OrderEvent: true,
    },
  });

  const io = req.app.get('socketio');

  if (!io) {
    throw new BadRequestException('SocketIO instance not found', ErrorCode.UNPROCESSABLE_ENTITY);
  } else {
    io.emit('OrderCreated', sokcetOrder);
  }

  // Step 8: Respond with the order details
  res.status(200).json({
    message: 'Order created successfully',
    order: order,
    orderEvent: orderEvent,
    orderItems: orderItems, // This array will not have null values
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
          meal: {
            include: {
              category: true,
              mealItems: {
                include: {
                  product: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
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
          meal: {
            include: {
              category: true,
              mealItems: {
                include: {
                  product: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
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

export const updateIsPaid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPaid } = req.body;

  if (isPaid !== true && isPaid !== false) {
    // if (isPaid !== true ) {
    throw new BadRequestException('isPaid must be true or false', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  
  const order1 = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      OrderItem: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      OrderEvent: true,
    },
  });

  const updatedOrder = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      orderStatus: 'PROCESSING',
    },
  });

  const orderEvent = await prisma.orderEvent.findFirst({
    where: {
      orderId: Number(id),
    },
  });

  const updatedOrderEvent = await prisma.orderEvent.update({
    where: {
      id: orderEvent?.id,
    },
    data: {
      status: 'PROCESSING',
    },
  });

  if (!order1) {
    throw new BadRequestException('Order not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }


  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      isPaid: isPaid,
    },
  });

  // io.emit('OrderisPaidUpdated', order.id);
  const io = req.app.get('socketio');

  if (!io) {
    throw new BadRequestException('SocketIO instance not found', ErrorCode.UNPROCESSABLE_ENTITY);
  } else {
    io.emit('OrderisPaidUpdated', order.id);
    io.emit('OrderAddToInKitchen', order1);

    res.status(200).json({
      message: 'Order updated successfully',
      data: order,
    });
  }
};
