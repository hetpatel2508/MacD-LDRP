import React, { useState } from 'react';
import { IoStar, IoCard, IoArrowBack } from 'react-icons/io5';
import Modal from 'react-modal';

const reviews = [
  // Sample data for reviews
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  {
    image: 'https://via.placeholder.com/60',
    name: 'John Doe',
    rating: 5,
    feedback: 'Great service!',
    productId: '12345',
    email: 'john@example.com',
    date: '2023-01-01',
    amount: '99.99',
    userId: 'user123',
    paymentMethod: 'Credit Card',
  },
  // Add more reviews as needed
];

export default function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const reviewsPerPage = 8;

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const openModal = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full h-[60px] mt-9 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center px-6 shadow-lg">
        
        <h1 className="text-2xl font-bold ">Payments</h1>
        <div />
      </div>

      {/* Reviews Container */}
      <div className="w-[92%] bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col items-center pb-10 mt-6 rounded-md shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {currentReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md border rounded-lg w-[260px] overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              
                

              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  User ID: <span className="font-normal">{review.userId}</span>
                </p>
                <p className="text-sm text-gray-800 font-semibold">
                  Product ID: <span className="font-normal">{review.productId}</span>
                </p>
                <p className="text-sm text-gray-800 font-semibold">
                  Email: <span className="font-normal">{review.email}</span>
                </p>
                <p className="text-sm text-gray-800 font-semibold">
                  Date: <span className="font-normal">{review.date}</span>
                </p>
                <p className="text-sm text-gray-800 font-semibold">
                  Amount: <span className="font-normal">${review.amount}</span>
                </p>
                <p className="text-sm text-gray-800 font-semibold flex items-center">
                  Payment Method: <IoCard className="ml-2 text-blue-500" /> {review.paymentMethod}
                </p>
              </div>

              <button
                onClick={() => openModal(review)}
                className="w-full bg-red-500 text-white font-bold py-2 hover:bg-red-600 transition-all duration-200"
              >
                Refund
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white font-semibold rounded ${
              currentPage === 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white font-semibold rounded ${
              currentPage === totalPages
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Refund Confirmation */}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Confirm Refund</h2>
          <p className="text-gray-700 mb-4">
            Are you sure you want to refund the payment for{' '}
            <span className="font-semibold">{selectedReview?.name}</span>?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Refund processed!');
                closeModal();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
