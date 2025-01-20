import React from 'react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

export default function Meals() {
    const [meals, setMeals] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [editMealId, setEditMealId] = React.useState(null);
    const [serverError, setServerError] = React.useState('');
    const [editedMeal, setEditedMeal] = React.useState({});
    const [newMeal, setNewMeal] = React.useState({
        name: '',
        image: '',
        categoryId: 0,
        foodType: 'VEG',
        mealItems: [], // Array of { productId, quantity }
        price: 0,
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [mealsRes, categoriesRes, productsRes] = await Promise.all([
                    fetch('http://localhost:6868/meal', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${Cookies.get('token')}`,
                        },
                    }),
                    fetch('http://localhost:6868/category', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${Cookies.get('token')}`,
                        },
                    }),
                    fetch('http://localhost:6868/product', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${Cookies.get('token')}`,
                        },
                    }),
                ]);

                const [mealsData, categoriesData, productsData] = await Promise.all([
                    mealsRes.json(),
                    categoriesRes.json(),
                    productsRes.json(),
                ]);

                setMeals(mealsData.data || []);
                setCategories(categoriesData.data || []);
                setProducts(productsData.data || []);

                setNewMeal((prevMeal) => ({
                    ...prevMeal,
                    categoryId: categoriesData.data[0]?.id,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleQuantityChange = (productId, action) => {
        setNewMeal((prevMeal) => {
            const updatedMealItems = [...prevMeal.mealItems];
            const itemIndex = updatedMealItems.findIndex((item) => item.productId === productId);

            if (action === 'increment') {
                if (itemIndex >= 0) {
                    // Increment quantity if product exists
                    updatedMealItems[itemIndex] = {
                        ...updatedMealItems[itemIndex],
                        quantity: updatedMealItems[itemIndex].quantity + 1,
                    };
                } else {
                    // Add new product with quantity 1
                    updatedMealItems.push({ productId, quantity: 1 });
                }
            } else if (action === 'decrement') {
                if (itemIndex >= 0 && updatedMealItems[itemIndex].quantity > 1) {
                    // Decrement quantity if greater than 1
                    updatedMealItems[itemIndex] = {
                        ...updatedMealItems[itemIndex],
                        quantity: updatedMealItems[itemIndex].quantity - 1,
                    };
                } else if (itemIndex >= 0) {
                    // Remove product if quantity becomes 0
                    updatedMealItems.splice(itemIndex, 1);
                }
            }

            return { ...prevMeal, mealItems: updatedMealItems };
        });
    };

    const handleCreateMeal = async () => {
        // console.log(newMeal);

        //here we need to map the mealItems like if [{productId:1,quantity:1},{productId:2,quantity:2}] then meal items should be [1,2,2]
        let mappedMealItems = [];
        newMeal.mealItems.map((item) => {
            for (let i = 0; i < item.quantity; i++) {
                mappedMealItems.push(item.productId)
            }
        });
        console.log(mappedMealItems);

        try {
            let response
            if (newMeal.price === 0) {
                response = await fetch('http://localhost:6868/meal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${Cookies.get('token')}`,
                    },
                    body: JSON.stringify({
                        name: newMeal.name,
                        image: newMeal.image,
                        categoryId: newMeal.categoryId,
                        mealItems: mappedMealItems,
                        foodType: newMeal.foodType,
                    }),
                });
            } else {
                response = await fetch('http://localhost:6868/meal/special', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${Cookies.get('token')}`,
                    },
                    body: JSON.stringify({
                        ...newMeal,
                        mealItems: mappedMealItems,
                        price: parseFloat(newMeal.price),
                    }),
                });
            }
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
            } else {
                setMeals([...meals, data.meal]);
                setNewMeal({
                    name: '',
                    image: '',
                    categoryId: categories[0]?.id || 0,
                    foodType: 'VEG',
                    mealItems: [],
                    price: 0,
                });
                toast.success('Meal added successfully!');
            }
        } catch (error) {
            console.error('Error adding meal:', error);
            toast.error('Unable to add meal. Please try again.');
        }
    };

    const handleEditClick = (meal) => {
        setEditMealId(meal.id);
        setEditedMeal({ ...meal, mealItems: meal.mealItems || [] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMeal({ ...editedMeal, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:6868/meal/${editMealId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${Cookies.get('token')}`,
                },
                body: JSON.stringify({ ...editedMeal, categoryId: Number(editedMeal.categoryId) }),
            });
            const data = await response.json();
            if (!response.ok) {
                setServerError(data.message + ' (' + data.errorCode + ')');
            } else {
                setMeals((prevMeals) =>
                    prevMeals.map((meal) =>
                        meal.id === editMealId ? data.data : meal
                    )
                );
                setEditMealId(null);
            }
        } catch (error) {
            console.error('Error updating meal:', error);
            setServerError('Unable to update meal. Please try again.');
        }
    };

    const handleDeleteClick = async (id) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(`http://localhost:6868/meal/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `${Cookies.get('token')}`,
                        },
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        reject(data.message + ' (' + data.errorCode + ')');
                    } else {
                        setMeals((prevMeals) =>
                            prevMeals.filter((meal) => meal.id !== id)
                        );
                        resolve('Meal deleted successfully!');
                    }
                } catch (error) {
                    console.error('Error deleting meal:', error);
                    reject('Unable to delete meal. Please try again.');
                }
            }),
            {
                pending: 'Deleting meal...',
                success: 'Meal deleted successfully!',
                error: 'Failed to delete meal!',
            }
        );
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex w-full">
                <div className="flex-1 p-8">



                    <div className="flex flex-col justify-center items-center gap-6 mb-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                        <h1 className="text-4xl font-bold text-center mb-6">Add New Meal</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="Meal Name"
                            value={newMeal.name}
                            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="url"
                            name="image"
                            placeholder="Image URL"
                            value={newMeal.image}
                            onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="categoryId"
                            value={newMeal.categoryId}
                            onChange={(e) => setNewMeal({ ...newMeal, categoryId: Number(e.target.value) })}
                            className="  p-3 border border-gray-300 rounded-md"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name="foodType"
                            value={newMeal.foodType}
                            onChange={(e) => setNewMeal({ ...newMeal, foodType: e.target.value })}
                            className="border border-gray-300 rounded-md text-center py-2 w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        >
                            <option value="VEG">VEG</option>
                            <option value="NONVEG">NONVEG</option>
                            <option value="EGG">EGG</option>
                            <option value="FISH">FISH</option>
                        </select>
                        <div className="overflow-y-auto h-48 mb-6 border rounded-md p-4">
                            {products.map((product) => {
                                const mealItem = newMeal.mealItems.find((item) => item.productId === product.id);
                                const quantity = mealItem ? mealItem.quantity : 0;

                                return (
                                    <div key={product.id} className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-10 h-10 object-cover rounded-md"
                                            />
                                            <span>{product.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(product.id, 'decrement')}
                                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                                                disabled={quantity === 0}
                                            >
                                                -
                                            </button>
                                            <span>{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(product.id, 'increment')}
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newMeal.price}
                            onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                            className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleCreateMeal}
                            disabled={!newMeal.name || !newMeal.image || newMeal.mealItems.length === 0}
                            className={`w-full py-3 rounded-md text-white font-bold transition ${!newMeal.name || !newMeal.image || newMeal.mealItems.length === 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            Add Meal
                        </button>
                    </div>




                    <h1 className="text-2xl font-semibold mb-4 mt-4 pb-4 pt-4">Meals List</h1>

                    <div className="w-[100%] grid grid-cols-5 text-center gap-6">
                        {meals.map((meal) =>
                            editMealId === meal?.id ? (
                                <div
                                    key={meal.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl relative"
                                >
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedMeal.name}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        />
                                        <input
                                            type="url"
                                            name="image"
                                            value={editedMeal.image}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        />
                                        <select
                                            name="categoryId"
                                            value={editedMeal.categoryId}
                                            onChange={handleChange}
                                            className="block w-full mb-2 p-2 border rounded"
                                        >
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            name="foodType"
                                            value={editedMeal.foodType}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-md text-center py-2 w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                        >
                                            <option value="VEG">VEG</option>
                                            <option value="NONVEG">NONVEG</option>
                                            <option value="EGG">EGG</option>
                                            <option value="FISH">FISH</option>
                                        </select>
                                        <button
                                            onClick={handleSaveClick}
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditMealId(null)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={meal?.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl relative group"
                                >
                                    <img
                                        src={meal?.image}
                                        alt={meal?.name}
                                        className="w-full h-40 object-contain"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold">{meal?.name}</h2>
                                        <p className="text-gray-600">₹{meal?.price}</p>
                                    </div>
                                    <div className="absolute top-0 right-0 mr-2 w-[40px] h-[150px] hidden group-hover:flex flex-col">
                                        <div
                                            onClick={() => handleEditClick(meal)}
                                            className="w-full h-[40px] flex items-center justify-center cursor-pointer"
                                        >
                                            <FaRegEdit className="w-[20px] h-[20px]" />
                                        </div>
                                        <div
                                            onClick={() => handleDeleteClick(meal.id)}
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
