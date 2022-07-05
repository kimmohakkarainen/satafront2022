import * as api from "../api";

export const postTest = (Test) => {
  return (dispatch) => {
    api
      .postTest(Test)
      .then((resp) => {
        dispatch(postTestSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(testError(error));
      });
  };
};


export const modifyTest = (Test) => {
  return (dispatch) => {
    api
      .modifyTest(Test)
      .then((resp) => {
        dispatch(postTestSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(testError(error));
      })
  }
}

export const deleteTest = (Test) => {
  return (dispatch) => {
    api
      .deleteTest(Test)
      .then((resp) => {
        dispatch(postTestSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(testError(error));
      })
  }
}

export const postTestSucceeded = (data) => {
  return {
    type: "POST_TEST_SUCCEEDED",
    payload: {
      activeDevice: data,
    }
  };
};

export const testError = (error) => {
  const errorcode = error.response == null ? 'Connection error' : error.response.status;
  return {
    type: "ERROR",
    payload: {
      error: errorcode
    }
  };
}

