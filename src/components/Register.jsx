import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {TextField, Button, Container, Typography, Box, Paper, Alert,
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userData = {
      name,
      email,
      password,
    };

    try {
      await axios.post(
        "https://connections-api.goit.global/users/signup",
        userData,
      );
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.code === 11000) {
          setError(
            "This email is already registered. Please use a different email.",
          );
        } else {
          setError(error.response.data.message);
        }
        console.error("Error response data:", error.response.data);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;