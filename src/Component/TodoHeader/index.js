import "./style.css";

const TodoHeader = ({valueTodo,addTodo,value}) => {
    
  return (
    <div className="todo_header">
      <input
        type="text"
        className="input_task"
        placeholder="Enter your task here ..." onChange={valueTodo} value={value}
      ></input>
      <button type="button" className="add_todo" onClick={addTodo}>
        Add todo
      </button>
    </div>
  );
};

export default TodoHeader;
