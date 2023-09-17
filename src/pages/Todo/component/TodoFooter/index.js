import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";

const TodoFooter = ({ dataTodos, filter }) => {
  const {theme} = useContext(ThemeContext)

  const classTextFooter = theme === "light" ? "todo_footer footer_light":"todo_footer footer_dark"

  const countTodoLeft = () => {
    if (filter === "Active todo") {
      return dataTodos.filter((todo) => !todo.isCompleted).length;
    } else if (filter === "Completed todo") {
      return dataTodos.filter((todo) => todo.isCompleted).length;
    } else {
      return dataTodos.filter((todo) => todo.todo).length;
    }
  };
  const count = countTodoLeft();

  return (
    <div className={classTextFooter}>
      <p className='todo_footer-text'>{filter} <strong>{count}</strong> tasks </p>
      <p className='todo_footer-text'>MindX todolist</p>
    </div>
  );
};

export default TodoFooter;
