import TodoList from "./Components/TodoList/TodoList.jsx";
import AddTodoModal from "./Components/AddTodoModal/AddTodoModal.jsx";
import "./App.css";

import { useState, useMemo, useCallback, useRef, useLayoutEffect, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const modalRef = useRef(null);

  const handleAddTodo = useCallback(
    (newTodo, status) => {
      setTodos([...todos, { title: newTodo, completed: status }]);
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
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTodos(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (todos.length)  localStorage.setItem('tasks', JSON.stringify(todos));
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
      <button onClick={handleAddButtonClick}>Добавить задачу</button>
    </div>
  );
}

export default App;
