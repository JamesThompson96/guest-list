import { API } from "../api";

export async function fetchGuests() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchGuest(id) {
  try {
    const response = await fetch(API + id);
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
