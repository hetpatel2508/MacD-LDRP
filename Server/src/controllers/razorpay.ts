import { Request, Response } from 'express';
import razorpay from 'razorpay';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import crypto from 'crypto';

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const checkoutFunction = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const options = {
    amount: amount, // amount in the smallest currency unit (paise)
    currency: 'INR',
  };

  const order = await instance.orders.create(options, (err, order) => {
    if (err) {
      throw new BadRequestException('Order not created', ErrorCode.UNPROCESSABLE_ENTITY);
    }

    res.status(200).json({
      message: 'Order created successfully',
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      id: order.id,
    });
    console.log(order);
  });
};

export const varifyFunction = async (req: Request, res: Response) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
    .update(body.toString())
    .digest('hex');

  if (razorpay_signature === expectedSignature) {
    // Redirect to success page with the reference ID as query parameter

    // const { data, error } = await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'het16491234@gmail.com',
    //   subject: 'Order Placed Successfully',
    //   html: Confirmation,
    // });

    // if (error) {
    //   return res.status(400).json({ error });
    // }

    // res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    throw new BadRequestException('Signature verification failed', ErrorCode.UNPROCESSABLE_ENTITY);
  }
};
