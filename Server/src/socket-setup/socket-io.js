import { Server } from 'socket.io';
import prisma from '../../DB/prisma'; // Ensure this imports your Prisma client properly
import { log } from 'console';

let io;
export const initializeSocketIO = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        },
    });

    io.on('connection', async (socket) => {
        console.log('User Connected: ' + socket.id);

        try {
            // Fetch products from the database
            const cashCounterOrders = await prisma.order.findMany({
                where: {
                    isPaid: false,
                },
                include: {
                    OrderEvent: true,
                    OrderItem: {
                        include: {
                            product: {
                                include: {
                                    category: true,
                                }
                            },
                            meal: {
                                include: {
                                    mealItems: {
                                        include: {
                                            product: {
                                                include: {
                                                    category: true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },
            });
            

            // Emit the products to the client
            socket.emit('initializeCashCounterOrders', cashCounterOrders);
        } catch (error) {
            console.error('Error fetching products:', error);
            socket.emit('error', { message: 'Error fetching products' });
        }


        try {
            // Fetch products from the database
            const inKitchenOrders = await prisma.order.findMany({
                where: {
                    orderStatus: 'PROCESSING',
                },
                include: {
                    OrderEvent: true,
                    OrderItem: {
                        include: {
                            product: {
                                include: {
                                    category: true,
                                }
                            },
                            meal: {
                                include: {
                                    mealItems: {
                                        include: {
                                            product: {
                                                include: {
                                                    category: true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },
            });
            

            // Emit the products to the client
            socket.emit('initializeInKitchenOrders', inKitchenOrders);
        } catch (error) {
            console.error('Error fetching products:', error);
            socket.emit('error', { message: 'Error fetching products' });
        }
        

        // Placeholder for handling other operations
        socket.on('disconnect', () => {
            console.log('User Disconnected: ' + socket.id);
        });
    });

    return io;
};

export const getSocketIOInstance = () => {
    return io;
};