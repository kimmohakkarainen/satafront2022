import * as api from "../api";

export const postIncident = (Incident, incidents) => {
  return (dispatch) => {
    api
      .postIncident(Incident)
      .then((resp) => {
        dispatch(postIncidentSucceeded(resp.data, incidents));
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
  };
};

export const postIncidentSucceeded = (data) => {
  return {
    type: "POST_INCIDENT_SUCCEEDED",
    payload: {
      events: data,
      attachmentsReady: []
    }
  };
};

export const postIncidentFromModal = (Incident, incidents) => {
  return (dispatch) => {
    api
      .postIncidentExisting(Incident)
      .then((resp) => {
        dispatch(postIncidentFromModalSucceeded(resp.data, incidents));
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
  };
}

export const postIncidentFromModalSucceeded = (data) => {
  return {
    type: "POST_INCIDENT_FROM_MODAL_SUCCEEDED",
    payload: {
      eventItem: data,
      attachmentsReady: []
    }
  };
};

export function postServiceEvent(serviceEvent) {
  return (dispatch) => {
    api
      .postServiceEvent(serviceEvent)
      .then((resp) => {
        dispatch(postServiceEventSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
  };
}

export const postServiceEventSucceeded = (data) => {
  return {
    type: "POST_SERVICE_EVENT_SUCCEEDED",
    payload: {
      events: data,
      attachmentsReady: []
    }
  };
};

export function postServiceEventFromModal(serviceEvent) {
  return (dispatch) => {
    api
      .postServiceEventExisting(serviceEvent)
      .then((resp) => {
        dispatch(postServiceEventFromModalSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
  };
}

export const postServiceEventFromModalSucceeded = (data) => {
  return {
    type: "POST_SERVICE_EVENT_FROM_MOIDAL_SUCCEEDED",
    payload: {
      eventItem: data,
      attachmentsReady: []
    }
  };
};

export const fetchServiceEvents = () => {
  return (dispatch) => {
    api
      .getServiceEvents()
      .then((resp) => {
        dispatch(fetchServiceEventsSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
  };
};

export const fetchEventsExcel = (id, deviceName) => {
  return dispatch => {
    api.getEventsExcel(id, deviceName)
    .then((response) => {
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

    	link.setAttribute("download", deviceName + "_" + today + ".xlsx")
    	link.click()
    	window.URL.revokeObjectURL(url)
  	}).catch((error) => {
        dispatch(eventError(error));
      });
  };
}

export const fetchEventItemsByEventId = (id) => {
  return (dispatch) => {
    api
      .getEventItemsByEventId(id)
      .then((resp) => {
        dispatch(fetchEventItemsByEventIdSucceeded(resp.data))
      })
      .catch((error) => {
        dispatch(eventError(error));
      });
      
  }
}

export const fetchEventItemsByEventIdSucceeded = (data) => {
  return {
    type: "FETCH_EVENT_ITEMS_BY_EVENT_ID_SUCCEEDED",
    payload: {
      eventItem: data
    }
  }
}

export const eventError = (error) => {
  const errorcode = error.response == null ? 'Connection error' : error.response.status;
  return {
    type: "ERROR",
    payload: {
      error: errorcode
    }
  };
}
