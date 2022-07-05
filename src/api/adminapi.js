import { client } from "./client.js";

export function postLogout() {
  return client.post("/logout");
}

export function postPersons(params) {
  return client.post("/rest/admin/person", params);
}

export function postPassword(params) {
  return client.post("/rest/admin/password", params);
}

export function getTags() {
  return client.get("/rest/tags");
}

export function getExaminations() {
  return client.get("/rest/admin/exam");
}

export function postExamination(params) {
  return client.post("/rest/admin/exam", params);
}

export function getContentmarkableTasks() {
	return client.get("/rest/content/unmark");
}

export function getContentmarkableAll() {
	return client.get("/rest/content/all");
}

export function addContentmarker(params) {
	return client.post("/rest/content", params);
}