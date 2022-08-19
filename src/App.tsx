import { useState } from "react";
// import "./App.css";
import Todo from "./components/todo";

function App() {
  console.count("app");

  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
