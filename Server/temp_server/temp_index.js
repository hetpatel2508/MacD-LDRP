// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// In-memory "database"
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 50000, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Shoes', category: 'Fashion', price: 3000, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Book', category: 'Education', price: 500, image: 'https://via.placeholder.com/150' },
];

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Emit all products when a user connects
  socket.emit('initialProducts', products);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// CRUD APIs
// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add product
app.post('/products', (req, res) => {
  const { name, category, price, image } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    category,
    price,
    image,
  };
  products.push(newProduct);
  io.emit('productAdded', newProduct); // Notify clients
  res.status(201).json(newProduct);
});

// Update product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, price, image } = req.body;

  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = { ...products[productIndex], name, category, price, image };
  products[productIndex] = updatedProduct;

  io.emit('productUpdated', updatedProduct); // Notify clients
  res.json(updatedProduct);
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];
  io.emit('productDeleted', deletedProduct.id); // Notify clients
  res.json(deletedProduct);
});

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
