import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [text, setText] = useState("");
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function addTask() {
    if (!text.trim()) return;
    setTasks([...tasks, { text, completed: false }]);
    setText("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function toggleComplete(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  function editTask(index) {
    const updated = prompt("Edit task", tasks[index].text);
    if (updated) {
      const newTasks = [...tasks];
      newTasks[index].text = updated;
      setTasks(newTasks);
    }
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="todo-container">
        <div className="header">
          <h2>📝 To-Do List</h2>
          <button onClick={() => setDark(!dark)}>🌙</button>
        </div>

        <div className="input-group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, i) => (
            <li key={i} className={task.completed ? "completed" : ""}>
              <span>{task.text}</span>
              <div className="actions">
                <button onClick={() => editTask(i)}>✏️</button>
                <button onClick={() => toggleComplete(i)}>✔</button>
                <button onClick={() => deleteTask(i)}>✖</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
