import TodoItem from "../TodoItem";

import "./style.css";

const TodoList = ({ dataTodos, todoCompleted, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="todo_list">
      {dataTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          dataTodos={todo}
          todoCompleted={todoCompleted}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};
export default TodoList;
