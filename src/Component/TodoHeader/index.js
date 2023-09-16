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
    <div className="todo_header">
      {newTask ? (
        <div className="new__taks">
          <input
            type="text"
            className="input_task"
            placeholder="Enter your task here ..."
            value={newTodo}
            onChange={handleInputChange}
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
        <div>
          <button
            type="button"
            className="add_todo"
            onClick={() => setNewTask(true)}
          >
            {" "}
            <i className="fa-solid fa-circle-plus color--while style--margin"></i>
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoHeader;
