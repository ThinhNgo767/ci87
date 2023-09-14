import "./style.css";

const TodoHeader = ({
  handleInputChange,
  handleAddTodo,
  newTodo,
  editTodo,
  setEditTodo,
  isEditing,
  handleUpdateTodo,
}) => {
  
  const handleChange = (e) => {
    setEditTodo(e.target.value);
  };


  return (
    <div className="todo_header">
      {isEditing ? (
        <div>
          <input
            type="text"
            className="input_task"
            value={editTodo}
            onChange={handleChange}
          />
          <button type="submit" className="edit_todo" onClick={handleUpdateTodo}>
            Update
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            className="input_task"
            placeholder="Enter your task here ..."
            onChange={handleInputChange}
            value={newTodo}
          ></input>
          <button type="button" className="add_todo" onClick={handleAddTodo}>
            Add todo
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoHeader;
