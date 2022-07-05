import axios from "axios";
import { client } from "./client.js";

export const postIncident = (params) => {
  params.eventType = "INCIDENT";
  return client.post("/rest/event", params);
};

export const postIncidentExisting = (params) => {
  params.eventType = "INCIDENT";
  return client.post("/rest/eventexisting", params);
}

export const getServiceEvents = () => {
  return client.get("/rest/events/SERVICE_EVENT");
};

export const postServiceEvent = (params) => {
  params.eventType = "SERVICE_EVENT";
  return client.post("/rest/event", params);
};

export const postServiceEventExisting = (params) => {
  params.eventType = "SERVICE_EVENT";
  return client.post("/rest/eventexisting", params);
};

export const getEventItemsByEventId = (id) => {
  return client.get("/rest/events/event/" + id);
}

export function getEventsExcel(id, deviceName) {

  const excelClient = axios.create({
    baseURL: client.baseURL,
    reponseType: "blob",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.ms-excel"
    }
  })

  return excelClient.post("/rest/events/xlsx/" + id, {}, { 
    responseType: 'arraybuffer' 
  });
};
