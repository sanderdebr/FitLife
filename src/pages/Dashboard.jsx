import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const history = useHistory();

  const loading = null;

  return (
    <div className="space-y-10">
      <div className="flex space-x-10 items-end">
        <h1 className="text-4xl">Dashboard</h1>
        <Link to="/workout">
          <Button value="Start workout" type="text" />
        </Link>
      </div>
      <main className="grid grid-cols-3 gap-10">
        <section className="bg-primary text-white p-10 rounded-xl">
          Workout: 87
        </section>
        <section className="col-span-2 bg-white p-10 rounded-xl">Right</section>
      </main>
    </div>
  );
}

export default Dashboard;
