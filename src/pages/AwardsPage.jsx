import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection.jsx";
import YearSelector from "../components/YearSelector.jsx";
import NomineesList from "../components/NomineesList.jsx";
import CategorySelector from "../components/CategorySelector.jsx";

export default function AwardsPage() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [nominees, setNominees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    async function fetchNominees() {
      try {
        const res = await fetch(
          `https://web-production-b8145.up.railway.app/awards?year=${selectedYear}`
        );
        const data = await res.json();

        // Transform API data into grouped categories
        const categoriesData = data.reduce((acc, item) => {
          const existingCategory = acc.find((c) => c.category === item.category);
          const nomineeData = {
            title: item.title,
            img: item.img,
            isWinner: item.isWinner === "1",
            names: (item.names || []).map((n) => ({
              name: n.name,
              tmdb: n.tmdb, // TMDb ID
              img: n.img,
            })),
          };

          if (existingCategory) {
            existingCategory.items.push(nomineeData);
          } else {
            acc.push({ category: item.category, items: [nomineeData] });
          }
          return acc;
        }, []);

        setNominees(categoriesData);

        // Extract unique category names for the dropdown
        const uniqueCategories = categoriesData.map((c) => c.category);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching nominees:", err);
        setNominees([]);
        setCategories([]);
      }
    }

    fetchNominees();
  }, [selectedYear]);

  // Apply category filter
  const filteredNominees =
    selectedCategory === "all"
      ? nominees
      : nominees.filter((c) => c.category === selectedCategory);

  return (
    <div className="awards-page">
      <HeroSection />
      <YearSelector onYearChange={handleYearChange} />
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <NomineesList year={selectedYear} nominees={filteredNominees} />
    </div>
  );
}
