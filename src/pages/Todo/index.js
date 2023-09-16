import TodoFooter from "../../Component/TodoFooter";
import TodoHeader from "../../Component/TodoHeader";
import TodoList from "../../Component/TodoList";
import { useState } from "react";
import { TODOS } from "../../data/todos";

const Todo = () => {
  // Khai báo state
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All todo");
  const [newTask, setNewTask] = useState(false);
  const [pomodoros, setPomodoros] = useState(1);
  
  // hàm xử lí khi input checkbox có sự thay đổi
  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo = { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    const movedTodo = updatedTodos.find((todo) => todo.id === id);
    const remainingTodos = updatedTodos.filter((todo) => todo.id !== id);
    setTodos([...remainingTodos, movedTodo]);
  };

  //event value input
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };
  // newtodo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const todo = {
      id: todos.length + 1,
      todo: newTodo,
      isCompleted: false,
      estPomodoros: pomodoros,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    setNewTask(false);
    setPomodoros(1);
  };
  // delete todo
  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };
  // filter todo
  const filterTodos = () => {
    if (filter === "Active todo") {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === "Completed todo") {
      return todos.filter((todo) => todo.isCompleted);
    } else {
      return todos.filter((todo) => todo.todo);
    }
  };

  return (
    <div className="todo__page">
      <TodoHeader
        handleInputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
        newTodo={newTodo}
        newTask={newTask}
        setNewTask={setNewTask}
        pomodoros={pomodoros}
        setPomodoros={setPomodoros}
      />
      <TodoList
        dataTodos={todos}
        todoCompleted={handleCheckboxChange}
        handleDeleteTodo={handleDeleteTodo}
        filterTodos={filterTodos}
        setFilter={setFilter}
        setNewPomodoros={setPomodoros}

      />
      <TodoFooter dataTodos={todos} filter={filter} />
    </div>
  );
};
export default Todo;
