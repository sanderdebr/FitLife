import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/auth/AuthContext";

function Profile() {
  const { user, updateEmail } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    name: user.displayName,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = values;
    if (!email) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      await updateEmail(email);
      setMessage("Succesfully updated");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="space-y-10">
        <div className="flex space-x-10 items-end">
          <h1 className="text-4xl">Profile</h1>
        </div>
        <main className="flex flex-col">
          <section className="bg-white text-primary p-10 rounded-xl space-y-4">
            <form className="w-full max-w-lg space-y-4">
              <Input
                name="email"
                type="email"
                label="Email"
                value={values.email}
                handleChange={handleChange}
              />
              <div className="text-primary font-semibold">
                {message && message}
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <Button
                value="Save"
                type="submit"
                action={handleSubmit}
                loading={loading}
                fullWidth
                variant="primary"
              />
            </form>
          </section>
        </main>
      </div>
    </>
  );
}

export default Profile;
