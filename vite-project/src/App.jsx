import { useState } from "react";
import "./App.css";

function App() {
  // Setup state
  const [input, setInput] = useState(""); // For user input
  const [todos, setTodos] = useState([
    "study",
    "workout",
    "read",
  ]); // Fake todos for display

  // Function to add a new todo
  function handleAddTodo() {
    if (input.length > 0) {
      const newTodos = [...todos, input]; // Create new array
      setTodos(newTodos); // Update state
      setInput(""); // Clear input field
    }
  }


  function handleDeleteTodo(index) {
  const removeTodos = todos.filter((item, i) => {
    return i !== index;
    
  });
setTodos(removeTodos);

}

  return (
    <div className="app-container">
      <h1 className="app-header">Todo App</h1>

      {/* Input + Add Button */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="type a task..."
          onChange={(e) => setInput(e.target.value)}
          className="task-input"
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
            <button className="delete-button" onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;