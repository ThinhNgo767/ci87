import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const TodoFooter = ({ dataTodos, filter }) => {
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();
  const classTextFooter = theme === "light" ? "todo_footer footer_light":"todo_footer footer_dark"

  const countTodoLeft = () => {
    if (filter === "Active") {
      return dataTodos.filter((todo) => !todo.isCompleted).length;
    } else if (filter === "Completed") {
      return dataTodos.filter((todo) => todo.isCompleted).length;
    } else {
      return dataTodos.filter((todo) => todo.todo).length;
    }
  };
  const count = countTodoLeft();

  

  return (
    <div className={classTextFooter}>
      <p className='todo_footer-text'>{filter} <strong>{count}</strong> tasks </p>
      
      <button onClick={()=> {navigate("/")}}  className="todo_footer-btn">Back Home</button>
    </div>
  );
};

export default TodoFooter;
