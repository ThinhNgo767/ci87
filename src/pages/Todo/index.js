import TodoFooter from "../../Component/TodoFooter";
import TodoHeader from "../../Component/TodoHeader";
import TodoList from "../../Component/TodoList";
import { useState } from "react";
import { TODOS } from "../../data/todos";

const Todo =() =>{
  // Khai báo state
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoId, setTodoId] = useState(null);

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
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };
  // edit todo 
  const handleEditTodo = (todoId) => {
    const taskToEdit = todos.find((todo) => todo.id === todoId);
    setEditTodo(taskToEdit.todo);
    setTodoId(todoId);
    setIsEditing(true);
  };
  // update todo
  const handleUpdateTodo = () => {
    // tìm vị trí todo cần edit
    const taskIndex = todos.findIndex((todo) => todo.id === todoId);
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
  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
  };
  return (
    <div>
      <TodoHeader
        handleInputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
        newTodo={newTodo}
        editTodo={editTodo}
        isEditing={isEditing}
        setEditTodo={setEditTodo}
        handleUpdateTodo={handleUpdateTodo}
      
      />
      <TodoList
        dataTodos={todos}
        todoCompleted={handleCheckboxChange}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
       
      />
      <TodoFooter dataTodos={todos} />
    </div>
  );
}
export default Todo