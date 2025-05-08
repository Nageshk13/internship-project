import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, message } = formData;

      const res = await fetch("http://localhost:5000/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert(err.message || "Failed to send message.");
    }
  };

  return (
    <footer id="footer" className="bg-blue-600 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Contact Form */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Contact Us</h4>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Contact Info</h4>
          <p>Email: nageshk88611@gmail.com</p>
          <p>Phone: +91-8861167234</p>
          <div className="mt-2 space-x-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/volunteer" className="hover:underline">Volunteer</a></li>
            <li><a href="/donor" className="hover:underline">Donor</a></li>
            <li><a href="/admin" className="hover:underline">Admin</a></li>
            <li><a href="/tasks" className="hover:underline">Ongoing Tasks</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Legal</h4>
          <ul className="space-y-1">
            <li>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center mt-10 text-white/70 text-xs">
        © 2025 CharityOrg. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
