
import { useState } from "react";

export default function TaskForm({ onSubmit, editingTask }) {
  const [form, setForm] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    dueDate: editingTask?.dueDate
      ? editingTask.dueDate.slice(0, 10)
      : ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    if (!editingTask) {
      setForm({ title: "", description: "", dueDate: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-12 col-md-4">
        <input
          className="form-control"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12 col-md-4">
        <input
          className="form-control"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12 col-md-3">
        <input
          type="date"
          className="form-control"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12 col-md-1 d-grid">
        <button className="btn btn-success">
          {editingTask ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}