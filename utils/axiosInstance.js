import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://social-blog-backend-5u6i.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true, // IMPORTANT for cookies
});

export default axiosInstance;
