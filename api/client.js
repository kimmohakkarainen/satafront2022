import axios from "axios";

export const API_BASE_URL = "";

export const client = axios.create({
  baseURL: API_BASE_URL,
  maxRedirects:0,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
 * Check each response whether content-type is not JSON. This indicates that
 * session has timed out
 */
client.interceptors.response.use(function(response) {
  const type = response.headers["content-type"];
  const notValid = /text\/html/.test(type);

  if(notValid) {
    window.location.href = "/logout";
  } else {
    return response;
  }
});
