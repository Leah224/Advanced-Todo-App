import { useState } from "react";
import "./App.css";

function App() {
  // Setup state
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { text: "study", completed: false },
    { text: "workout", completed: false },
    { text: "read", completed: false },
  ]);

  // Add todo
  function handleAddTodo() {
    if (input.trim().length > 0) {
      const newTodos = [
        ...todos,
        { text: input.trim(), completed: false },
      ];
      setTodos(newTodos);
      setInput("");
    }
  }

  // Delete todo
  function handleDeleteTodo(index) {
    const removeTodos = todos.filter((item, i) => i !== index);
    setTodos(removeTodos);
  }

  // Toggle complete
  function handleToggleComplete(index) {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="app-container">
      <h1 className="app-header">Todo App</h1>

      {/* Input */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="type a task..."
          className="task-input"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">

            <span
              onClick={() => handleToggleComplete(index)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>

            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;