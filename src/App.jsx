import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = "https://l6xyvrdr93.execute-api.us-east-2.amazonaws.com/dev/todos"; 

  // 🟩 Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const parsedBody = JSON.parse(data.body);

      if (Array.isArray(parsedBody.tasks)) {
        setTasks(parsedBody.tasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🟩 Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = { task: input };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const responseBody = await res.text();
      console.log("POST response:", responseBody);

      if (!res.ok) throw new Error("Failed to add task");

      await fetchTasks(); // refresh list
      setInput("");
    } catch (err) {
      console.error("❌ Error adding task:", err);
    }
  };

  // 🟩 Delete a task
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });
      console.log(!res.ok)
      if (!res.ok) throw new Error("Failed to delete task");

      console.log(`✅ Task ${taskId} deleted`);

      // Remove from UI without waiting for re-fetch
      setTasks((prevTasks) => prevTasks.filter((t) => t.taskId !== taskId));
    } catch (err) {
      console.log("error")
      console.error("❌ Error deleting task:", err);
    }
  };

  return (
    <div className="box">
      <h1>Task Manager 📝</h1>

      {/* Input + Add Button */}
      <form onSubmit={addTask}>
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
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found in DynamoDB.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.taskId}>
              {task.taskName} <small>({task.createdAt})</small>
              {" "}
              <button 
                onClick={() => deleteTask(task.taskId)} 
                style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
