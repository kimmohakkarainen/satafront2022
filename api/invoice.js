import axios from "axios";
import { client } from "./client.js";

export const getPreview = (
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
) => {
  return client.post("/rest/invoice", {
    beginDate,
    endDate,
    doctorFilter,
    examinationFilter
  });
}

export const getExcel = (
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
) => {
  const excelClient = axios.create({
    baseURL: client.baseURL,
    reponseType: "blob",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.ms-excel"
    }
  })

  return excelClient.post("/rest/invoice/xlsx", {
    beginDate,
    endDate,
    doctorFilter,
    examinationFilter
  }, {
    responseType: 'arraybuffer'
  }).then((response) => {
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "invoice.xlsx")
    link.click()
    window.URL.revokeObjectURL(url)

    return client.post("/rest/invoice", {
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter
    });
  });
}