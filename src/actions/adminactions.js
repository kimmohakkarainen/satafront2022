import * as api from "../api";

export function postLogout() {
  return dispatch => {
    api.postLogout()
      .then(resp => {
        console.log("logout successfull");
        window.location.href = "/logout";
      })
      .catch(error => {
        console.log("logout error");
        window.location.href = "/logout";
      });
  };
}

export function fetchWhoAmI() {
  return (dispatch) => {
    api.getWhoAmI().then((resp) => {
      dispatch(fetchWhoAmiSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    });
  }
}

export function fetchWhoAmiSucceeded(data) {
  return {
    type: "FETCH_WHOAMI_SUCCEEDED",
    payload: {
      person: data
    }
  };
}

export function connectionError(error) {
  const errorcode = error.response == null ? 'Connection error' : error.response;

  if (error.response.status === 401) {
    return {
      type: "CONNECTION_ERROR",
      payload: {
        error: error.response.status + ": Incorrect password provided"
      }
    }
  } else {
    return {
      type: "CONNECTION_ERROR",
      payload: {
        error: error.response.status
      }
    }
  }
}

export function postPersons(person) {
  return (dispatch) => {
    api.postPersons(person).then((resp) => {
      dispatch(fetchPersonsSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    });
  };
}

export function fetchPersonsSucceeded(data) {
  return {
    type: "FETCH_PERSONS_SUCCEEDED",
    payload: {
      persons: data.persons,
      tags: data.tags,
    }
  };
}

export function postPassword(params) {
  return (dispatch) => {
    api.postPassword(params).then((resp) => {
      dispatch(fetchPersonsSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    });
  };
}


export function getExaminations() {
  return dispatch => {
    api.getExaminations().then(resp => {
      dispatch(fetchExaminationsSucceeded(resp.data));
    });
  };
}

export function modifyExamination(data) {
  return dispatch => {
    api.postExamination(data).then(resp => {
      dispatch(fetchExaminationsSucceeded(resp.data));
    }).catch(error => {
      console.error(error)
    });
  };
}

export function fetchExaminationsSucceeded(data) {
  return {
    type: "FETCH_EXAMINATIONS_SUCCEEDED",
    payload: {
      examinations: data
    }
  };
}


export function fetchContentmarkableTasks() {
  return dispatch => {
    api.getContentmarkableTasks().then(resp => {
      dispatch(fetchContentmarkableTasksSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    })
  };
}

export function addContentmarker(Person, Task) {
  return dispatch => {
    api.addContentmarker(Task.taskId).then(resp => {
      dispatch(fetchContentmarkableTasksSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    })
  };
}

export function fetchContentmarkableTasksSucceeded(data) {
  return {
    type: "FETCH_CONTENTMARKABLE_TASKS_SUCCEEDED",
    payload: {
      markableTasks: data
    }
  };
}

export function fetchAllContentmarkableTasks() {
  return dispatch => {
    api.getContentmarkableAll().then(resp => {
      dispatch(fetchAllContentmarkableSucceeded(resp.data));
    }).catch(error => {
      dispatch(connectionError(error));
    })
  };
}

export function fetchAllContentmarkableSucceeded(data) {
  return {
    type: "FETCH_ALL_CONTENTMARKABLE_SUCCEEDED",
    payload: {
      markableTasksAll: data
    }
  };
}

