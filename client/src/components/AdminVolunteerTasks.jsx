import { useEffect, useState } from "react";

const AdminVolunteerTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/volunteer-tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Assigned Volunteer Tasks</h4>
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Volunteer</th>
                <th className="px-4 py-2 text-left">Task Title</th>
                <th className="px-4 py-2 text-left">Progress</th>
                <th className="px-4 py-2 text-left">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task._id} className="border-t">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{task.volunteerName}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.progress || "Not started"}</td>
                  <td className="px-4 py-2">{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminVolunteerTasks;
