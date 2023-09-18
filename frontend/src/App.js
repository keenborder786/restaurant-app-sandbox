import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurants from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
export const UserContext = React.createContext(null);

function App() {
  const initialUserState = {
    name: "",
    id: "",
    logged_in:false
  };
  const [user, setUser] = React.useState(initialUserState);
  
  async function logout() {
    setUser(initialUserState)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/restaurants" className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            {user.logged_in ? (
              <a onClick={logout} href='/#' className="nav-link" style={{ cursor: 'pointer' }}>
                Logout {user.name}
              </a>
            ) : (
                <Link to="/login" className="nav-link">
                Login
              </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>
            <Route path="/restaurants" element={<RestaurantsList/>} />
            <Route path="/" element={<RestaurantsList/>} />
            <Route
              path="/restaurants/:id/review"
              element={
                <AddReview/>
              }
            />
            <Route
              path="/restaurants/:id"
              element={
                <Restaurants/>
              }
            />
            <Route
              path="/login"
              element={<Login/>}
            />
          </Routes>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;