import axios from "axios";
import { ApiService } from "./ApiService";
const axiosInstance = axios.create({
    baseURL: "https://api.appdevelopmentservices.in:3013", 
   
});
export const apiService = new ApiService(axiosInstance);
