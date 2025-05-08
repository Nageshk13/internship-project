import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Donor = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [donationDetails, setDonationDetails] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    amount: "",
  });

  // ✅ Auto-fill name and email from user
  useEffect(() => {
    if (user) {
      setDonationDetails((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (formData) => {
    try {
      const url = formData.name ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "Donor" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Something went wrong");

      login({ ...data.user, token: data.token });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDonationChange = (e) => {
    setDonationDetails({ ...donationDetails, [e.target.name]: e.target.value });
  };

  const handleSaveAndProceed = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/donor/save-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationDetails),
      });

      if (!res.ok) throw new Error("Failed to save donation details");

      alert("Donation details saved successfully!");
      navigate("/payment", { state: donationDetails });
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to proceed");
    }
  };

  if (!user || user.role !== "Donor") {
    return (
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome, Donor!</h2>
        <p className="mb-6 text-gray-600 max-w-xl mx-auto">
          Support lives with your contributions. Every bit of help matters.
        </p>
        <AuthForm role="Donor" onSubmit={handleSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
        Welcome, {user.name}!
      </h2>
      <p className="text-gray-600 text-center mb-10">
        Your generosity lights the way to a better future. Thank you for being the change! 🌟
      </p>

      <form onSubmit={handleSaveAndProceed} className="space-y-6">
        <input
          type="text"
          name="name"
          value={donationDetails.name}
          readOnly
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        <input
          type="email"
          name="email"
          value={donationDetails.email}
          readOnly
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        <input
          type="text"
          name="contact"
          value={donationDetails.contact}
          onChange={handleDonationChange}
          placeholder="Contact Number"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="address"
          value={donationDetails.address}
          onChange={handleDonationChange}
          placeholder="Address"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="number"
          name="amount"
          value={donationDetails.amount}
          onChange={handleDonationChange}
          placeholder="Donation Amount (₹)"
          className="w-full border rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
        >
          Save & Proceed
        </button>
      </form>
    </div>
  );
};

export default Donor;
