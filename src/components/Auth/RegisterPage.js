import React, { useState } from "react";
import Parse from "parse";
import bcrypt from "bcryptjs";


Parse.initialize(
  process.env.REACT_APP_PARSE_APP_ID,
  process.env.REACT_APP_PARSE_JS_KEY
);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

async function registerUser(credentials) {
  try {
    const user = new Parse.User();
    user.set("username", credentials.email);
    user.set("email", credentials.email);
    // const hashedPassword = await bcrypt.hash(credentials.password,salt);
    user.set("password", credentials.password);
    user.set("name", credentials.name);

    const result = await user.signUp();
    await Parse.User.logIn(
      credentials.email,
      credentials.password
    );

    console.log("User signed up:", result);
    return { success: true };
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, error: error.message };
  }
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser({
      name,
      email,
      password,
    });

    if (response.success) {
      console.log("Registration successful");
      // Redirect or show success message
      window.location.reload();
    } else {
      console.log("Registration failed:", response.error);
      setError(response.error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default RegisterPage;
