import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const { login } = useAuth();

  const initialValues = { email: "", password: "" };

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = values;
      if (!email || !password) {
        throw Error("Please fill in all fields");
      }

      await login(email, password);
      alert("success");

      setValues(initialValues);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="lg:max-w-xl lg:p-0 lg:space-y-14 p-6 w-full bg-white space-y-6">
      <h1>Sign Up</h1>
      <form className="space-y-6">
        <Input
          name="email"
          type="email"
          label="Email address"
          value={values.email}
          handleChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
        {error && <div className="text-red-600">{error}</div>}
        <Button
          value="Sign Un"
          type="submit"
          action={handleSubmit}
          loading={loading}
        />
      </form>
      <Divider text="or" />
      <div className="text-primary text-center">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </div>
    </main>
  );
}

export default SignUp;
