import "./style.css";

const TodoItem = ({ data, todoCompleted, todoEdit, todoDelete}) => {
  const { id, todo, isCompleted } = data;
  const handleChange = () => {
    todoCompleted(id);
  };
  const done = isCompleted ? "todo_done" : "";

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
        <span className={done}>{todo}</span>
      </div>

      <div>
        <button className="btn_edit" onClick={()=>todoEdit(id)}>
          edit
        </button>
        <button className="btn_delete" onClick={() => todoDelete(id)}>
          delele
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
