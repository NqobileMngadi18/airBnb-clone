import axios from "axios";
import { getToken } from "./auth";

const API_URL = process.env.REACT_APP_API_URL + "/listings";

export async function getListings() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createListing(data) {
  const response = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
}
