import React from "react";
import { IoStar } from "react-icons/io5";

export default function Feedback() {
  const reviews = [
    {
      name: "Mitsubisi",
      feedback:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
      image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
    },
    {
      name: "koneigseg",
      feedback:
        "Amazing app! Easy to use, and the results are impressive. Highly recommend it for content creators!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4,
    },
    {
      name: "Toyota",
      feedback:
        "This tool has become a core part of my workflow. It's intuitive and efficient.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "BMW",
      feedback:
        "Great for personal and professional use. Highly customizable and always reliable.",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      name: "Aston Martin",
      feedback:
        "Absolutely love it! Saves me so much time and effort. The user interface is seamless.",
      image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="w-full h-[50px] mt-9 bg-cyan-200 flex items-center justify-center text-3xl font-[600]">
        Customer Reviews
      </div>
      <div className="w-[92%] min-h-[520px] bg-purple-200 flex pb-10 overflow-x-auto no-scrollbar mt-6">
        <div className="flex-wrap flex ">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-[250px] min-w-[250px] h-[300px] ml-5 mr-5 mt-5 bg-cyan-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col rounded-[16px]"
            >
              <div className="w-full h-full bg-gray-50 rounded-2xl flex flex-col items-center shadow-md border-r-gray-400 border-b-gray-300 hover:shadow-2xl">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-[42px] h-[42px] rounded-full bg-black mt-8"
                />
                <h1 className="text-2xl font-bold mt-2">{review.name}</h1>
                <p className="text-inline flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <IoStar key={i} fill="yellow" className="font-bold" />
                  ))}
                </p>
                <p className="text-gray-600 mb-10 font-semibold text-center mx-5">
                  {review.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
