import { useState, useEffect } from "react";
import ListGroup from "./components/ListGroup";
import gamesData from "./data/data.json"; // Import the JSON file
import platformsData from "./data/platforms.json"; // Import platform names

interface Game {
  id: number;
  name: string;
  platforms?: number[]; // Make platforms optional
}

interface Platform {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<{ title: string; description: string; category: string[] }[]>([]);

  useEffect(() => {
    if (!Array.isArray(gamesData) || !Array.isArray(platformsData)) {
      console.error("Invalid JSON structure", { gamesData, platformsData });
      return;
    }

    // Convert platform IDs to names
    const platformLookup: { [key: number]: string } = Object.fromEntries(
      platformsData.map((platform: { id: number; name: string }) => [platform.id, platform.name])
    );

    // Format games data
    const formattedItems = gamesData.map((game) => ({
      title: game.name,
      description: `Available on: ${
        (game.platforms ?? []).map((id) => platformLookup[id] || "Unknown").join(", ") || "No platform listed"
      }`,
      category: game.platforms?.map((id) => platformLookup[id] || "Unknown") || [],
    }));

    setItems(formattedItems);
  }, []);

  return (
    <div>
      <ListGroup
        items={items}
        heading="Game List"
        onSelectItem={(item) => console.log("Selected:", item)}
      />
    </div>
  );
}

export default App;
