import TodoItem from "../TodoItem";
import "./style.css";

const TodoList = ({
  dataTodos,
  todoCompleted,
  handleDeleteTodo,
  filterTodos,
  setFilter,
  setNewPomodoros,
}) => {
  return (
    <div className="todo_list">
      <form style={{ display: "flex", marginBottom: "1rem" }}>
        <select
          className="filer_todo"
          name="filer_todo"
          title="filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All todo">All todo</option>
          <option value="Active todo">Active todo</option>
          <option value="Completed todo">Completed todo</option>
        </select>
      </form>

      {filterTodos().map((todo) => (
        <TodoItem
          key={todo.id}
          dataTodos={todo}
          todoCompleted={todoCompleted}
          handleDeleteTodo={handleDeleteTodo}
          setNewPomodoros={setNewPomodoros}
        />
      ))}
    </div>
  );
};
export default TodoList;
