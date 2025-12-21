// utils/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    // Skip ngrok browser warning page
    "ngrok-skip-browser-warning": "true",
  },
});
