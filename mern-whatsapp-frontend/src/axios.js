import axios from "axios";
const instance = axios.create({
  baseUrl: "http://localhost.com:9000",
});
export default instance;
