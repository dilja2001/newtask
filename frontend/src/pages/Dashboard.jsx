
import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";

  // load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = filter ? `/tasks?status=${filter}` : "/tasks";
        const res = await API.get(url);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load tasks");
      }
    };
    fetchTasks();
  }, [filter]);

  // reusable reload
  const reloadTasks = async () => {
    try {
      const url = filter ? `/tasks?status=${filter}` : "/tasks";
      const res = await API.get(url);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //  ADD / UPDATE
  const addTask = async (data) => {
    try {
      if (editingTask) {
        const updatedData = {};
        Object.keys(data).forEach((key) => {
          if (data[key] !== editingTask[key]) {
            updatedData[key] = data[key];
          }
        });

        if (Object.keys(updatedData).length === 0) {
          alert("No changes made");
          return;
        }

        await API.put(`/tasks/${editingTask._id}`, updatedData);
        setEditingTask(null);
        alert("Task updated successfully ");
      } else {
        await API.post("/tasks", data);
        alert("Task created successfully ");
      }

      reloadTasks();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  //  DELETE
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      alert("Task deleted ");
      reloadTasks();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  //  TOGGLE STATUS
  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      reloadTasks();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

 return (
  <div className="d-flex bg-light min-vh-100">
      {/* SIDEBAR  */}
   <div
  className={`bg-dark text-white p-3 position-fixed h-100 ${
    sidebarOpen ? "d-block" : "d-none"
  } d-md-block`}
  style={{ width: "250px", zIndex: 1000 }}
>
      <h4 className="text-center mb-4"> Task Manager</h4>

      <div className="text-center mb-4">
        <div className="fw-bold"> {userName}</div>
        <small className="text-secondary">Welcome back</small>
      </div>

      <hr className="border-secondary" />

      <button className="btn btn-danger w-100 mt-3" onClick={logout}>
         Logout
      </button>
    </div>

    {/*  MAIN CONTENT */}
    <div className="flex-grow-1 ms-md-250">
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
        <button
          className="btn btn-outline-dark d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          
        </button>

        <span className="navbar-brand ms-2 fw-bold">
          Task Dashboard
        </span>
      </nav>

      {/*  PAGE BODY */}
      <div className="container-fluid p-4">
        {/*  FORM SECTION */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white fw-semibold">
             Add / Update Task
          </div>
          <div className="card-body">
            <TaskForm
              key={editingTask?._id || "new"}
              onSubmit={addTask}
              editingTask={editingTask}
            />
          </div>
        </div>

        {/*  FILTER + TITLE */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h4 className="fw-bold mb-0"> Your Tasks</h4>

          <select
            className="form-select w-auto shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/*  TASK GRID */}
        <div className="row g-4">
          {tasks.length === 0 ? (
            <div className="text-center text-muted py-5">
              <h5>No tasks found </h5>
              <p>Add a new task to get started</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="col-12 col-sm-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 task-card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-primary">
                      {task.title}
                    </h5>

                    <p className="card-text small text-muted flex-grow-1">
                      {task.description || "No description"}
                    </p>

                    <p className="mb-1 small">
                      <strong> Due:</strong>{" "}
                      {task.dueDate?.slice(0, 10) || "N/A"}
                    </p>

                    {/*  STATUS BADGE */}
                    <div className="mb-3">
                      <span
                        className={`badge px-3 py-2 ${
                          task.status === "completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Completed"
                          : " Pending"}
                      </span>
                    </div>

                    {/*  ACTION BUTTONS */}
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleStatus(task)}
                      >
                         Status
                      </button>

                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => setEditingTask(task)}
                      >
                         Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTask(task._id)}
                      >
                         Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);
}