import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import SignInLayout from "./layouts/SignInLayout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <RouteWrapper path="/sign-in" layout={SignInLayout} page={SignIn} />
          <RouteWrapper path="/sign-up" layout={SignInLayout} page={SignUp} />
          <RouteWrapper
            exact
            path="/"
            privateRoute
            layout={DashboardLayout}
            page={Dashboard}
          />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

function RouteWrapper({ page: Page, layout: Layout, privateRoute, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        privateRoute && !currentUser ? (
          <Redirect to="/sign-in" />
        ) : (
          <Layout {...props}>
            <Page {...props} />
          </Layout>
        )
      }
    />
  );
}

export default Router;
