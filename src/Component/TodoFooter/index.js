import "./style.css";

const TodoFooter = ({ dataTodos }) => {
  const countTodoLeft = () => {
    return dataTodos.filter((todo) => !todo.isCompleted).length;
  };
  const count = countTodoLeft();

  return (
    <>
      {count > 0 ? (
        <div className="todo_footer">
          <p>{count} tasks left! </p>
          <p>MindX todolist</p>
        </div>
      ) : (
        <div className="todo_footer">
          <p>Competed todo! </p>
          <p>MindX todolist</p>
        </div>
      )}
    </>
  );
};

export default TodoFooter;
