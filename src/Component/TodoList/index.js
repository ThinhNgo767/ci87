import TodoItem from "../TodoItem";
import "./style.css"

const TodoList = ({data,todoCompleted}) => {
  return (
    <div className="todo_list">
       {data.map(todo => (
        <TodoItem key={todo.id} data={todo} checkCompleted={todoCompleted}/>
      ))}  
      
    </div>
  );
};
export default TodoList;