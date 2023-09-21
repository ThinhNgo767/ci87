import TodoItem from "../TodoItem";
import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";

const TodoList = ({
  todoCompleted,
  handleDeleteTodo,
  filterTodos,filter,
  setFilter,
}) => {
  const { theme } = useContext(ThemeContext);
  
  const handleChecked = (e) => {
    setFilter(e.target.value);
  };

  const classTodoList =
    theme === "light"
      ? "todo_list todo_list--light"
      : "todo_list todo_list--dark";
  const classFilter =
    theme === "light" ? "filter filter-light" : "filter filter-dark";

  return (
    <div className={classTodoList}>
      <div className="filter-task style--light style--dark">
        <label className={classFilter} htmlFor="all">
          <input
            type="radio"
            name="checktask"
            value="All"
            id="all"
            checked={filter === "All"}
            onChange={handleChecked}
          />
          All
        </label>
        <label className={classFilter} htmlFor="active">
          <input
            type="radio"
            name="checktask"
            value="Active"
            id="active"
            checked={filter === "Active"}
            onChange={handleChecked}
          />
          Active
        </label>
        <label className={classFilter} htmlFor="completed">
          <input
            type="radio"
            name="checktask"
            value="Completed"
            id="completed"
            checked={filter === "Completed"}
            onChange={handleChecked}
          />
          Completed
        </label>
      </div>
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
