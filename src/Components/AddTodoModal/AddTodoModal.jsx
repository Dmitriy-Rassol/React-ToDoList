import "./AddTodoModal.scss";
import closePng from "../../assets/close.png";

import { useState, useRef, useEffect } from "react";

function AddTodoModal({ onAdd, onCancel }) {
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddClick = () => {
    if (newTodo) {
      onAdd(newTodo, false);
      setNewTodo("");
    } else {
      inputRef.current.focus();
      inputRef.current.placeholder = 'Введите название задачи';
    }
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={handleCancelClick}>
          <img src={closePng} alt="закрыть" />
        </button>
        <h2>Добавить задачу</h2>
        <div className="modal-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={inputRef}
          placeholder="Задача"
        />
        <button onClick={handleAddClick}>Добавить</button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;
