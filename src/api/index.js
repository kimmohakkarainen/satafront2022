import axios from "axios";
import { client } from "./client.js";
export * from "./adminapi.js";
export * from "./deviceapi.js";
export * from "./testapi.js";
export * from "./taskapi.js";
export * from "./invoice.js";
export * from "./attachmentapi.js";
export * from "./testeventviewapi.js";
export * from "./eventapi.js";

export const getWhoAmI = () => {
	return client.get("/rest/whoami");
};

export const getTests = () => {
  return client.get("/rest/tests");
};

export const getTaskList = () => {
  return client.get("/rest/tasklist");
};

export const getTestTemplate = (id) => {
  return client.get("/rest/testtemplate/" + id);
};

export const postTestEvent = (params) => {
  return client.post("/rest/testevent", params);
};

export const updateTestEvent = (params) => {
  return client.post("/rest/testevent/" + params.testId, params);
}


export function getTaskListExcel(devices) {

  const excelClient = axios.create({
    baseURL: client.baseURL,
    reponseType: "blob",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.ms-excel"
    }
  })

  excelClient.post("/rest/tasklist/xlsx", {
    devices
  }, { 
    responseType: 'arraybuffer' 
  }).then((response) => {
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url

    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let today = yyyy + "_" + mm + "_" + dd;

    link.setAttribute("download", "Työlista_" + today + ".xlsx")
    link.click()
    window.URL.revokeObjectURL(url)
  });
};
