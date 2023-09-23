import "./style.css";
import TodoFooter from "./component/TodoFooter";
import TodoHeader from "./component/TodoHeader";
import TodoList from "./component/TodoList";
import ThemeContext from "../../contexts/ThemeContext";

import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  // Khai báo state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState(false);
  const [pomodoros, setPomodoros] = useState(1);
  

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://650d41c5a8b42265ec2be909.mockapi.io/todos/"
        );

        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener("load", fetchData);
    };
  }, []);


  const classTodoPage =
    theme === "light"
      ? "todo__page todo__page-light"
      : "todo__page todo__page-dark";
  // hàm xử lí khi input checkbox có sự thay đổi
  const handleCheckboxChange = async (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo = { ...todo, isCompleted: !todo.isCompleted };
        axios.put(`https://650d41c5a8b42265ec2be909.mockapi.io/todos/${id}`, todo)
      }
      return todo
    });
    setTodos(updatedTodos);
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
      key: todos.length + 1,
      todo: newTodo,
      isCompleted: false,
      estPomodoros: pomodoros,
    };
    axios.post('https://650d41c5a8b42265ec2be909.mockapi.io/todos', todo)
    setTodos([...todos, todo]);
    setNewTodo("");
    setNewTask(false);
    setPomodoros(1);
  };
  // delete todo
  const handleDeleteTodo = (todoId) => {
   
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos); 
        axios.delete(`https://650d41c5a8b42265ec2be909.mockapi.io/todos/${todoId}`)
  };
  // filter todo
  const filterTodos = () => {
    if (filter === "Active") {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === "Completed") {
      return todos.filter((todo) => todo.isCompleted);
    } else {
      return todos.filter((todo) => todo.todo);
    }
  };
  

  return (
    <div className={classTodoPage}>
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
        filter={filter}
        setFilter={setFilter}
      />
      <TodoFooter dataTodos={todos} filter={filter} />
      
    </div>
  );
};
export default Todo;
