import { client } from "./client.js";


export const postTest = (params) => {
  return client.post("/rest/test", params);
}

export const modifyTest = (params) => {
  return client.post("/rest/tests/" + params.testId, params)
}

export const deleteTest = (params) => {
  return client.post("/rest/tests/" + params.testId + "/delete", params)
}