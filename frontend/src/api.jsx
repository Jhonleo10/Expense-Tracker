import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Example usage:
// API.post("/auth/login", { email, password });
// API.get("/user/profile");

export default API;
