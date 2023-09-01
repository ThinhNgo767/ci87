import "./App.css";
import { useState } from "react";
import Todo from "./pages/Todo";

function App() {
  const [show ,setShow] = useState(true)
  const click =()=>{
    setShow(!show)
  }
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
