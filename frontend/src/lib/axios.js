import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, // send cookies to the server
});

console.log("import.meta.mode =", import.meta.mode);

export default axiosInstance;
