import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Img,
  Text,
  Row,
  Tailwind,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface OrderReceiptProps {
  products: any[];
  orderId: string;
  netAmount: number;
  totalQuantity: number;
}

export default function OrderRecipt({
  products,
  orderId,
  netAmount,
  totalQuantity,
}: OrderReceiptProps) {

  const totalAmount = netAmount;
  const netQuantity = totalQuantity;

  const [order, setOrder] = React.useState({
    id: '12345',
    orderNumber: '69',
    products: [
      {
        name: 'Mac Vegy chef special of the day ',
        price: 79,
        quantity: 2,
        image: 'https://mcdindia.com/wp-content/uploads/2020/02/2.3-mc-veggie-single.png',
      },
      {
        name: 'Mac classic',
        price: 40,
        quantity: 3,
        image: 'https://mcdindia.com/wp-content/uploads/2020/02/2.1-mcaloo-tikki-cheese.png',
      },
      {
        name: 'Mac Panner',
        price: 150,
        quantity: 1,
        image: 'https://mcdindia.com/wp-content/uploads/2020/02/2.4-mcchicken-single.png',
      },
    ],
    total: 3699,
    netQuantity: 6,
    date: new Date().toLocaleString(),
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Delivery',
  });

  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Testing Email</Preview>
        <Body style={main}>
          <Container className="relative" style={container}>
            {/* <Section className="w-[50px] h-[50px] border-4  border-double border-black rounded-md flex justify-center items-center absolute top-[5%] right-[6vw]">
                {order.orderNumber}
              </Section> */}

            <Section className="pt-[6px] pb-[12.5px] text-[18px] reltive">
              <center>
                <Img
                  src="https://pngimg.com/uploads/mcdonalds/mcdonalds_PNG20.png"
                  alt="McDonald's Logo"
                  className="w-[80px] h-[50px] object-cover rounded-[6%]"
                />
              </center>
            </Section>

            <Section className="text-center text-green-600 text-[12px] pb-[2px]">
              Your Order is confirmed!
            </Section>

            <Section className="p-[1px] text-center text-[#373737] text-[10px] font-medium">
              Order Id: <span className="font-[100]">{orderId}</span>
            </Section>

            <Section className="bg-[#f4f4f4] max-w-[470px] rounded-t-[8px] px-[10px] pt-[10px] mt-[20px] border-t border-r border-l border-black border-dashed relative">
              {products.map((product, keyValue) => (
                <Section>
                  <Row key={product.name} className="-[10px] max-w-[430px] relative">
                    <Column className="  ">
                      <Img
                        src={product.image}
                        alt={product.name}
                        className=" w-[100px] h-[100px] object-cover rounded-[6%] "
                      />
                    </Column>

                    <Column className=" w-[130px] h-[100px] absolute right-[10px]">
                      <Text className=" text-[12px] m-0 p-0 font-[500] text-[#373737]  leading-[16px]">
                        {product.name}
                      </Text>
                      <Text className=" text-[10px] m-0 p-0 ">
                        ₹ {product.price} x {product.quantity}
                      </Text>
                    </Column>
                  </Row>
                  <Section></Section>
                  <hr
                    color="#000"
                    className={`max-w-[460px] h-[0.025px] rounded-[1px] opacity-[0.3] p-0 ${keyValue === products.length - 1 ? 'hidden' : ''}`}
                  />
                </Section>
              ))}
            </Section>
            <Section>
              <Section className="max-w-[470px] h-[50px] bg-[#f1f1f1] border-t border-[#f6f6f6] border-solid">
                <Row className="max-w-[470px] pb-0.5 pt-1 ">
                  <Column className="w-[50px] ">
                    <Text className=" text-[10px] m-0 p-0 font-[500] text-[#373737]  leading-[16px] px-3">
                      Total Items
                    </Text>
                  </Column>
                  <Column className="w-[50px] ">
                    <Text className=" text-[10px] m-0 p-0 font-[400] text-[#373737] text-right leading-[16px] px-3">
                      <span className="font-[100]">x</span> {netQuantity}
                    </Text>
                  </Column>
                </Row>

                <Row className="max-w-[470px]">
                  <Column className="w-[50px] ">
                    <Text className=" text-[10px] m-0 p-0 font-[500] text-[#373737]  leading-[16px] px-3">
                      Total Amount
                    </Text>
                  </Column>
                  <Column className="w-[50px] ">
                    <Text className=" text-[10px] m-0 p-0 font-[400] text-[#373737] text-right leading-[16px] px-3 pb-0.5 ">
                      ₹ {totalAmount}
                    </Text>
                  </Column>
                </Row>
                <Row className="">
                  <Row className="max-w-[470px] bg-[#f1f1f1] h-[8.5px] p-0 m-0">
                    <Section className="max-w-[470px] p-0 m-0 ">
                      <Img
                        src="https://ci3.googleusercontent.com/meips/ADKq_NZxo6LXm7unxmOMyqwrvnlvmMSKGCGqpHz5AdqrvmX9uNeP3RCYz78O0BlswLZa0UPKJgvXulOEcyVGJlYv2fJKPCKFz-TzOLlV6nE9AfCG9DQ=s0-d-e1-ft#https://in.bmscdn.com/mailers/images/161202ticket/zigzag.png"
                        alt="McDonald's Logo"
                        className="w-full max-h-[15px] m-0 p-0 object-cover"
                      />
                    </Section>
                  </Row>
                </Row>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const triangel = {
  width: '0px',
  height: '0px',
  backgroundColor: 'transparent',
  borderLeft: '3.4px solid transparent',
  borderRight: '3.4px solid transparent',
  borderBottom: '5px solid black',
  transform: 'rotate(180deg)',
};

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  margin: '0 auto',
  padding: '20px',
};

const container = {
  margin: '0 auto',
  padding: '10px',
  //   backgroundColor: '#f4f4f4',
  backgroundColor: '#ffffff',
  maxWidth: '590px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const boxShadow = {
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
