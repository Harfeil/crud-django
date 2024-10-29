import axios from "axios";

const baseURL = "http://tg808400ow0wgc4owsoo8gkc.66.42.59.139.sslip.io/";
const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
