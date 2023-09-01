import "./style.css";

const TodoFooter = ({ data }) => {
  const countTodoLeft = () => {
    return data.filter((todo) => !todo.isCompleted).length;
  };
  const counts = countTodoLeft();

  return (
    <>
      {counts > 0 ? (
        <div className="todo_footer">
          <p>{counts} tasks left! </p>
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
