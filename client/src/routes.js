import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";

const useRoutes = (isAuthenticated) => {
  // debugger;
  if (isAuthenticated) {
    // debugger;
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>

        <Route path="/create" exact>
          <CreatePage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    );
  }
  // debugger;
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
