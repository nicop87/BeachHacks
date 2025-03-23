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
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const itemsPerPage = 99;

  // Extract unique categories from items
  const allCategories = [...new Set(items.flatMap((item) => item.category))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setSelectedIndex(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setSelectedIndex(null);
    setCurrentPage(1);
  };

  const filteredItems = items
    .filter((item) =>
      selectedCategories.length > 0
        ? selectedCategories.every((category) =>
            item.category.includes(category)
          )
        : true
    )
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#CADCFC",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          backgroundColor: " #00246B",
          padding: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        {heading}
      </h1>

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

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={() => setCategoriesVisible(!categoriesVisible)}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            cursor: "pointer",
            backgroundColor: "#3498db",
            color: "white",
            transition: "0.3s",
          }}
        >
          {categoriesVisible ? "Hide Console" : "Show Console"}
        </button>
      </div>

      {categoriesVisible && (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {allCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: "8px 15px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                cursor: "pointer",
                backgroundColor: selectedCategories.includes(category)
                  ? "#00246B"
                  : "white",
                color: selectedCategories.includes(category)
                  ? "white"
                  : "#3498db",
                transition: "0.3s",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {paginatedItems.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          No items found
        </p>
      ) : (
        <>
          <ul
            className="list-group"
            style={{
              display: "grid",
              gap: "10px",
              padding: 0,
              listStyle: "none",
              textAlign: "center",
              gridTemplateColumns: "repeat(3, 1fr)"
            }}
          >
            {paginatedItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item"
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedIndex === index ? "#e0f7fa" : "white",
                  transition: "background-color 0.3s",
                }}
                onClick={() => {
                  setSelectedIndex(index === selectedIndex ? null : index);
                  onSelectItem(item);
                }}
              >
                <strong>{item.title}</strong>
                {selectedIndex === index && (
                  <p className="mt-2 text-muted">{item.description}</p>
                )}
              </li>
            ))}
          </ul>

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
