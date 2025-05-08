import { useState, useEffect } from "react";

const OngoingTasks = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:5000/api/admin/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const filterByType = (type) =>
    events.filter((item) => item.type === type && item.title.toLowerCase().includes(search.toLowerCase()));

  const campaigns = filterByType("Campaign");
  const tasks = filterByType("Task");
  const calendarEvents = filterByType("Event");
  const announcements = filterByType("Announcement");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">📢 Ongoing Tasks & Campaigns</h1>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search campaigns, tasks, events or announcements..."
          className="px-4 py-2 border rounded w-full sm:w-1/2 shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Announcements */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">📣 Announcements</h2>
        <ul className="space-y-3">
          {announcements.length > 0 ? (
            announcements.map((note) => (
              <li
                key={note._id}
                className="bg-white p-4 rounded border shadow flex justify-between items-center"
              >
                <span>{note.title}</span>
                <span className="text-sm text-gray-500">{note.date?.split("T")[0]}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No announcements found.</p>
          )}
        </ul>
      </div>

      {/* Campaigns */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-orange-500">🔥 Live Donation Campaigns</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => {
              const percent = Math.min(100, (campaign.raisedAmount / campaign.goalAmount) * 100);
              return (
                <div key={campaign._id} className="bg-white p-5 rounded shadow border">
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                  <div className="mt-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 bg-green-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Raised ₹{campaign.raisedAmount} / Goal ₹{campaign.goalAmount}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 italic">No campaigns available.</p>
          )}
        </div>
      </div>

      {/* Volunteer Tasks */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-green-600">📋 Volunteer Tasks</h2>
        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task._id}
                className="bg-white p-4 rounded border shadow flex justify-between items-center"
              >
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">Deadline: {task.date?.split("T")[0]}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No tasks found.</p>
          )}
        </ul>
      </div>

      {/* Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📅 Upcoming Events</h2>
        <ul className="space-y-3">
          {calendarEvents.length > 0 ? (
            calendarEvents.map((event) => (
              <li
                key={event._id}
                className="bg-white p-4 rounded border shadow flex justify-between items-center"
              >
                <span>{event.title}</span>
                <span className="text-sm text-gray-500">Date: {event.date?.split("T")[0]}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No events scheduled.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OngoingTasks;
