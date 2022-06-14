import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import routes from "./routes";

function App() {
  const useRoutes = routes(false);
  return (
    <BrowserRouter>
      <>
        <div className="container">
          <h1>hello</h1>
          {useRoutes}
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
