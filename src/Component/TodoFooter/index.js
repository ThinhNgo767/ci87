import "./style.css";

const TodoFooter = ({ data}) => {
    const countTodoLeft = () => {
        return data.filter((todo) => !todo.isCompleted).length;
      };
    
  return (
    <div className="todo_footer">
      <p>{countTodoLeft()} tasks left!</p>
      <p>MindX todolist</p>
    </div>
  );
};

export default TodoFooter;
