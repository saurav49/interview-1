import axios from "axios";
import React, { useState } from "react";
import { USERS_URL } from "../urls";

const Login = () => {
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const userEmail = JSON.parse(localStorage.getItem("user__email"));
    if (!userEmail) {
      alert("Email not present");
      return;
    }
    try {
      const response = await axios.post(`${USERS_URL}/${userEmail}/login`);
      if (response.status === 200) {
        alert("Login successfull");
        localStorage.setItem("TOKEN__TYPE", response.token_type);
        localStorage.setItem("ACCESS__TOKEN", response.access_token);
        localStorage.setItem("EXPIRES__IN", response.expires_in);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export { Login };
