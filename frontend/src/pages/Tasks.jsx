import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateTaskAdmin() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.data));
  }, []);

  const handleCreate = async () => {
    await api.post("/tasks", {
      title,
      description,
      userId, // 👈 assigned user
    });

    alert("Task created");
  };

  return (
    <div className="card">
      <h2>Create Task</h2>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <button onClick={handleCreate}>Create Task</button>
    </div>
  );
}
