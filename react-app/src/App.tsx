import ListGroup from "./components/ListGroup";

function App() {
  const items = [
    { title: "Person", description: "Why are you here" },
    { title: "Person", description: "Why are you here" },
    { title: "Person", description: "Why are you here" },
  ];
  return (
    <div>
      <ListGroup
        items={items}
        heading="A list"
        onSelectItem={(item) => console.log("Selected:", item)}
      />
    </div>
  );
}

export default App;
