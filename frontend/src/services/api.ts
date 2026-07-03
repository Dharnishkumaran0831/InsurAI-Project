// const BASE_URL = "http://localhost:8088";

// export const login = async (data) => {
//   const res = await fetch(`${BASE_URL}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/auth";

// export const login = async (email: string, password: string) => {
//   const response = await axios.post(`${API_BASE_URL}/login`, {
//     email,
//     password,
//   });
//   return response.data; // { token, email, role }
// };
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};

// export const register = async (
//   email: string,
//   password: string,
//   role: string
// ) => {
//   const res = await API.post("/register", { email, password, role });
//   return res.data;
// };
export const register = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await API.post("/register", data);
  return res.data;
};


export default API;


