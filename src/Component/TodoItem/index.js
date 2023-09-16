import "./style.css";
import { useState } from "react";
const TodoItem = ({ dataTodos, todoCompleted, handleDeleteTodo }) => {
  const { id, todo, isCompleted, estPomodoros } = dataTodos;
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo);

  const handleUpdateTodo = () => {
    dataTodos.todo = todoText;
    setTodoText(dataTodos.todo);
    setIsEditing(false);
  };
  
  const styleCompleted = { color: "#087EA4" };
  return (
    <div className="todo">
      <div>
        <button className="check_todo" onClick={()=>todoCompleted(id)}>
          <i
            className="fa-solid fa-circle-check"
            style={isCompleted ? styleCompleted : { color: "grey" }}
          ></i>
        </button>
        {/* <input
          type="checkbox"
          title="check todo"
          className="check_todo"
          checked={isCompleted}
          onChange={() => todoCompleted(id)}
        /> */}
        {isEditing ? (
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="edit_todo"
            autoFocus
          />
        ) : (
          <label className={isCompleted ? "competed" : ""}>{todoText}</label>
        )}
      </div>

      <div className="action_todo">
        <label className="estPomodoros">{estPomodoros}</label>
        {isEditing ? (
          <i
            className="fa-solid fa-check"
            title="submit"
            onClick={() => handleUpdateTodo()}
          ></i>
        ) : (
          <i
            className="fa-solid fa-pen-to-square edit_todo--hover"
            title="edit"
            onClick={() => setIsEditing(!isEditing)}
          ></i>
        )}

        <i
          className="fa-solid fa-trash-can delete_todo--hover"
          title="delete"
          onClick={() => handleDeleteTodo(id)}
        ></i>
      </div>
    </div>
  );
};

export default TodoItem;
