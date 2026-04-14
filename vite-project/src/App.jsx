import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "study", completed: false },
          { id: 2, text: "workout", completed: false },
          { id: 3, text: "read", completed: false },
        ];
  });

  const [filter, setFilter] = useState("all");
  const [draggedId, setDraggedId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD TODO
  function handleAddTodo() {
    if (input.trim().length > 0) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
        },
      ]);
      setInput("");
    }
  }

  // DELETE TODO
  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // TOGGLE COMPLETE
  function handleToggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // DRAG START
  function handleDragStart(id) {
    setDraggedId(id);
  }

  // DRAG OVER
  function handleDragOver(e) {
    e.preventDefault();
  }

  // DROP (reorder)
  function handleDrop(id) {
    const draggedIndex = todos.findIndex((t) => t.id === draggedId);
    const dropIndex = todos.findIndex((t) => t.id === id);

    const updated = [...todos];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    setTodos(updated);
    setDraggedId(null);
  }

  // FILTER LOGIC
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1 className="app-header">Todo App</h1>

      {/* INPUT */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="type a task..."
          className="task-input"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />

        <button className="add-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* LIST */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            draggable
            onDragStart={() => handleDragStart(todo.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(todo.id)}
          >
            <span className="todo-text">
              {todo.text}
            </span>

            <div className="todo-actions">
              <button
                className="complete-button"
                onClick={() => handleToggleComplete(todo.id)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;