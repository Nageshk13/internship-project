import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ role, onSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    availability: "",
  });

  const toggle = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { ...form, role };

    onSubmit(payload);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"} as {role}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Extra Volunteer Fields */}
        {!isLogin && role === "Volunteer" && (
          <>
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              onChange={handleChange}
              value={form.skills}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="availability"
              placeholder="Availability"
              onChange={handleChange}
              value={form.availability}
              className="w-full px-3 py-2 border rounded"
            />
          </>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {isLogin ? "Login" : "Register"}
        </button>

        {/* 🔗 Forgot Password Link */}
        {isLogin && (
          <p className="text-sm text-right text-blue-500">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p className="text-center text-sm cursor-pointer text-blue-500 mt-2" onClick={toggle}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
