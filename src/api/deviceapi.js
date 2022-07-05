import { client } from "./client.js";


export const searchDevice = (params) => {
	return client.post("/rest/devices/search", params);
}

export const postDevice = (params) => {
  return client.post("/rest/devices", params);
};

export const updateDevice = (params) => {
  return client.post("/rest/devices/" + params.deviceId, params);
}

export const deleteDevice = (params) => {
  return client.post("/rest/devices/" + params.deviceId + "/delete", params);
}



