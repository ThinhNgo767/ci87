import { useContext } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import ThemeContext from "../../../../contexts/ThemeContext";

import "./style.css";

const TodoHeader = ({
  handleInputChange,
  handleAddTodo,
  newTodo,
  newTask,
  setNewTask,
  pomodoros,
  setPomodoros,
}) => {
  const { theme } = useContext(ThemeContext);

  const classTodoHeader =
    theme === "light"
      ? "todo-header_add-taks todo-header_add-taks--light"
      : "todo-header_add-taks todo-header_add-taks--dark";

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
    <div className={classTodoHeader}>
      {newTask ? (
        <div className="new__taks new__taks-light new__taks-dark">
          <input
            type="text"
            className="input_task input_task-light input_task-dark"
            placeholder="Enter your task here ..."
            value={newTodo}
            onChange={handleInputChange}
            autoFocus
          ></input>
          <p>Est Pomodoros</p>
          <div className="header__pomodoros">
            <input
              type="number"
              className="input__pomodoros input_task-light input_task-dark"
              title="est pomodoros"
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
          <div className="add__taks-button">
            <button
              type="button"
              className="cancel_todo-light cancel_todo-dark"
              onClick={() => setNewTask(false)}
            >
              Cancel
            </button>
            <button type="button" className="save_todo" onClick={handleAddTodo}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="header_addtask-button">
          <button
            type="button"
            className="button_add_task"
            onClick={() => setNewTask(true)}
          >
            <BsPlusCircleFill className="button_plus-style" />
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoHeader;
