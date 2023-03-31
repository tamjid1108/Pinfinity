import axios from "axios";

const profile = axios.create({
  baseURL: "https://pinfinity.onrender.com/user",
  // baseURL: "http://10.1.236.38:8000/user",
});

export default profile;
