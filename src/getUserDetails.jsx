import { jwtDecode } from "jwt-decode";

export function getUsersActualName() {
  try {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const decoded = jwtDecode(idToken);
      console.log(decoded);
      return decoded.name || decoded["cognito: username"] || "User";
    }
  } catch (err) {
    console.error("Failed to decode token:", err);
    throw err;
  }
}

export function getUsername() {
  try {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const decoded = jwtDecode(idToken);
      return decoded.preferred_username

    }
  } catch (err) {
    console.error("Failed to decode token:", err);
    throw err;
  }
}