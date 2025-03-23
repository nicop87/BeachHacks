import ListGroup from "./components/ListGroup";

function App() {
  const items = [
    { title: "Person1", description: "Why are you here", category: ['Android','IOS'] },
    { title: "Person2", description: "Why are you here", category: ['PC','IOS'] },
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
