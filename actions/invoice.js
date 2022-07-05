import * as api from "../api";

export const fetchPreview = ({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) => {

  return (dispatch) => {
    api.getPreview(
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter).then(resp => {
        dispatch(fetchPreviewSucceeded(resp.data));
      }).catch(e => {
        console.log(e)
      })
  }
}

export const fetchPreviewSucceeded = (data) => {
  return {
    type: "FETCH_PREVIEW_SUCCEEDED",
    payload: data
  };
}

export const fetchExcel = ({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) => {
  return (dispatch) => {
    api.getExcel(
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter).then(resp => {
        dispatch(fetchPreviewSucceeded(resp.data));
      }).catch(e => {
        console.log(e)
      })
  };
}
