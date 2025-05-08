import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Volunteer = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [localProgress, setLocalProgress] = useState({});

  const handleSubmit = async (formData) => {
    try {
      const url = formData.name ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "Volunteer" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Something went wrong");
      login({ ...data.user, token: data.token });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const res = await fetch(`http://localhost:5000/api/volunteer/tasks/${user.email}`);
      const data = await res.json();
      setTasks(data);
      const initialProgress = {};
      data.forEach((task) => (initialProgress[task._id] = task.progress));
      setLocalProgress(initialProgress);
    };

    const fetchEvents = async () => {
      const res = await fetch("http://localhost:5000/api/volunteer/events"); // ✅ updated
      const data = await res.json();
      setEvents(data);
    };

    fetchTasks();
    fetchEvents();
  }, [user]);

  const handleProgressChange = (taskId, value) => {
    setLocalProgress((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleProgressSubmit = async (taskId) => {
    const newProgress = localProgress[taskId];

    await fetch(`http://localhost:5000/api/volunteer/tasks/update/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress: newProgress }),
    });

    const currentTask = tasks.find((t) => t._id === taskId);
    if (currentTask) {
      await fetch("http://localhost:5000/api/volunteer/submit-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteerName: user.name,
          email: user.email,
          taskId: currentTask._id,
          taskTitle: currentTask.title,
          progress: newProgress,
          deadline: currentTask.deadline,
        }),
      });
    }

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, progress: newProgress } : task
      )
    );
    alert("Task progress submitted!");
  };

  // const handleEventRegister = async (eventId) => {
  //   await fetch("http://localhost:5000/api/volunteer/events/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ volunteer: user.name, email: user.email, eventId }),
  //   });
  //   alert("Successfully registered for event!");
  // };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        type: feedback.type,
        message: feedback.message,
      }),
    });
    setFeedback({ type: "", message: "" });
    alert("Feedback submitted!");
  };

  if (!user || user.role !== "Volunteer") {
    return (
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Welcome, Volunteer!</h2>
        <p className="mb-6 text-gray-600 max-w-xl mx-auto">
          Join our mission, help the community, and track your tasks and events here.
        </p>
        <AuthForm role="Volunteer" onSubmit={handleSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Volunteer Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["tasks", "events", "feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-white border border-green-600 text-green-600"
            }`}
          >
            {tab === "tasks"
              ? "Assigned Tasks"
              : tab === "events"
              ? "Upcoming Events"
              : "Suggestion Box"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded shadow">
        {activeTab === "tasks" && (
          <>
            <h3 className="text-lg font-semibold mb-4">📋 Assigned Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks assigned.</p>
            ) : (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li key={task._id} className="p-4 border rounded shadow-sm">
                    <h4 className="font-semibold text-green-700">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">Deadline: {task.deadline}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={localProgress[task._id] || task.progress}
                        onChange={(e) => handleProgressChange(task._id, e.target.value)}
                      >
                        <option>Not started</option>
                        <option>In progress</option>
                        <option>Completed</option>
                      </select>
                      <button
                        onClick={() => handleProgressSubmit(task._id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

{activeTab === "events" && (
  <>
    <h3 className="text-lg font-semibold mb-4">📅 Upcoming Events</h3>
    {events.length === 0 ? (
      <p className="text-gray-500">No events available.</p>
    ) : (
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="p-4 border rounded shadow-sm">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{event.date}</p>
          </li>
        ))}
      </ul>
    )}
  </>
)}


        {activeTab === "feedback" && (
          <>
            <h3 className="text-lg font-semibold mb-4">💬 Suggestion Box</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <select
                value={feedback.type}
                onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Feature">Feature Request</option>
                <option value="Bug">Issue</option>
                <option value="General">General Feedback</option>
              </select>
              <textarea
                rows="4"
                placeholder="Your feedback..."
                className="w-full border p-2 rounded"
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                required
              ></textarea>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Volunteer;
