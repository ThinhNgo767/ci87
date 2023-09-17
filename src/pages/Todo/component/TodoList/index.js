
import TodoItem from "../TodoItem";
import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";

const TodoList = ({
  dataTodos,
  todoCompleted,
  handleDeleteTodo,
  filterTodos,
  setFilter,
}) => {
const {theme} = useContext(ThemeContext)
const classFilter = theme === "light" ? "filer_todo filter-light" :"filer_todo filter-dark"

  return (
    <div className="todo_list">
      <form style={{ display: "flex", marginBottom: "1rem" }}>
        <select
          className={classFilter}
          name="filer_todo"
          title="filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All todo">All todo</option>
          <option value="Active todo">Active todo</option>
          <option value="Completed todo">Completed todo</option>
        </select>
      </form>

      {filterTodos().map((todo) => (
        <TodoItem
          key={todo.id}
          dataTodos={todo}
          todoCompleted={todoCompleted}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};
export default TodoList;