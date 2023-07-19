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
import Report from "./components/src/Home/Report";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    document.addEventListener(
      "cookiechange",
      ({ detail: { oldValue, newValue } }) => {
        var token1 = Cookies.get("jwttoken");
        // console.log(
        //   `Cookie changed from "${oldValue}" to "${newValue}"`,
        //   "token", token
        // );
        setToken(token1);
      }
    );
  }, []);

  useEffect(() => {
    console.log("heloooooooo", token);
    if (token) {
      setIsLoggedIn(true);
    } else {
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
            path="/report"
            element={<ProtectedRoute element={<Report />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
