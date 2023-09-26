import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useState } from "react";
import { useContext } from "react";
import axios from "axios";

import {
  BsPencilSquare,
  BsCheckCircleFill,
  BsCaretUpFill,
  BsCaretDownFill,
} from "react-icons/bs";

const TodoItem = ({ dataTodos, todoCompleted, handleDeleteTodo }) => {
  const { id, todo, isCompleted, estPomodoros } = dataTodos;
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo);
  const [pomodoros, setPomodoros] = useState(estPomodoros);
  const { theme } = useContext(ThemeContext);

  const styleCompleted = isCompleted
    ? theme === "light"
      ? { color: "#087EA4" }
      : { color: "#149ECA" }
    : theme === "light"
    ? { color: "#404756" }
    :{ color: "#F6F7F9" } ;

  const classNameTaks =
    theme === "light"
      ? "todo__task todo__task--light"
      : "todo__task todo__task--dark";
  const classCompleted = isCompleted
    ? "competed competed-light competed-dark"
    : "";

  const handleUpdateTodo = (id) => {
    dataTodos.todo = todoText;
    setTodoText(dataTodos.todo);
    setIsEditing(false);
    dataTodos.estPomodoros = pomodoros;
    axios.put(`https://650d41c5a8b42265ec2be909.mockapi.io/todos/${id}`, dataTodos)
    
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

  return (
    <div className={classNameTaks}>
      {isEditing ? (
        <div className="edit__taks">
          <input
            type="text"
            className="input_task input_task-light input_task-dark"
            placeholder="Enter your task here ..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            autoFocus
          ></input>
          <p>Est Pomodoros</p>
          <div className="todo__task_pomodoros">
            <input
              type="number"
              className="input__pomodoros input_task-light input_task-dark"
              title="estPomodoros"
              value={pomodoros}
              readOnly
            />
            <button
              type="button"
              className="pomodoros-button"
              onClick={increase}
              title="up"
            >
              <BsCaretUpFill className="increase_button" />
            </button>
            <button
              type="button"
              className="pomodoros-button"
              onClick={decrease}
              title="down"
            >
              <BsCaretDownFill className="decrease_button" />
            </button>
          </div>

          <div className="edit__taks-button add__taks-button">
            <button
              type="button"
              className="todo-item_delete todo-item_delete--light todo-item_delete--dark"
              onClick={() => handleDeleteTodo(id)}
            >
              Delete
            </button>
            <div>
              <button
                type="button"
                className="todo-item_cancel todo-item_cancel--light todo-item_cancel--dark"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="todo-item_save"
                onClick={() => handleUpdateTodo(id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="task__item">
          <div>
            <button
              className="check_todo"
              title="Completed"
              onClick={() => todoCompleted(id)}
            >
              <BsCheckCircleFill
                className="check_todo-button"
                style={styleCompleted}
              />
            </button>
            <label className={classCompleted}>{todoText}</label>
          </div>
          <div>
            <label className={classCompleted}>{pomodoros}</label>
            <button
              className="button__edit_taks"
              title="Edit"
              onClick={() => setIsEditing(!isEditing)}
            >
              <BsPencilSquare className="edit_todo-button edit_todo-button--light edit_todo-button--dark" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
