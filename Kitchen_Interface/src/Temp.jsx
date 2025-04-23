import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

const App = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        socket.on('initialProducts', (data) => setProducts(data));

        socket.on('productAdded', (product) => setProducts((prev) => [...prev, product]));

        socket.on('productUpdated', (updatedProduct) =>
            setProducts((prev) =>
                prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
            ),
        );

        socket.on('productDeleted', (id) =>
            setProducts((prev) => prev.filter((product) => product.id !== id)),
        );

        return () => {
            socket.off('initialProducts');
            socket.off('productAdded');
            socket.off('productUpdated');
            socket.off('productDeleted');
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, name, category, price, image } = form;

        if (id) {
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, category, price, image }),
            });
        } else {
            fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, category, price, image }),
            });
        }

        setForm({ id: '', name: '', category: '', price: '', image: '' });
    };

    const handleEdit = (product) => {
        setForm(product);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
    };

    return (
        <div className="app-container">
            <header>
                <h1>Product Management</h1>
            </header>

            <main>
                <section className="form-section">
                    <h2>{form.id ? 'Edit Product' : 'Add Product'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={form.category}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={form.image}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit" className="submit-btn">
                            {form.id ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </section>

                <section className="products-section">
                    <h2>Product List</h2>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} />
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <p>Category: {product.category}</p>
                                    <p>Price: ₹{product.price}</p>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => handleEdit(product)}>
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
