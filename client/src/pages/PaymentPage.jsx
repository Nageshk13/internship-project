import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const donation = location.state || {};

  const isDataComplete = donation.name && donation.email && donation.contact && donation.address && donation.amount;

  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/donor/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to send confirmation email");
      }

      alert(`🎉 Thank you, ${donation.name}! A confirmation email has been sent.`);
      navigate("/donor");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🧾 Draft Payment Page</h2>
      <div className="text-left space-y-2 mb-6">
        <p><strong>Name:</strong> {donation.name || "N/A"}</p>
        <p><strong>Email:</strong> {donation.email || "N/A"}</p>
        <p><strong>Contact:</strong> {donation.contact || "N/A"}</p>
        <p><strong>Address:</strong> {donation.address || "N/A"}</p>
        <p><strong>Amount:</strong> ₹{donation.amount || "0"}</p>
      </div>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        onClick={handleMakePayment}
        disabled={loading || !isDataComplete}
      >
        {loading ? "Processing..." : "Make Payment"}
      </button>
    </div>
  );
};

export default PaymentPage;
