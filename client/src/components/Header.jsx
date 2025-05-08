import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">CharityOrg</h1>
        <nav className="space-x-4 text-sm flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/volunteer" className="hover:underline">Volunteer</Link>
          <Link to="/donor" className="hover:underline">Donor</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <Link to="/tasks" className="hover:underline">Ongoing Tasks</Link>
          <a href="#footer" className="hover:underline">Contact</a>
          {user && (
            <button onClick={handleLogout} className="ml-4 bg-white text-blue-600 px-3 py-1 rounded text-xs hover:bg-gray-100">
              Logout ({user.role})
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
