import "./TodoList.scss";

function TodoList({ todos, onDelete, onStatusChange }) {
  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleCheckboxChange = (index) => {
    onStatusChange(index);
  };

  return (
    <div>
      <h2>Список задач</h2>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li className="todo-list__item"
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <label htmlFor={`todoId-${index}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
                id={`todoId-${index}`}
                name={`todoId-${index}`}
              />
              {todo.title}
            </label>

            <button onClick={() => handleDelete(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
