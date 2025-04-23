import React from 'react';
import Cookies from 'js-cookie';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const [Products, setProducts] = React.useState([]);
    const [serverError, setServerError] = React.useState('');
    const [editProductId, setEditProductId] = React.useState(null);
    const [editedProduct, setEditedProduct] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [newProduct, setNewProduct] = React.useState({
        name: '',
        image: '',
        price: 0,
        categoryId: 0,
        foodType: 'VEG',
    });

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:6868/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${Cookies.get('token')}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    setServerError(data.message + ' (' + data.errorCode + ')');
                    toast.error(data.message + ' (' + data.errorCode + ')');
                } else {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setServerError('Unable to fetch products. Please try again.');
                toast.error('Unable to fetch products. Please try again.');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:6868/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${Cookies.get('token')}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    setServerError(data.message + ' (' + data.errorCode + ')');
                    toast.error(data.message + ' (' + data.errorCode + ')');
                } else {
                    setCategories(data.data);
                    setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        categoryId: data.data[0].id
                    }))
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Unable to fetch categories. Please try again.');
                setServerError('Unable to fetch categories. Please try again.');
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setEditProductId(product.id);
        setEditedProduct({ ...product });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:6868/product/${editProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${Cookies.get('token')}`,
                },
                body: JSON.stringify({ ...editedProduct, price: Number(editedProduct.price) }),
            });
            const data = await response.json();
            if (!response.ok) {
                setServerError(data.message + ' (' + data.errorCode + ')');
                toast.error('Failed to update product!');
            } else {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editProductId ? data.data : product
                    )
                );
                setEditProductId(null);
                toast.success('Product updated successfully!');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setServerError('Unable to update product. Please try again.');
            toast.error('Unable to update product. Please try again.');
        }
    };


    const handleDeleteClick = async (id) => {
        // Wrapping the promise correctly
        toast.promise(
            fetch(`http://localhost:6868/product/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${Cookies.get('token')}`,
                },
            })
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message + ' (' + data.errorCode + ')');
                    }
                    setProducts((prevProducts) =>
                        prevProducts.filter((product) => product.id !== id)
                    );
                    return 'Product deleted successfully!'; // Resolve success message
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                    throw new Error('Unable to delete product. Please try again.'); // Reject on error
                }),
            {
                pending: 'Deleting product...',
                success: 'Product deleted successfully!',
                error: 'Failed to delete product!',
            }
        );
    };


    const handleChangeInInput = (e) => {
        const { name, value } = e.target;
        let updatedProduct;
        if (name === 'price' || name === 'categoryId') {
            updatedProduct = { ...newProduct, [name]: Number(value) };
        } else {

            updatedProduct = { ...newProduct, [name]: value };
        }

        setNewProduct(updatedProduct);
    };


    const handleCreateProduct = async () => {
        try {
            const response = await fetch('http://localhost:6868/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${Cookies.get('token')}`,
                },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            if (!response.ok) {
                setServerError(data.message + ' (' + data.errorCode + ')');
                toast.error('Failed to add product!');
            } else {
                setProducts([...Products, data.data]);
                setNewProduct({
                    name: '',
                    image: '',
                    price: 0,
                    categoryId: categories[0].id,
                    foodType: 'VEG',
                });
                toast.success('Product added successfully!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setServerError('Unable to add product. Please try again.');
            toast.error('Unable to add product. Please try again.');
        }
    };



    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex w-full">
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Products</h1>

                    {/* Add Products */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Enter Product name"
                            name="name"  // Add a name attribute to map it to the state
                            value={newProduct.name}  // Set the value to the state to ensure it's controlled
                            onChange={handleChangeInInput}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-[300px]"
                        />
                        <input
                            type="url"
                            placeholder="Enter Image URL"
                            name="image"  // Add a name attribute to map it to the state
                            value={newProduct.image}  // Set the value to the state to ensure it's controlled
                            onChange={handleChangeInInput}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-[300px]"
                        />
                        <input
                            type="number"
                            placeholder="Enter Price"
                            name="price"  // Add a name attribute to map it to the state
                            value={newProduct.price}  // Set the value to the state to ensure it's controlled
                            onChange={handleChangeInInput}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-[135px]"
                        />
                        <select
                            name="categoryId"  // Add name to ensure it's controlled
                            value={newProduct.categoryId}
                            defaultValue={Number(categories[0]?.id)}
                            onChange={handleChangeInInput}
                            className="border border-gray-300 rounded-md text-center py-2 w-full max-w-[180px]"
                        >
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                        <select
                            name="foodType"  // Add name to ensure it's controlled
                            value={newProduct.foodType}
                            defaultValue={"VEG"}
                            onChange={handleChangeInInput}
                            className="border border-gray-300 rounded-md text-center py-2 w-full max-w-[100px]"
                        >
                            <option value="VEG">Veg</option>
                            <option value="NONVEG">Non-Veg</option>
                            <option value="EGG">Egg</option>
                            <option value="FISH">Fish</option>
                        </select>

                        <button
                            onClick={handleCreateProduct}
                            disabled={
                                !newProduct.name ||
                                !newProduct.image ||
                                newProduct.price <= 0
                            }
                            className={`px-6 py-2 rounded-md transition 
                                    ${!newProduct.name ||
                                    !newProduct.image ||
                                    newProduct.price <= 0
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Add
                        </button>



                    </div>
                    <h1 className="text-2xl font-semibold mb-4">Value Meals</h1>
                    <div className="grid grid-cols-5 text-center gap-6">
                        {Products.map((product) =>
                            editProductId === product.id ? (
                                <div
                                    key={product.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl relative"
                                >
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        />
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedProduct.price}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            name="image"
                                            value={editedProduct.image}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        />
                                        <select
                                            name="foodType"
                                            value={editedProduct.foodType}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        >
                                            <option value="VEG">Veg</option>
                                            <option value="NONVEG">Non-Veg</option>
                                            <option value="EGG">Egg</option>
                                            <option value="FISH">Fish</option>
                                        </select>
                                        <button
                                            onClick={handleSaveClick}
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditProductId(null)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={product.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl relative group"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-contain"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                        <p className="text-gray-600">₹{product.price}</p>
                                    </div>
                                    <div className="absolute top-0 right-0 mr-2 w-[40px] h-[150px] hidden group-hover:flex flex-col">
                                        <div
                                            onClick={() => handleEditClick(product)}
                                            className="w-full h-[40px] flex items-center justify-center cursor-pointer"
                                        >
                                            <FaRegEdit className="w-[20px] h-[20px]" />
                                        </div>
                                        <div
                                            onClick={() => handleDeleteClick(product.id)}
                                            className="w-full h-[40px] flex items-center justify-center cursor-pointer pr-1"
                                        >
                                            <MdDeleteOutline className="w-[25px] h-[25px]" />
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            {serverError && <p className="text-red-500">{serverError}</p>}
        </div>
    );
}
