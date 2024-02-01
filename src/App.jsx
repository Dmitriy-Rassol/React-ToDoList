import TodoList from "./Components/TodoList/TodoList.jsx";
import AddTodoModal from "./Components/AddTodoModal/AddTodoModal.jsx";
import "./App.css";
import addTask from "./assets/addTask.png";

import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTime] = useState(new Date());
  const modalRef = useRef(null);

  const handleAddTodo = useCallback(
    (newTodo, status) => {
      setTodos([
        ...todos,
        {
          title: newTodo,
          completed: status,
          time: currentTime.toLocaleString(),
        },
      ]);
      setShowAddModal(false);
    },
    [todos]
  );

  const handleCancelAdd = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const handleAddButtonClick = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const handleDeleteTodo = useCallback(
    (index) => {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleStatusChange = useCallback(
    (index) => {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    },
    [todos]
  );

  const memoizedTodoList = useMemo(
    () => (
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onStatusChange={handleStatusChange}
      />
    ),
    [todos]
  );

  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useLayoutEffect(() => {
    modalRef.current = showAddModal;
    return () => {
      modalRef.current = null;
    };
  }, [showAddModal]);

  return (
    <div className="App">
      <h1>Приложение для управления задачами</h1>
      {memoizedTodoList}
      {showAddModal && (
        <AddTodoModal onAdd={handleAddTodo} onCancel={handleCancelAdd} />
      )}{" "}
      <button className="btn-add" onClick={handleAddButtonClick}>
        <img src={addTask} alt="добавить задачу" />
      </button>
    </div>
  );
}

export default App;
