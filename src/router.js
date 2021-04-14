import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth/AuthContext";
import { WorkoutProvider } from "./contexts/workout/WorkoutContext";
import DashboardLayout from "./layouts/DashboardLayout";
import SignInLayout from "./layouts/SignInLayout";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkoutProvider>
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
            <RouteWrapper
              path="/workout"
              privateRoute
              layout={DashboardLayout}
              page={Workout}
            />
            <RouteWrapper
              path="/profile"
              privateRoute
              layout={DashboardLayout}
              page={Profile}
            />
          </Switch>
        </WorkoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function RouteWrapper({ page: Page, layout: Layout, privateRoute, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        privateRoute && !user ? (
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
