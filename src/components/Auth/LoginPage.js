import React, { useState } from "react";
import Parse from "parse";

Parse.initialize(
  process.env.REACT_APP_PARSE_APP_ID,
  process.env.REACT_APP_PARSE_JS_KEY
);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

async function loginUser(credentials) {
  try {
    const user = await Parse.User.logIn(
      credentials.email,
      credentials.password
    );
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    if (response.success) {
      console.log("Login successful");
      // Redirect to main page
      window.location.reload();
    } else {
      console.log("Login failed:", response.error);
      setError(response.error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
