import { useState } from "react";

interface Item {
  title: string;
  description: string;
  category: string[];
}

interface Props {
  items: Item[];
  heading: string;
  onSelectItem: (item: Item) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract unique categories from items
  const allCategories = [...new Set(items.flatMap((item) => item.category))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
    setSelectedIndex(null); // Reset selection when changing categories
  };

  // Filter items based on selected categories
  const filteredItems =
    selectedCategories.length > 0
      ? items.filter((item) =>
          selectedCategories.every((category) => item.category.includes(category))
        )
      : items;

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ fontWeight: "bold", backgroundColor: "#3498db", padding: "10px", color: "white", textAlign: "center" }}>
        {heading}
      </h1>

      {/* Category Selection */}
      <div style={{ textAlign: "center", margin: "20px 0", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
        {allCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            style={{
              padding: "8px 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              cursor: "pointer",
              backgroundColor: selectedCategories.includes(category) ? "#3498db" : "white",
              color: selectedCategories.includes(category) ? "white" : "#3498db",
              transition: "0.3s",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Show Filtered Items */}
      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>No items found</p>
      ) : (
        <ul className="list-group" style={{ display: "grid", gap: "10px", padding: 0, listStyle: "none", textAlign: "center" }}>
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: selectedIndex === index ? "#e0f7fa" : "white",
                transition: "background-color 0.3s",
              }}
              onClick={() => {
                setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection
                onSelectItem(item);
              }}
            >
              <strong>{item.title}</strong>
              {selectedIndex === index && <p className="mt-2 text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListGroup;
