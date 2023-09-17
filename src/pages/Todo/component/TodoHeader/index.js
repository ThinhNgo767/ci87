import { useContext } from "react";

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
  const {theme} = useContext(ThemeContext)
  const classNewTask = theme === "light" ?"new__taks new__taks-light" :"new__taks new__taks-dark"
  const classInputTaks =theme === "light" ?"input_task input_task-light" :"input_task input_task-dark"
  const classInputPomodoros =theme === "light" ?"input__pomodoros input_task-light" :"input__pomodoros input_task-dark"

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
    <div className='add__taks'>
      {newTask ? (
        <div className={classNewTask}>
          <input
            type="text"
            className={classInputTaks}
            placeholder="Enter your task here ..."
            value={newTodo}
            onChange={handleInputChange}
            autoFocus
          ></input>
          <p>Est Pomodoros</p>
          <div className="header__pomodoros">
            <input
              type="number"
              className={classInputPomodoros}
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
          <div className="add__taks-button">
            <button
              type="button"
              className="cancel_todo"
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
        <div className="header_theme_btn">
          <button
            type="button"
            className="add_todo"
            onClick={() => setNewTask(true)}
          >
            <i className="fa-solid fa-circle-plus color--while style--margin"></i>
            Add Task
          </button>
          
        </div>
      )}
    </div>
  );
};

export default TodoHeader;
