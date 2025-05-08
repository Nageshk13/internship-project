import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import AdminEventManager from "../components/AdminEventManager";
import AdminSuggestionViewer from "../components/AdminSuggestionViewer";
import AdminVolunteerTasks from "../components/AdminVolunteerTasks";
import AdminDonorManagement from "../components/AdminDonorManagement";
import AdminAuditLogs from "../components/AdminAuditLogs";
import AdminNotifications from "../components/AdminNotifications";

import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Admin = () => {
  const { user, login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [monthlyIncome, setMonthlyIncome] = useState(Array(12).fill(0));
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  const handleSubmit = async (formData) => {
    try {
      const url = formData.name ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "Admin" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Something went wrong");
      login({ ...data.user, token: data.token });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/overview-data");
        const data = await res.json();
        setMonthlyIncome(data.monthlyIncome || Array(12).fill(0));
        setOngoingEvents(data.ongoingEvents || []);
        setCompletedEvents(data.completedEvents || []);
      } catch (err) {
        console.error("Error loading overview data:", err);
      }
    };
    fetchOverview();
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Monthly Donation (₹)",
      data: monthlyIncome,
      backgroundColor: "#3b82f6",
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
        },
      },
    },
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(completedEvents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CompletedEvents");
    XLSX.writeFile(wb, "Completed_Events.xlsx");
  };

  if (!user || user.role !== "Admin") {
    return (
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome, Admin!</h2>
        <p className="mb-6 text-gray-600 max-w-xl mx-auto">
          Manage the platform, volunteers, donors, and drive the mission forward.
        </p>
        <AuthForm role="Admin" onSubmit={handleSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Admin Dashboard</h2>

      {/* Tabs */}
      <div className="flex gap-4 flex-wrap mb-6">
        {[
          { id: "dashboard", label: "Overview" },
          { id: "events", label: "Manage Events" },
          { id: "donors", label: "Donor Management" },
          { id: "volunteers", label: "Volunteer Management" },
          { id: "suggestions", label: "View Suggestions" },
          { id: "notifications", label: "Notifications" },
          { id: "logs", label: "Audit Logs" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
        {activeTab === "dashboard" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📊 Overview</h3>

            {/* Compact Chart Container */}
            <div className="mb-8 max-w-2xl mx-auto h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Ongoing Events</h4>
                <div className="max-h-64 overflow-y-auto border rounded p-3 bg-gray-50">
                  {ongoingEvents.length === 0 ? (
                    <p className="text-gray-500 italic">No ongoing events.</p>
                  ) : (
                    <ul className="space-y-2">
                      {ongoingEvents.map((event) => (
                        <li key={event._id} className="text-sm">
                          <strong>{event.title}</strong> –{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">Completed Tasks</h4>
                  <button
                    onClick={exportToExcel}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Export Excel
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto border rounded p-3 bg-gray-50">
                  {completedEvents.length === 0 ? (
                    <p className="text-gray-500 italic">No completed tasks.</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {completedEvents.map((task) => (
                        <li key={task._id}>
                          <strong>{task.title || task.description || "Task"}</strong> –{" "}
                          {new Date(task.createdAt).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📝 Manage Events</h3>
            <AdminEventManager />
          </div>
        )}

        {activeTab === "donors" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">👥 Donor Management</h3>
            <AdminDonorManagement />
          </div>
        )}

        {activeTab === "volunteers" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">🛠️ Volunteer Management</h3>
            <AdminVolunteerTasks />
          </div>
        )}

        {activeTab === "suggestions" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📮 Volunteer Suggestions</h3>
            <AdminSuggestionViewer />
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📢 Notifications</h3>
            <AdminNotifications />
          </div>
        )}

        {activeTab === "logs" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📘 Audit Logs</h3>
            <AdminAuditLogs />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
