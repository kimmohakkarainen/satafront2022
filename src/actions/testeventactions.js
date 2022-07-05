import * as api from "../api";

export const fetchForTestEventView = (deviceId, testId) => {
  return (dispatch) => {
    api
      .getForTestEventView(deviceId, testId)
      .then((resp) => {
        dispatch(fetchForTestEventViewSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(testEventError(error));
      });
  };
}

export const fetchForTestEventViewSucceeded = (data) => {
  return {
    type: "FETCH_FOR_TEST_EVENT_VIEW_SUCCEEDED",
    payload: {
      activeDevice: data.detailedDevice,
      activeTest: data.detailedTestId,
      devices: data.deviceList,
      events: data.events,
      testEvent: data.testEvents,
      testTemplate: data.testEventTemplate
    }
  };
}

const testEventError = (error) => {
  const errorcode = error.response == null ? 'Connection error' : error.response.status;
  return {
    type: "ERROR",
    payload: {
      error: errorcode
    }
  };
}
