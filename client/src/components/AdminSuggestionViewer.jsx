import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminSuggestionViewer = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await fetch("http://localhost:5000/api/suggestions"); // ✅ Correct path
      const data = await res.json();
      setSuggestions(data);
    };
    fetchSuggestions();
  }, []);

  const exportExcel = () => {
    const ws = utils.json_to_sheet(suggestions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Suggestions");
    writeFile(wb, "Volunteer_Suggestions.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Volunteer Suggestions", 14, 15);
    const tableData = suggestions.map((s, i) => [
      i + 1,
      s.name || "Anonymous",
      s.type,
      s.message,
    ]);
    doc.autoTable({
      head: [["#", "Name", "Type", "Message"]],
      body: tableData,
      startY: 20,
    });
    doc.save("Volunteer_Suggestions.pdf");
  };

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={exportExcel}
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export Excel
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export PDF
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <p className="text-gray-500 italic">No suggestions found.</p>
        ) : (
          suggestions.map((s, index) => (
            <div
              key={s._id}
              className="bg-gray-100 border p-4 rounded shadow-sm"
            >
              <p className="text-sm text-gray-700">
                <strong>{index + 1}. {s.name || "Anonymous"}</strong> — <em>{s.type}</em>
              </p>
              <p className="mt-2 text-gray-800">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSuggestionViewer;
