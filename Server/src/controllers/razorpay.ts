import { Request, Response } from 'express';
import razorpay from 'razorpay';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import crypto from 'crypto';

// Initialize Razorpay instance
const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Checkout function
export const checkoutFunction = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
    };

    const order = await instance.orders.create(options);
    res.status(200).json({
      message: 'Order created successfully',
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      id: order.id,
    });
  } catch (err) {
    throw new BadRequestException('Order not created', ErrorCode.UNPROCESSABLE_ENTITY);
  }
};

// Verify function
export const varifyFunction = async (req: Request, res: Response) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest('hex');

    if (razorpay_signature === expectedSignature) {
      // Create order in the backend
      const orderResponse = await fetch('http://localhost:6868/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
        },
      });

      if (!orderResponse.ok) {
        const errorBody = await orderResponse.text();
        console.error('Order API Error:', {
          status: orderResponse.status,
          error: errorBody,
        });
        throw new BadRequestException(
          `Order not created. Status: ${orderResponse.status}`,
          ErrorCode.UNPROCESSABLE_ENTITY,
        );
      }

      // Clear the cart
      const clearCartResponse = await fetch('http://localhost:6868/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
        },
      });

      if (!clearCartResponse.ok) {
        throw new BadRequestException('Cart not cleared', ErrorCode.UNPROCESSABLE_ENTITY);
      }

      res.redirect('http://localhost:5173/');
    } else {
      throw new BadRequestException(
        'Signature verification failed',
        ErrorCode.UNPROCESSABLE_ENTITY,
      );
    }
  } catch (err) {
    throw new BadRequestException('Order not created', ErrorCode.UNPROCESSABLE_ENTITY);
  }
};
