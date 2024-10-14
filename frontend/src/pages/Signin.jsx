import { useState } from "react";
import { Button, Grid2, TextField } from "@mui/material";
import { baseUrl } from "../base/base";
import {useNavigate} from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      if (!response.ok) throw new Error("cannot sign in")

      const data = await response.json();
      localStorage.setItem('token', data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div>
      <Grid2 container spacing={2} direction="column">
        <Grid2 item>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item>
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item>
          <Button variant="outlined" onClick={handleSubmit}>Sign In</Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Signin;
