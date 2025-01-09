import { z } from 'zod';

enum orderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
}

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    orderStatus.PENDING,
    orderStatus.PROCESSING,
    orderStatus.READY,
    orderStatus.DELIVERED,
  ]),
});
