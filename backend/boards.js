import axios from "axios";

const boards = axios.create({
  baseURL: "https://pinfinity.onrender.com/boards",
  // baseURL: "http://10.1.236.38:8000/pins",
});

export default boards;
