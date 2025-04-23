import { Request, Response } from 'express';
import razorpay from 'razorpay';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import crypto from 'crypto';
import { Resend } from 'resend';
import ReactDOMServer from 'react-dom/server'; // Required to render JSX to HTML
import React from 'react';
import OrderRecipt from '../../../User_Interface/src/emails/OrderRecipt';


const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Razorpay instance
const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Checkout function
export const checkoutFunction = async (req: Request, res: Response) => {
  try {
    const { amount, name, email, OrderType, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      throw new BadRequestException('Amount is in valid format', ErrorCode.UNPROCESSABLE_ENTITY);
    }

    if (!name) {
      throw new BadRequestException('Name is not provided !', ErrorCode.UNPROCESSABLE_ENTITY);
    }

    if (!email) {
      throw new BadRequestException('Email is not provided !', ErrorCode.UNPROCESSABLE_ENTITY);
    }

    if (!OrderType) {
      throw new BadRequestException('OrderType is not provided !', ErrorCode.UNPROCESSABLE_ENTITY);
    }

    if (!paymentMethod) {
      throw new BadRequestException('paymentMethod is not provided !', ErrorCode.UNPROCESSABLE_ENTITY);
    }
    
    const amountInCents = Math.round(amount * 100); // Ensure amount is correctly processed as number

    const options = {
      amount: amountInCents, // Ensure amount is a number
      currency: 'INR',
      notes: {
        name: name,
        email: email,
        OrderType: OrderType,
        paymentMethod: paymentMethod,
      },
    };

    const order = await instance.orders.create(options);

    console.log('Razorpay Order Response:', order); // Add this log

    res.status(200).json({
      message: 'Order created successfully',
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      id: order.id,
    });
  } catch (err) {
    console.log(err);
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
      const order = await instance.orders.fetch(razorpay_order_id);

      const { name, email, OrderType, paymentMethod }: any = order.notes;

      console.log(`Order details: Name - ${name}, Email - ${email}`);

      // Create order in the backend
      const orderResponse = await fetch('http://localhost:6868/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
        },
        body: JSON.stringify({
          name,
          email,
          OrderType,
          paymentMethod,
          razorpay_payment_id,
          razorpay_order_id,
        }),
      });


      const orderDataTemp = await orderResponse.json();
      if (!orderDataTemp || !orderDataTemp.order) {
        throw new BadRequestException(
          'Order creation failed on backend API',
          ErrorCode.UNPROCESSABLE_ENTITY,
        );
      }

      
      const orderData = orderDataTemp.order;
      console.log("Order ID: "+orderData.id);

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

      
      
      res.redirect('http://localhost:5173/order-details/' + orderData.id);
    } else {
      throw new BadRequestException(
        'Signature verification failed',
        ErrorCode.UNPROCESSABLE_ENTITY,
      );
    }
  } catch (err) {
    console.log(err);
    
    throw new BadRequestException('Order not created', ErrorCode.UNPROCESSABLE_ENTITY);
  }
};










      // //send email to user
      // // When verifying the payment and order
      // interface OrderReciptProps {
      //   products: any[];
      //   orderId: string;
      // }

      // // const emailHTML = ReactDOMServer.renderToStaticMarkup(
      // //   <OrderReceipt products={JSON.parse(products)} orderId={orderData.id} />,
      // // );

      // const emailHTML = ReactDOMServer.renderToStaticMarkup(React.createElement(OrderRecipt, { orderId: orderData.id, products: JSON.parse(products) }));

      // // const emailHTML = ReactDOMServer.renderToStaticMarkup(<EmailTemplate orderId={razorpay_order_id} products={parseJSON(products)}></EmailTemplate>);

      // const emailCall = await resend.emails.send({
      //   from: 'onboarding@resend.dev',
      //   to: email,
      //   subject: 'Thank you for Ordering from Macd Here is you Order Receipt',
      //   html: emailHTML,
      // });