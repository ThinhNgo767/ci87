import "./style.css";

const TodoFooter = ({ dataTodos, filter }) => {
  const countTodoLeft = () => {
    if (filter === "Active todo") {
      return dataTodos.filter((todo) => !todo.isCompleted).length;
    } else if (filter === "Completed todo") {
      return dataTodos.filter((todo) => todo.isCompleted).length;
    } else {
      return dataTodos.filter((todo) => todo.todo).length;
    }
  };
  const count = countTodoLeft();

  return (
    <div className="todo_footer">
      <p>{filter} <strong>{count}</strong> tasks </p>
      <p>MindX todolist</p>
    </div>
  );
};

export default TodoFooter;
