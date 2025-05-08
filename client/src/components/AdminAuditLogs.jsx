import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [balance, setBalance] = useState(0);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/audit-logs");
      const data = await res.json();
      setLogs(data.logs);
      setBalance(data.balance);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAddExpense = async () => {
    if (!amount || !reason) {
      return alert("Please enter amount and reason.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/audit-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount), reason }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      alert("Expense recorded.");
      setAmount("");
      setReason("");
      fetchLogs();
    } catch (err) {
      alert(err.message || "Failed to log expense");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      logs.map((log) => ({
        Type: log.type,
        Amount: log.amount,
        Reason: log.reason || "-",
        Date: new Date(log.createdAt).toLocaleDateString(),
        Balance: log.balance,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AuditLogs");
    XLSX.writeFile(wb, "Audit_Logs.xlsx");
  };

  return (
    <div>
      <h4 className="text-xl font-bold text-green-700 mb-4">
        💰 Total Balance: ₹{balance.toLocaleString()}
      </h4>

      <div className="bg-gray-100 rounded p-4 mb-6">
        <h5 className="font-semibold mb-2">Add Expense</h5>
        <div className="flex gap-4 flex-wrap">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="border px-3 py-2 rounded w-1/3"
          />
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            className="border px-3 py-2 rounded w-2/3"
          />
          <button
            onClick={handleAddExpense}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold">Audit Logs</h5>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          Export Excel
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto border rounded p-3 bg-white">
        {logs.length === 0 ? (
          <p className="text-gray-500 italic">No logs available.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Reason</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td className="p-2">{log.type}</td>
                  <td className="p-2">₹{log.amount}</td>
                  <td className="p-2">{log.reason || "-"}</td>
                  <td className="p-2">{new Date(log.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">₹{log.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAuditLogs;
