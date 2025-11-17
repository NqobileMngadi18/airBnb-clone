import axios from "./axios";


// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
