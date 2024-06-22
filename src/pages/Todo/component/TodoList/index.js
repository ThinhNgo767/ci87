import TodoItem from "../TodoItem";
import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";
import { BsListUl, BsFilter } from "react-icons/bs";

const TodoList = ({
  todoCompleted,
  handleDeleteTodo,
  filterTodos,
  filter,
  setFilter,
  idUser,
}) => {
  const { theme } = useContext(ThemeContext);

  const handleChecked = (e) => {
    setFilter(e.target.value);
  };

  const Todos = filterTodos().map((todo) => (
    <TodoItem
      key={todo.key}
      dataTodos={todo}
      todoCompleted={todoCompleted}
      handleDeleteTodo={handleDeleteTodo}
      idUser={idUser}
    />
  ));

  const classTodoList =
    theme === "light"
      ? "todo_list todo_list--light"
      : "todo_list todo_list--dark";
  const classFilter =
    theme === "light" ? "filter filter-light" : "filter filter-dark";

  return (
    <div className={classTodoList}>
      <h4 className="filter-text filter-text--light filter-text--dark">
        <BsFilter className="filter_icon" /> Filter todo
      </h4>
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
      <h4 className="taks-list taks-list--light taks-list--dark">
        <BsListUl className="filter_icon" />
        Todo task
      </h4>
      {Todos}
    </div>
  );
};
export default TodoList;
