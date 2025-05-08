import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Volunteer from "./pages/Volunteer";
import Donor from "./pages/Donor";
import Admin from "./pages/Admin";
import OngoingTasks from "./pages/OngoingTasks";

// ✅ Import password reset pages
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ✅ NEW: Import Payment Page
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donor" element={<Donor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/tasks" element={<OngoingTasks />} />

            {/* ✅ New Password Reset Routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* ✅ NEW Payment Route */}
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
