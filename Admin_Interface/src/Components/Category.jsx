import React, { useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Clothing" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleEditClick = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, isEditing: true } : category
    );
    setCategories(updatedCategories);
  };

  const handleSaveClick = (id, newName) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, name: newName, isEditing: false } : category
    );
    setCategories(updatedCategories);
  };

  const handleDeleteClick = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(), // Unique ID
        name: newCategoryName.trim(),
        isEditing: false,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    }
  };

  return (
    <div className="w-full h-full bg-slate-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Categories</h1>

        {/* Add Category */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">
                <div className="text-sm text-gray-500">ID: {category.id}</div>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-semibold mr-2">Name:</span>
                  {category.isEditing ? (
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        setCategories(
                          categories.map((cat) =>
                            cat.id === category.id
                              ? { ...cat, name: e.target.value }
                              : cat
                          )
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  ) : (
                    <span className="text-lg">{category.name}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-9">
                {category.isEditing ? (
                  <button
                    onClick={() => handleSaveClick(category.id, category.name)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(category.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center text-gray-500 mt-8">No categories available.</div>
        )}
      </div>
    </div>
  );
}
