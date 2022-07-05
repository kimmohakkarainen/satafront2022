import axios from "axios";
import { client, API_BASE_URL } from "./client.js";

export function postMetadata(metadata) {
  return client.post("/rest/attachment/metadata", metadata);
}

export function deleteAttachment(attachmentId) {
  return client.delete("/rest/attachment/" + attachmentId);
}

export function getAttachments() {
  return client.get("/rest/attachments");
}

export function postContent(id, type, content) {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });
  return client.post("/rest/attachment/content/" + id, content);
}

export function getAttachmentsByIncidentId(id) {
  return client.get("/rest/attachments/" + id)
}

export function downloadAttachment(id, name) {
  const attachmentClient = axios.create({
    baseURL: client.baseURL,
    responseType: "blob"
  })

  attachmentClient
    .get("/rest/attachment/" + id + "/get")
    .then((response) => {
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", name)
      link.click()
      window.URL.revokeObjectURL(url)
    })

  return client.get("/rest/attachment/" + id + "/get")
}
