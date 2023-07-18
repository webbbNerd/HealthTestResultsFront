import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import LoginPage from "./components/src/Auth";
import HomePage from "./components/src/Home";
import Form from "./components/src/Home/Form";
const token = Cookies.get("jwttoken");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    console.log(token, isLoggedIn);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Wrapper component for protected routes
  function ProtectedRoute({ path, element }) {
    return !isLoggedIn ? element : <Navigate to="/login" />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<HomePage />} />}
          />
          <Route
            path="/form"
            element={<ProtectedRoute element={<Form />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
