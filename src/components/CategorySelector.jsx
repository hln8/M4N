import React, { useState, useEffect } from "react";
import "./CategorySelector.css";

/**
 * CategorySelector Component
 * --------------------------
 * A reusable dropdown + button component to filter Oscar categories.
 * Props:
 *  - categories: array of category names (["Best Picture", "Best Actor", ...])
 *  - selectedCategory: the currently active category (default: "all")
 *  - onCategoryChange: callback triggered when user confirms selection
 */
const CategorySelector = ({ categories = [], selectedCategory = "all", onCategoryChange }) => {
  // Local state keeps track of the currently selected category in the dropdown
  const [category, setCategory] = useState(selectedCategory || "all");

  // Sync local state if parent updates the selectedCategory prop
  useEffect(() => {
    setCategory(selectedCategory || "all");
  }, [selectedCategory]);

  // Handles dropdown selection changes
  const handleChange = (e) => setCategory(e.target.value);

  return (
    <div className="category-selector-container">
      {/* Section Title */}
      <h2 className="category-selector-title">Oscar Categories</h2>

      {/* Helper text above dropdown */}
      <p className="category-selector-instructions">
        Select a category to view nominees:
      </p>

      {/* Dropdown menu populated dynamically from props */}
      <select className="category-selector" value={category} onChange={handleChange}>
        <option value="all">All Categories</option>
        {categories.map((c, idx) => (
          <option key={idx} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Action button — triggers parent callback with chosen category */}
      <button
        className="view-category-button"
        onClick={() => onCategoryChange(category)}
      >
        View {category === "all" ? "All Categories" : category}
      </button>
    </div>
  );
};

export default CategorySelector;
