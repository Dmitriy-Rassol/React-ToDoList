import { useEffect, useState } from "react";
import "./TodoList.scss";

function TodoList({ todos, onDelete, onStatusChange }) {
const [isContent, setIsContent] = useState(false);

useEffect(() => {
  if(todos.length) {
    setIsContent(true)
  } else {
    setIsContent(false);
  }
},[todos])

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleCheckboxChange = (index) => {
    onStatusChange(index);
  };

  return (
    <div>
      <h2>Список задач</h2>
      
     {isContent && <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            className="todo-list__item"
            key={index}
           
          >
            <label className="custom-checkbox" htmlFor={`todoId-${index}`} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
                id={`todoId-${index}`}
                name={`todoId-${index}`}
              />
              {todo.title}<span className="checkmark"></span>
            </label>
<p>{todo.time}</p>
            <button onClick={() => handleDelete(index)}>Удалить</button>
          </li>
        ))}
      </ul>} 
    </div>
  );
}

export default TodoList;
