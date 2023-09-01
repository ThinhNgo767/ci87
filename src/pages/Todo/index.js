import TodoFooter from "../../Component/TodoFooter";
import TodoHeader from "../../Component/TodoHeader";
import TodoList from "../../Component/TodoList";
import { useState } from "react";
import { TODOS } from "../../data/todos";

export default function Todo() {
  // Khai báo state
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);

  // hàm xử lí khi input checkbox có sự thay đổi
  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  //hàm event value input
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };
  // thêm newtodo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const newTask = {
      id: todos.length + 1,
      todo: newTodo,
      isCompleted: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };
  // edit todo 
  const handleEditClick = (taskId) => {
    const taskToEdit = todos.find((todo) => todo.id === taskId);
    setEditTodo(taskToEdit.todo);
    setTaskId(taskId);
    setIsEditing(true);
  };
  // hàm update todo
  const handleUpdateTask = () => {
    // tìm vị trí todo cần edit
    const taskIndex = todos.findIndex((todo) => todo.id === taskId);
    if (taskIndex !== -1) {
      // clone arr
      const updatedTodos = [...todos];
      // Update  todo
      updatedTodos[taskIndex].todo = editTodo;
      // Update lại todos cho state
      setTodos(updatedTodos);
      //
      setEditTodo("");
      setIsEditing(false);
    }
  };
  const handleDeleteClick = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId);
    
    setTodos(updatedTodos);
  };
  return (
    <div>
      <TodoHeader
        valueTodo={handleInputChange}
        handleAddTodo={handleAddTodo}
        newTodo={newTodo}
        editTodo={editTodo}
        isEditing={isEditing}
        setEditTodo={setEditTodo}
        handleUpdateTask={handleUpdateTask}
      
      />
      <TodoList
        data={todos}
        todoCompleted={handleCheckboxChange}
        todoEdit={handleEditClick}
        todoDelete={handleDeleteClick}
       
      />
      <TodoFooter data={todos} />
    </div>
  );
}
