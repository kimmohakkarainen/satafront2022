import { client } from "./client.js";

export const getForTestEventView = (deviceId, testId) => {
  const params = {activeDeviceId: deviceId, activeTestId: testId}
  return client.post("/rest/testevents", params)
}