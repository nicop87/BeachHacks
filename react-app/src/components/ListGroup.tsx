import { useState } from "react";

interface Item {
  title: string;
  description: string;
}

interface Props {
  items: Item[];
  heading: string;
  onSelectItem: (item: Item) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
    return (
      <div style={{
        // backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2900280.jpg&f=1&nofb=1&ipt=d60e1a23352f65bffdf8cd3fe3361686dd37dc531c1929da7379739f99fcc25d&ipo=images')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold",backgroundColor: "#3498db" }}>{heading}</h1>
        {items.length === 0 && <p>No items found</p>}
        <ul 
          className="list-group"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
            padding: 0,
            listStyle: "none",
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedIndex(selectedIndex === index ? null : index);
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
      </div>
    );
  }
  
  export default ListGroup;