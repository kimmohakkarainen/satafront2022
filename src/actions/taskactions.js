import * as api from "../api";

export function fetchState() {
	return (dispatch) => {
		api
		.fetchState()
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(openErrorModal("Yhteysongelma"));
		});
	};
}

export function postCreate({ Task }) {
	const params = Object.assign({}, Task );
	return (dispatch) => {
		api
		.postCreateTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(
					openErrorModal("Lausuttavan kirjaaminen kantaan ei onnistunut!")
			);
		});
	};
}

export function postDelete({ Task }) {
	const params = Object.assign({}, Task);
	return (dispatch) => {
		api
		.postDeleteTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(openErrorModal("Lausuttavan poistaminen ei onnistunut!"));
		});
	};
}

export function postModify({ Person, Task }) {
	const params = Object.assign({}, Task, { personId: Person.personId });
	return (dispatch) => {
		api
		.postModifyTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(openErrorModal("Muokkaus ei onnistunut!"));
		});
	};
}

export function postAssign({ Person, Task }) {
	const params = Object.assign({}, Task, { personId: Person.personId });
	return (dispatch) => {
		api
		.postAssignTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(openErrorModal("Lausuttava on jo varattu!"));
		});
	};
}

export function postUnassign({ Person, Task }) {
	const params = Object.assign({}, Task, { personId: Person.personId });
	return (dispatch) => {
		api
		.postUnassignTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(openErrorModal("Lausuttavaa ei voinut enää vapauttaa"));
		});
	};
}

export function postFinish({ Person, Task }) {
	const params = Object.assign({}, Task, { personId: Person.personId });
	return (dispatch) => {
		api
		.postFinishTask(params)
		.then((resp) => {
			dispatch(fetchStateSucceeded(resp.data));
		})
		.catch((error) => {
			dispatch(
					openErrorModal("Lausuttavaa ei voinut enää merkitä valmistuneeksi")
			);
		});
	};
}


export function fetchStateSucceeded(data) {
	const payload = Object.assign({}, { errorModal: null }, data);
	
	return {
		type: "FETCH_STATE_SUCCEEDED",
		payload: payload
	};
}

export function openErrorModal(error) {
	return {
		type: "OPEN_ERROR_MODAL",
		payload: {
			errorModal: error
		}
	};
}

export const fetchTaskListExcel = ({
	devices
}) => {
	return dispatch => {
		api
			.getTaskListExcel(
				devices
			);
	};
}
