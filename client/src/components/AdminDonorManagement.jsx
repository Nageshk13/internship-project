import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AdminDonorManagement = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/donations");
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        console.error("Failed to fetch donor data:", err);
      }
    };
    fetchDonors();
  }, []);

  const exportToExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(
      donors.map(d => ({
        Name: d.name,
        Email: d.email,
        Contact: d.contact,
        Amount: d.amount,
        Date: new Date(d.createdAt).toLocaleDateString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Donors");
    XLSX.writeFile(wb, "Donor_Data.xlsx");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Donor Table</h4>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Amount (₹)</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{donor.name}</td>
                <td className="p-2 border">{donor.email}</td>
                <td className="p-2 border">{donor.contact}</td>
                <td className="p-2 border">₹{donor.amount}</td>
                <td className="p-2 border">{new Date(donor.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donors.length === 0 && <p className="text-gray-500 mt-4 text-center">No donors yet.</p>}
      </div>
    </div>
  );
};

export default AdminDonorManagement;
