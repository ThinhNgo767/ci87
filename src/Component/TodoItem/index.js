import "./style.css";

const TodoItem = ({ data, checkCompleted }) => {
  const { id, todo, isCompleted } = data;
  const handleChange = () => {
    checkCompleted(id);
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
        <button className="btn_edit">edit</button>
        <button className="btn_delete">dele</button>
      </div>
    </div>
  );
};

export default TodoItem;
