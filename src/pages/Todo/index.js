import "./style.css";
import TodoFooter from "./component/TodoFooter";
import TodoHeader from "./component/TodoHeader";
import TodoList from "./component/TodoList";
import ThemeContext from "../../contexts/ThemeContext";

import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Todo = ({ isLoggedIn }) => {
  // Khai báo state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState(false);
  const [pomodoros, setPomodoros] = useState(1);
  const [idUser, setIdUser] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleFetchUser = () => {
      const userCookie = Cookies.get("user");
      let infoUser;
      if (userCookie) {
        infoUser = JSON.parse(userCookie);
      } else {
        infoUser = {};
      }
      setIdUser(infoUser.id);
    };
    handleFetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `https://650d41c5a8b42265ec2be909.mockapi.io/user/`
        );
        const userLogin = response.data.find((user) => user.id === id);
        if (userLogin) {
          setTodos(userLogin.todoTask);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(idUser);
  }, [idUser]);

  const classTodoPage =
    theme === "light"
      ? "todo__page todo__page-light"
      : "todo__page todo__page-dark";
  // hàm xử lí khi input checkbox có sự thay đổi
  const handleCheckboxChange = async (id) => {
    axios
      .get(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}`)
      .then((response) => {
        const userTask = response.data.todoTask;

        const updatedTodos = userTask.map((todo) => {
          if (todo.id === id) {
            todo = { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        });

        setTodos(updatedTodos);

        axios
          .put(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}`, {
            todoTask: updatedTodos,
          })
          .then(() => {
            console.log("Cập nhật nhiệm vụ thành công.");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật nhiệm vụ:", error);
          });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      });
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
    //
    axios
      .get(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}`)
      .then((response) => {
        const users = response.data;
        users.todoTask.push(todo);
        // Cập nhật danh sách todoTask mới lên API
        axios
          .put(
            `https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}`,
            users
          )
          .then((response) => {
            console.log("Thêm nhiệm vụ thành công.");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật danh sách todoTask:", error);
          });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      });

    setTodos([...todos, todo]);
    setNewTodo("");
    setNewTask(false);
    setPomodoros(1);
  };
  // delete todo
  const handleDeleteTodo = (todoId) => {
    axios
      .get(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}`)
      .then((response) => {
        const usersTaks = response.data.todoTask;
        const todoIndex = usersTaks.findIndex((todo) => todo.id === todoId);

        if (todoIndex !== -1) {
          usersTaks.splice(todoIndex, 1);

          axios
            .put(
              `https://650d41c5a8b42265ec2be909.mockapi.io/user/${idUser}/`,
              response.data
            )
            .then((response) => {
              console.log("Xóa nhiệm vụ thành công.");
            })
            .catch((error) => {
              console.error("Lỗi khi cập nhật danh sách todoTask:", error);
            });
        }

        setTodos(usersTaks);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      });
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
      {isLoggedIn ? (
        <>
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
            isLoggedIn={isLoggedIn}
            idUser={idUser}
          />
          <TodoFooter dataTodos={todos} filter={filter} />
        </>
      ) : (
        <>
          <div>
            Vui lòng{" "}
            <Link to="/sign-in" className="link_todo">
              <strong>Login</strong>
            </Link>{" "}
            để sử dụng dịch vụ này
          </div>
        </>
      )}
    </div>
  );
};
export default Todo;
