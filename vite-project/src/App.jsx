import { useState } from 'react'
import './App.css'

function App() {
  //setup state
  const [input, setInput] = useState(""); //for future user input
  const [todos, setTodos] = useState([
    "study",
    "workout",
    "read",
  ]); //fake todos for display

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
        classname="task-input"
      />
      <button className="add-button">Add</button>
    </div>
    {/* Todo List */}
     {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;