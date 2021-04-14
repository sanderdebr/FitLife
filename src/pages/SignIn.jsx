import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Input from "../components/Input";
import { useAuth } from "../contexts/auth/AuthContext";

function SignIn() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const history = useHistory();

  const initialValues = { email: "", password: "" };

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      await signIn(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setGoogleLoading(false);
  };

  const handlePassword = async () => {
    setMessage(null);
    setError(null);

    const { email } = values;

    if (!email) {
      return setError("Please enter an email first");
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setMessage("Successfully sent email reset link");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <main className="lg:max-w-xl lg:p-0 lg:space-y-14 p-6 w-full bg-white space-y-6">
      <h1 className="text-5xl">Sign In</h1>
      <form className="space-y-6">
        <Input
          name="email"
          type="email"
          placeholder="Enter email address.."
          label="Email address"
          value={values.email}
          handleChange={handleChange}
        />
        <div className="space-y-3">
          <Input
            name="password"
            type="password"
            placeholder="Enter password.."
            label="Password"
            value={values.password}
            handleChange={handleChange}
          />
          <div
            onClick={handlePassword}
            className="flex justify-end text-sm text-primary cursor-pointer"
          >
            Forgot password?
          </div>
        </div>
        {message && <div className="text-primary font-semibold">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <Button
          value="Sign In"
          type="submit"
          variant="primary"
          action={handleSubmit}
          loading={loading}
          fullWidth
        />
      </form>
      <Divider text="or" />
      <Button
        value="Continue with Google"
        type="submit"
        variant="frame"
        action={handleGoogleSignIn}
        loading={googleLoading}
        fullWidth
      />
      <div className="text-primary text-center">
        Want to become a member? <Link to="/sign-up">Sign Up</Link>
      </div>
    </main>
  );
}

export default SignIn;
