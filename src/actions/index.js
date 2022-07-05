import * as api from "../api";
export * from "./adminactions";
export * from "./deviceactions";
export * from "./testactions";
export * from "./taskactions";
export * from "./invoice";
export * from "./attachmentactions";
export * from "./testeventactions";
export * from "./eventactions";

export const fetchTests = () => {
  return (dispatch) => {
    api
      .getTests()
      .then((resp) => {
        dispatch(fetchTestsSucceeded(resp.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const fetchTestsSucceeded = (data) => {
  return {
    type: "FETCH_TESTS_SUCCEEDED",
    payload: {
      allTests: data
    }
  };
};



export const fetchTaskList = () => {
  return (dispatch) => {
    api
      .getTaskList()
      .then((resp) => {
        dispatch(fetchTaskListSucceeded(resp.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const fetchTaskListSucceeded = (data) => {
  return {
    type: "FETCH_TASKLIST_SUCCEEDED",
    payload: {
      tasklist: data
    }
  };
};

export const fetchTestTemplate = (id) => {
  return (dispatch) => {
    api
      .getTestTemplate(id)
      .then((resp) => {
        dispatch(fetchTestTemplateSucceeded(resp.data));
      })
      .catch((e) => {
        dispatch(fetchTestTemplateFailed(e));
      });
  };
};

export const fetchTestTemplateSucceeded = (data) => {
  return {
    type: "GET_TEST_TEMPLATE_SUCCEEDED",
    payload: {
      testTemplate: data
    }
  };
};

export const fetchTestTemplateFailed = (error) => {
  return {
    type: "GET_TEST_TEMPLATE_FAILED",
    payload: {
      error: error.response.status,
      testTemplate: []
    }
  }
}

export const postTestEvent = (TestEvent) => {
  return (dispatch) => {
    api
      .postTestEvent(TestEvent)
      .then((resp) => {
        dispatch(postTestEventSucceeded(resp.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const postTestEventSucceeded = (data) => {
  return {
    type: "POST_TEST_EVENT_SUCCEEDED",
    payload: {
      activeDevice: data.detailedDevice,
      activeTest: data.detailedTestId,
      devices: data.deviceList,
      events: data.events,
      testEvent: data.testEvents,
      testTemplate: data.testEventTemplate
    }
  };
};

export const updateTestEvent = (TestEvent) => {
  return (dispatch) => {
    api
      .updateTestEvent(TestEvent)
      .then((resp) => {
        dispatch(updateTestEventSucceeded(resp.data))
      })
      .catch((e) => {
        console.error(e);
      })
  }
}

export const updateTestEventSucceeded = (data) => {
  return {
    type: "UPDATE_TEST_EVENT_SUCCEEDED",
    payload: {
      activeDevice: data.detailedDevice,
      activeTest: data.detailedTestId,
      devices: data.deviceList,
      events: data.events,
      testEvent: data.testEvents,
      testTemplate: data.testEventTemplate
    }
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
    payload: {
      error: null
    }
  }
}



