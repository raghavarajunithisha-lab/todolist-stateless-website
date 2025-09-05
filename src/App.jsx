import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add new task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {/* Bring over your CSS */}
      <style>{`
        :root {
          --bg: #0b0f14;
          --card: #111827;
          --text: #e6edf3;
          --muted: #9aa4b2;
          --accent: #6ee7b7;
          --accent-2: #60a5fa;
          --radius: 14px;
          --shadow: 0 8px 24px rgba(0,0,0,0.35);
          --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial;
        }
        * { box-sizing: border-box; }
        body {
          margin:0;
          font-family: var(--font);
          background: radial-gradient(1200px 600px at 20% -10%, rgba(96,165,250,.12), transparent 60%),
                      radial-gradient(900px 500px at 120% 10%, rgba(110,231,183,.10), transparent 55%),
                      var(--bg);
          color: var(--text);
          display:flex;
          justify-content:center;
          align-items:center;
          min-height:100vh;
          padding:20px;
        }
        .box {
          background: var(--card);
          border: 1px solid rgba(255,255,255,.05);
          border-radius: var(--radius);
          padding: 40px 28px;
          box-shadow: var(--shadow);
          width:100%;
          max-width:420px;
          text-align:center;
        }
        h1 {
          margin:0 0 20px;
          font-size: 26px;
          font-weight:700;
          letter-spacing:.3px;
        }
        form {
          display:flex;
          gap:10px;
        }
        input {
          flex:1;
          padding:12px 14px;
          border-radius: var(--radius);
          border:0;
          outline:0;
          font-size:15px;
          background:#0e1622;
          color:var(--text);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
        }
        button {
          padding:12px 20px;
          border-radius: var(--radius);
          border:0;
          font-weight:700;
          background: linear-gradient(135deg,var(--accent),var(--accent-2));
          color:#0b1020;
          cursor:pointer;
          opacity:1;
        }
        button:disabled {
          cursor:not-allowed;
          opacity:.6;
        }
        ul {
          list-style:none;
          margin:20px 0 0;
          padding:0;
          text-align:left;
        }
        li {
          background:#0e1622;
          border-radius: var(--radius);
          padding:10px 14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom:10px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
        }
        li span {
          flex:1;
          cursor:pointer;
        }
        li span.completed {
          text-decoration: line-through;
          color: var(--muted);
        }
        li button {
          background:none;
          color:#f87171;
          font-size:16px;
          padding:4px 8px;
          cursor:pointer;
        }
        li button:hover {
          color:#ef4444;
        }
      `}</style>

      <div className="box">
        <h1>Welcome 👋</h1>

        {/* Input + Add Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your task…"
          />
          <button type="submit" disabled={!input.trim()}>
            Add
          </button>
        </form>

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                className={task.completed ? "completed" : ""}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--muted)" }}>
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}
