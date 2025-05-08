import { useState, useEffect } from "react";

const EVENT_TYPES = ["Campaign", "Task", "Event", "Announcement"];

const AdminEventManager = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    type: "Campaign",
    title: "",
    description: "",
    date: "",
    goalAmount: "",
  });

  const [editingId, setEditingId] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:5000/api/admin/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      goalAmount: formData.type === "Campaign" ? formData.goalAmount : undefined,
    };

    const url = editingId
      ? `http://localhost:5000/api/admin/events/${editingId}`
      : "http://localhost:5000/api/admin/events";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchEvents();
      setFormData({
        type: "Campaign",
        title: "",
        description: "",
        date: "",
        goalAmount: "",
      });
      setEditingId(null);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      type: event.type,
      title: event.title,
      description: event.description || "",
      date: event.date?.split("T")[0] || "",
      goalAmount: event.goalAmount || "",
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await fetch(`http://localhost:5000/api/admin/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEvents();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Create or Manage Events</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 bg-gray-50 p-4 rounded mb-8">
        <select
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="border p-2 rounded"
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          required
          className="border p-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Goal Amount (only for Campaign)"
          className="border p-2 rounded"
          value={formData.goalAmount}
          onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
          disabled={formData.type !== "Campaign"}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded col-span-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2">
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* List of Events */}
      <h4 className="text-md font-semibold mb-2">All Events</h4>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {events.map((ev) => (
          <div key={ev._id} className="bg-white p-4 border rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{ev.title}</p>
              <p className="text-sm text-gray-500">
                Type: {ev.type} | {ev.date?.split("T")[0]}
              </p>
              {ev.type === "Campaign" && (
                <p className="text-xs text-gray-500">Goal: ₹{ev.goalAmount}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(ev)}
                className="px-3 py-1 bg-yellow-400 text-white rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ev._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEventManager;
