import { client } from "./client.js";

export function fetchState() {
	return client.get("/rest/state");
}

export function postDeleteTask(params) {
	return client.post("/rest/delete", params);
}

export function postCreateTask(params) {
	return client.post("/rest/create", params);
}

export function postModifyTask(params) {
	return client.post("/rest/update", params);
}

export function postAssignTask(params) {
	return client.post("/rest/assign", params);
}

export function postUnassignTask(params) {
	return client.post("/rest/unassign", params);
}

export function postFinishTask(params) {
	return client.post("/rest/finish", params);
}
