import TodoItem from "../TodoItem";
import { useState } from "react";
import "./style.css";

const TodoList = ({
  dataTodos,
  todoCompleted,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterTodos = () => {
    if (filter === "Active todo") {
      return dataTodos.filter((todo) => !todo.isCompleted);
    } else if (filter === "Completed todo") {
      return dataTodos.filter((todo) => todo.isCompleted);
    } else {
      return dataTodos.filter((todo) => todo.todo);
    }
  };
  return (
    <div className="todo_list">
      <form style={{ display: "flex", marginBottom: "1rem" }}>
        <select
          className="filer_todo"
          name="filer_todo"
          title="filter"
          onChange={handleFilterChange}
        >
          <option>All todo</option>
          <option>Active todo</option>
          <option>Completed todo</option>
        </select>
      </form>

      {filterTodos().map((todo) => (
        <TodoItem
          key={todo.id}
          dataTodos={todo}
          todoCompleted={todoCompleted}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};
export default TodoList;
