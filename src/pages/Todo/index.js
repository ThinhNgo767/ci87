import TodoFooter from "../../Component/TodoFooter";
import TodoHeader from "../../Component/TodoHeader";
import TodoList from "../../Component/TodoList";
import { useState } from "react";
import { TODOS } from "../../data/todos";

export default function Todo() {
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState("");

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  //
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };
  
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const newTask = {
      id: todos.length + 1,
      todo: newTodo,
      isCompleted: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };
  
  return (
    <div>
      <TodoHeader
        valueTodo={handleInputChange}
        addTodo={handleAddTodo} value={newTodo}
      />
      <TodoList data={todos} todoCompleted={handleCheckboxChange}/>
      <TodoFooter data={todos} />
    </div>
  );
}
