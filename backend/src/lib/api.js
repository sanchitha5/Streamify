import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

export const updateProfile = async (data) => {
  const response = await API.put("/users/profile", data);
  return response.data;
};

