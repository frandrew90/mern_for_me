import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./routes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import "materialize-css";

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  console.log("====================================");
  console.log(isAuthenticated);
  console.log("====================================");
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <BrowserRouter>
        <>
          {isAuthenticated && <NavBar />}
          <div className="container">
            {/* <h1>hello</h1> */}
            {routes}
          </div>
        </>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
