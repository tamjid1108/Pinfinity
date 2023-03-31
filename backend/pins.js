import axios from "axios";

const pins = axios.create({
  baseURL: "https://pinfinity.onrender.com/pins",
  // baseURL: "http://10.1.236.38:8000/pins",
});

export default pins;
