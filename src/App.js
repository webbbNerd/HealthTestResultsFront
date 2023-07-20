import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./components/src/Auth";
import HomePage from "./components/src/Home";
import Form from "./components/src/Home/Form";
import Report from "./components/src/Home/Report";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(Cookies.get("jwttoken"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get("jwttoken");
      if (newToken !== token) {
        setToken(newToken);
        // dispatch({ type: "setToken", payload: newToken });
      }
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem('jwttoken', token);
    } else {
      localStorage.removeItem('jwttoken');
      setIsLoggedIn(false);
    }
  }, [token]);

  // Wrapper component for protected routes
  function ProtectedRoute({ path, element }) {
    return isLoggedIn ? element : <Navigate to="/login" />;
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
          <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
          <Route
            path="/report/:id"
            element={<ProtectedRoute element={<Report />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
