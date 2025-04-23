// Inside your createEmail function on the backend:
import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const createEmail = async (req: Request, res: Response) => {
  const { email, emailTemplate } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'Email is not provided',
      errorCode: ErrorCode.UNPROCESSABLE_ENTITY,
    });
  }

  if (!emailTemplate) {
    return res.status(400).json({
      message: 'Email template is not provided',
      errorCode: ErrorCode.UNPROCESSABLE_ENTITY,
    });
  }

  try {
    const emailCall = await resend.emails
      .send({
        from: 'onboarding@resend.dev',
        // to: email,
        to: 'het16491234@gmail.com',
        subject: 'Thank you for Ordering from Macd Here is Your Order Receipt',
        html: emailTemplate,
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // If the email is successfully sent, return a JSON response
    return res.status(200).json({
      message: 'Email sent successfully',
      emailDetails: emailCall, // Add details of the email call
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      message: 'Failed to send email',
      error: error.message || error,
    });
  }
};
