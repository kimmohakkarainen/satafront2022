import * as api from "../api";

export const searchDevice = (deviceId, testId, searchParams) => {
  const params = {
    deviceId: deviceId,
    testId: testId,
    searchParams: searchParams
  };
  return (dispatch) => {
    api.searchDevice(params)
      .then((response) => {
        dispatch(searchDevicesSucceeded(response.data));
      })
      .catch((error) => {
        dispatch(deviceError(error));
      });
  }
}

export const postDevice = (Device, devices) => {
  return (dispatch) => {
    api
      .postDevice(Device)
      .then((resp) => {
        dispatch(searchDevicesSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(deviceError(error));
      });
  };
}

export const updateDevice = (Device) => {
  return (dispatch) => {
    api
      .updateDevice(Device)
      .then((resp) => {
        dispatch(searchDevicesSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(deviceError(error));
      });
  };
}

export const deleteDevice = (Device) => {
  return (dispatch) => {
    api
      .deleteDevice(Device)
      .then((resp) => {
        dispatch(searchDevicesSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(deviceError(error));
      });
  };
}



export const searchDevicesSucceeded = (data) => {
  return {
    type: "FETCH_DEVICES_SUCCEEDED",
    payload: {
      activeDevice: data.detailedDevice,
      activeTest: data.detailedTest,
      devices: data.deviceList,
      searchParams: data.searchParams,
      tags: data.tags
    }
  };
}

export const deviceError = (error) => {
  const errorcode = error.response == null ? 'Connection error' : error.response.status;
  return {
    type: "ERROR",
    payload: {
      error: errorcode
    }
  };
}


