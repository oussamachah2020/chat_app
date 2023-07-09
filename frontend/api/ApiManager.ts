import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.151.222:5000/api",
  headers: { "Content-Type": "application/json" },
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
