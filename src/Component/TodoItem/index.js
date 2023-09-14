import "./style.css";

const TodoItem = ({
  dataTodos,
  todoCompleted,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  const { id, todo, isCompleted } = dataTodos;

  const handleChange = () => {
    todoCompleted(id);
  };

  return (
    <div className="todo">

      <div>
        <input
          type="checkbox"
          title="check todo"
          className="check_todo"
          checked={isCompleted}
          onChange={handleChange}
        />
        <span className={isCompleted ? "competed" :""}>
          {todo}
        </span>
      </div>

      <div className="action_todo">
          <i
            className="fa-solid fa-pen-to-square"
            title="edit"
            onClick={() => handleEditTodo(id)}
          ></i>{" "}
          <i
            className="fa-solid fa-trash-can"
            title="delete"
            onClick={() => handleDeleteTodo(id)}
          ></i>
        
      </div>
    </div>
  );
};

export default TodoItem;
