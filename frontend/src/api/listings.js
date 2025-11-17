import axios from "axios";
import { getToken } from "./auth";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5001/api") + "/listings";

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

export async function updateListing(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
}

export async function deleteListing(id) {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
}

export async function getListingById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
