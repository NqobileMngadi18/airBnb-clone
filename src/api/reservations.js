import axios from "axios";
import { getToken } from "./auth";

const API_URL = process.env.REACT_APP_API_URL + "/reservations";

export async function createReservation(data) {
  const response = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
}

export async function getReservations() {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
}
