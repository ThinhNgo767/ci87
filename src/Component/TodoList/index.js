import TodoItem from "../TodoItem";
import "./style.css";

const TodoList = ({ data, todoCompleted, todoEdit, todoDelete }) => {
  return (
    <div className="todo_list">
      {data.map((todo) => (
        <TodoItem
          key={todo.id}
          data={todo}
          todoCompleted={todoCompleted}
          todoEdit={todoEdit}
          todoDelete={todoDelete}
        />
      ))}
    </div>
  );
};
export default TodoList;
