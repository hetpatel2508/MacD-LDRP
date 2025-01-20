import React from 'react';
import { useNavigate } from 'react-router';

export default function FriesSides() {
    const categories = ["All", "Veg", "Non-Veg", "Egg", "Fish"];
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [serverError, setServerError] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response1 = await fetch('http://localhost:6868/product/6', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
                    },
                });

                const response2 = await fetch('http://localhost:6868/product/7', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
                    },
                });

                const data1 = await response1.json();
                const data2 = await response2.json();

                if (!response1.ok) {
                    setServerError(data1.message + ' (' + data1.errorCode + ')');
                }
                else if (!response2.ok) {
                    setServerError(data2.message + ' (' + data2.errorCode + ')');
                }
                else {
                    const mergedProducts = [...data1.data, ...data2.data];
                    setProducts(mergedProducts);
                    setFilteredProducts(mergedProducts); // Initialize filteredProducts
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setServerError('Unable to fetch products. Please try again.');
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on category and search query
    React.useEffect(() => {
        let filtered = products;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter((product) => product.foodType.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, products]);

    return (
        <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
            <div className="w-full h-[50px] mt-9 ml-[100px] flex items-center text-3xl font-[600]">Newly Launched</div>

            {/* Search Bar */}
            <div className="w-[92%] my-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for meals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Categories */}
            <div className="w-[92%] min-h-[55px] flex justify-center flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category}
                        className={`px-12 h-[40px] flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full ml-2 mr-2 mt-2 
                        ${selectedCategory === category || (selectedCategory === 'NonVeg' && category === 'Non-Veg')
                                ? 'bg-blue-500 text-white border-blue-700'
                                : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
                            }`}
                        onClick={() => setSelectedCategory(category === 'Non-Veg' ? 'NonVeg' : category)}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {/* Products */}
            <div className="w-[92%] h-full grid grid-cols-5 text-center gap-6 mt-5">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl relative group"
                            onClick={() => navigate(`/product/${product.id}`, { state: { product, category: product.category.name } })}
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
                        </div>
                    ))
                ) : (
                    <div className="col-span-5 text-xl font-bold text-gray-500">No products found</div>
                )}
            </div>

            {/* Server Error */}
            {serverError && <div className="text-red-500 mt-4">{serverError}</div>}
        </div>
    );
}
