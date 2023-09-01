import "./style.css";

const TodoHeader = ({
  valueTodo,
  addTodo,
  newTodo,
  editTodo,
  setEditTodo,
  isEditing,
  handleUpdateTask,
}) => {
  
  const handleChange = (e) => {
    setEditTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask();
  };

  return (
    <div className="todo_header">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input_task"
            value={editTodo}
            onChange={handleChange}
          />
          <button type="submit" className="edit_todo">
            Update
          </button>
        </form>
      ) : (
        <div>
          <input
            type="text"
            className="input_task"
            placeholder="Enter your task here ..."
            onChange={valueTodo}
            value={newTodo}
          ></input>
          <button type="button" className="add_todo" onClick={addTodo}>
            Add todo
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoHeader;
