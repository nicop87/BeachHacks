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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Extract unique categories from items
  const allCategories = [...new Set(items.flatMap((item) => item.category))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
    setSelectedIndex(null);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setSelectedIndex(null);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Apply category and search filtering
  const filteredItems = items
    .filter((item) =>
      selectedCategories.length > 0
        ? selectedCategories.every((category) => item.category.includes(category))
        : true
    )
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ fontWeight: "bold", backgroundColor: "#3498db", padding: "10px", color: "white", textAlign: "center" }}>
        {heading}
      </h1>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "50%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
          }}
        />
      </div>

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
      {paginatedItems.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>No items found</p>
      ) : (
        <>
          <ul className="list-group" style={{ display: "grid", gap: "10px", padding: 0, listStyle: "none", textAlign: "center" }}>
            {paginatedItems.map((item, index) => (
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

          {/* Pagination Controls */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{
                  padding: "10px 15px",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor: "#3498db",
                  color: "white",
                  transition: "0.3s",
                }}
              >
                Previous Page
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{
                  padding: "10px 15px",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor: "#3498db",
                  color: "white",
                  transition: "0.3s",
                }}
              >
                Next Page
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ListGroup;
