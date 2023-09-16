import "./style.css";
import { useState } from "react";
const TodoItem = ({ dataTodos, todoCompleted, handleDeleteTodo ,setNewPomodoros}) => {
  const { id, todo, isCompleted, estPomodoros } = dataTodos;
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo);
  const [pomodoros, setPomodoros] = useState(estPomodoros);

  const handleUpdateTodo = () => {
    dataTodos.todo = todoText;
    setTodoText(dataTodos.todo);
    setIsEditing(false);
    dataTodos.estPomodoros = pomodoros
  };

  const increase = () => {
    if (pomodoros === 10) {
      return;
    }
    setPomodoros(pomodoros + 1);
  };
  const decrease = () => {
    if (pomodoros === 1) {
      return;
    }
    setPomodoros(pomodoros - 1);
  };

  const styleCompleted = { color: "#087EA4" };
  return (
    <div className="todo__task">
      {isEditing ? (
        <div className="edit__taks">
          <input
            type="text"
            className="input_task"
            placeholder="Enter your task here ..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            autoFocus
          ></input>
          <p>Est Pomodoros</p>
          <div className="header__pomodoros">
            <input
              type="number"
              className="input__estPomodoros"
              title="estPomodoros"
              value={pomodoros}
              readOnly
            />
            <button onClick={increase}>
              <i className="fa-solid fa-caret-up color--while"></i>
            </button>
            <button onClick={decrease}>
              <i className="fa-solid fa-caret-down color--while"></i>
            </button>
          </div>

          <div className="edit__taks-button add__taks-button">
            <button
              type="button"
              className="delete_todo"
              onClick={() => handleDeleteTodo(id)}
            >
              Delete
            </button>
            <div>
              <button
                type="button"
                className="cancel_todo"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="save_todo"
                onClick={() => handleUpdateTodo()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="task__item">
          <div>
          <button className="check_todo" onClick={() => todoCompleted(id)}>
            <i
              className="fa-solid fa-circle-check"
              style={isCompleted ? styleCompleted : { color: "grey" }}
            ></i>
          </button>
          <label className={isCompleted ? "competed" : ""}>{todoText}</label>
          </div>
         <div>
         <label className="estPomodoros">{pomodoros}</label>
          <button
            className="button__edit_taks"
            title="edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className="fa-solid fa-pen-to-square edit_todo--hover"></i>
          </button>
         </div>
          
        </div>
      )}
    </div>
  );
};

export default TodoItem;
