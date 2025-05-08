// src/components/AdminNotifications.jsx
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AdminNotifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/contact-messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };
    fetchMessages();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(messages);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ContactMessages");
    XLSX.writeFile(wb, "Contact_Messages.xlsx");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">Contact Submissions</h4>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          Export Excel
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto border rounded p-3 bg-white">
        {messages.length === 0 ? (
          <p className="text-gray-500 italic">No messages received.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Message</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id}>
                  <td className="p-2">{msg.name}</td>
                  <td className="p-2">{msg.email}</td>
                  <td className="p-2">{msg.message}</td>
                  <td className="p-2">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
