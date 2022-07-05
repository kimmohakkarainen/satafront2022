import * as api from "../api";


export const postAttachments = (metadata) => {
  return {
    type: "ATTACHMENTS_PENDING_METADATA",
    payload: { attachmentsPending: metadata }
  };
}


export const postMetadata = (metadata) => {
  return (dispatch) => {
    api
      .postMetadata(metadata)
      .then((resp) => {
        dispatch(postMetadataSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(attachmentError(error));
      });
  };
}

export const deleteAttachment = (attachmentId) => {
  return (dispatch) => {
    api
      .deleteAttachment(attachmentId)
      .then((resp) => {
        dispatch(postMetadataSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(attachmentError(error));
      });
  };
}

export const getAttachments = () => {
  return (dispatch) => {
    api
      .getAttachments()
      .then((resp) => {
        dispatch(postMetadataSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(attachmentError(error));
      });
  };
}

export const postContent = (id, type, file) => {
  return (dispatch) => {
    const reader = new FileReader();
    reader.onload = event => {
      api
        .postContent(id, type, event.target.result)
        .then((resp) => {
          dispatch(postMetadataSucceeded(resp.data));
        });
    }
    reader.readAsArrayBuffer(file);
  };
}

export const postMetadataSucceeded = (data) => {
  return {
    type: "POST_METADATA_SUCCEEDED",
    payload: data
  };
}

export const attachmentError = (error) => {
  const errorcode = error.response == null ? 'Connection error' : error.response.status;
  return {
    type: "ERROR",
    payload: {
      error: errorcode
    }
  };
}

export const getAttachmentsByIncidentId = (id) => {
  return (dispatch) => {
    api
      .getAttachmentsByIncidentId(id)
      .then((resp) => {
        dispatch(getAttachmentsByIncidentIdSucceeded(resp.data))
      }).catch(error => {
        console.error(error)
      });
  }
}

export const getAttachmentsByIncidentIdSucceeded = (data) => {
  return {
    type: "GET_ATTACHMENTS_SUCCEEDED",
    payload: {
      attachments: data
    }
  }
}

export const downloadAttachment = (id, name) => {
  return (dispatch) => {
    dispatch(downloadInProgressSucceeded());
    api
      .downloadAttachment(id, name)
      .then(() => {
        dispatch(downloadAttachmentSucceeded())
      }).catch(error => {
        console.log(error)
        dispatch(downloadAttachmentSucceeded())
      });

  }
}

export const downloadInProgressSucceeded = () => {
  return {
    type: "DOWNLOAD_PROGRESS_STARTED",
    payload: {
      attachmentDownloading: true
    }
  }
}

export const downloadAttachmentSucceeded = (data) => {
  return {
    type: "DOWNLOAD_PROGRESS_FINISHED",
    payload: {
      attachmentDownloading: false
    }
  }
}