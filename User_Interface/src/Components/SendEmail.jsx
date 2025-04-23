import React from 'react'
import Paid from '../assets/paid.png'
import CashLogo from '../assets/cashlogo.svg'
import OnlineLogo from '../assets/onlinelogo.svg'
import { useParams } from 'react-router'
import OrderRecipt from '../emails/OrderRecipt';
import ReactDOMServer from 'react-dom/server';

export default function SendEmail() {


    const { id } = useParams();

    const [data, setData] = React.useState({
        to: "Urvish Patel",
        date: new Date().toDateString(),
        totalAmount: 6968,
        orderID: "123456789",
        isPaid: true,
        paymentMethod: "Cash",
    });

    React.useMemo(async () => {

        let orderData;

        const dataRes = await fetch(`http://localhost:6868/order/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                orderData = data.data;

                const currDate = new Date(orderData.createdAt).toDateString();
                setData((prev) => ({
                    ...prev,
                    date: currDate,
                    totalAmount: orderData.netAmount,
                    orderID: orderData.id,
                    isPaid: orderData.isPaid,
                    to: orderData.customerName,
                    paymentMethod: orderData.OrderServingType
                }));
            })
            .catch((err) => console.log(err));

        console.log(orderData);



        //now send email 
        const temp = orderData.OrderItem.map((item) => {
            return item.meal ? {
                name: item.meal.name,
                quantity: item.quantity,
                price: item.meal.price,
                image: item.meal.image
            } : {
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                image: item.product.image
            };
        });

        const orderId = id;

        const totalQuantity = orderData.totalQuantity;

        const netAmount = orderData.netAmount;

        const emailHTML = ReactDOMServer.renderToStaticMarkup(
            <OrderRecipt
                products={temp}
                orderId={id}
                netAmount={netAmount}
                totalQuantity={totalQuantity}
            />
        );


        // Send email using Resend using custom API Calling
        const emailCall = await fetch("http://localhost:6868/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
            },
            body: JSON.stringify({
                email: orderData.customerEmail,
                emailTemplate: emailHTML,
            }),
        });

        if (emailCall.ok) {
            // Make sure to consume the response using .json()
            const responseData = await emailCall.json();  // Parse the response body as JSON
            console.log("Email sent successfully:", responseData);  // Log the success message or email details

            // Optionally update the UI or state based on the response
            window.location.href = 'http://localhost:5173/';
        } else {
            // Handle any errors (non-200 responses)
            const errorResponse = await emailCall.json();
            console.log("Error sending email:", errorResponse);
        }


    }, []);


    return (
        <div className='w-screen h-screen bg-gray-100 absolute top-0 left-0 z-[100] flex items-center justify-center '>
            <div className='w-[360px] h-[500px] rounded-[16px] gap-1.5 relative'>

                <div className='w-[140px] h-[140px] bg-green-400 absolute top-[-70px] rounded-full left-[30%] shadow-[5px_-5px_10px_0_rgba(0,0,0,0.15),_-5px_0_10px_0_rgba(0,0,0,0.15),5px_0_15px_0_rgba(0,0,0,0.15)] flex items-center justify-center'>
                    <div className='w-[110px] h-[110px] bg-green-500 rounded-full shadow-[5px_-5px_10px_0_rgba(0,0,0,0.15),_-5px_0_10px_0_rgba(0,0,0,0.15),5px_0_15px_0_rgba(0,0,0,0.15)] flex items-center justify-center'>
                        <img src={Paid} className='w-[70px] h-[70px] ' alt="" />
                    </div>
                </div>

                <div className='w-full bg-white h-[32%] rounded-t-[16px] bg-pink- border-x border-t border-black shadow-[5px_-5px_10px_0_rgba(0,0,0,0.15),_-5px_0_10px_0_rgba(0,0,0,0.15),5px_0_15px_0_rgba(0,0,0,0.15)] flex flex-col items-center justify-end '>
                    <div className='w-[100%] h-[40px] mb-0.5 bg-white flex items-center justify-center text-[33px] font-semibold text-green-600'>
                        Order Confirmed!
                    </div>
                    <div className='w-full h-[25px] text-center mb-2 text-[16.5px] opacity-70'>
                        Please Check your Email for order details:
                    </div>
                </div>
                <div className='w-full h-[4.5%]   flex relative justify-center items-center'>
                    <div className='h-[25px] w-[25px] absolute left-[-14.5px] rounded-full border-r border-black  border-solid'></div>
                    <div className='h-full w-[100%] bg-white flex gap-[6.5px] justify-center items-center'>
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                        <div className='w-[3.2%] h-[.5px] border-b  border-gray-300 rounded-full' />
                    </div>
                    <div className='h-[25px] w-[25px] absolute right-[-14.5px] rounded-full border-l border-black   border-solid'></div>
                </div>
                <div className='w-full h-[68%] border-x  border-black  relative ' style={{ boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.15), 4px 0 8px rgba(0, 0, 0, 0.15)" }}>

                    <div className='w-full h-full flex flex-col pt-[25px] items-center'>
                        <div className='w-full h-[100px]  '>
                            <div className='pl-4'>Summary:</div>
                            <div className='pl-4 flex gap-2 items-center mt-2'>
                                <div className='w-[47%] h-[40px] '>
                                    <div className='text-[16px] opacity-70'>To:</div>
                                    <div className='text-[18px] h-[25px] overflow-hidden text-clip'>{data.to}</div>
                                </div>
                                <div className='w-[47%] h-[40px] '>
                                    <div className='text-[16px] opacity-70'>Date:</div>
                                    <div className='text-[18px] w-full h-[25px] overflow-hidden text-clip'>{data.date}</div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[87%] h-[111px] flex flex-col items-center justify-between px-4 pt-4 rounded-[10px] border border-black'>
                            <div className='w-full h-[44px] '>
                                <div className='w-full h-[15px] flex justify-between'>
                                    <div className='opacity-70 text-[17px]'>Order ID:</div>
                                    <div>{data.orderID}</div>
                                </div>
                                <div className='w-full h-[25px] mt-3 flex justify-between'>
                                    <div className='opacity-70 text-[17px]'>Status: </div>
                                    <div>{data.isPaid ? "Paid" : "Unpaid"}</div>
                                </div>
                            </div>
                            <div className='w-[100%] h-[35px]'>
                                <div className='w-full h-[15px] flex justify-between'>
                                    <div className='text-[19px]'>Total Amount: </div>
                                    <div className='text-[23px] font-semibold'>  Rs. {data.totalAmount}</div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[87%] h-[50px] absolute bottom-[30px] rounded-[10px] border border-black flex items-center justify-center bg-[#E7E7E7]'>
                            <div className='w-[45px] h-[50px] flex items-center justify-center'>
                                <img className='w-[30px] h-[30px] object-cover' src={data.paymentMethod.toLowerCase() === 'cash' ? CashLogo : OnlineLogo} alt="" />
                            </div>
                            <div className='w-[80%] h-full flex items-center pl-[30%]'>
                                {data.paymentMethod.toLowerCase() === 'cash' ? "Cash" : "Online"}
                            </div>
                        </div>
                    </div>

                    <div className='w-[360px] h-[25px] absolute left-[-0.5px] bottom-[-25px] bg-red- border-x border-b border-black z-20 bg-white ' >
                        <div className='w-full h-[25px] absolute bottom-[-14px] flex justify-center gap-2 items-center bg-transparent'>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                            <div className='w-[23px] h-[23px] bg-white border-t border-black rounded-full'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
