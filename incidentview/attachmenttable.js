import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner, Button, Table } from "react-bootstrap";
import { postAttachments, deleteAttachment } from "../actions";

const RenderTable = ({ attachmentsPending, attachmentsReady, deleteAttachment }) => {
  if (attachmentsPending.length > 0) {
    return (
      <Spinner animation="border" />
    );
  } else if (attachmentsReady.length > 0) {
    return (
      <Table>
        {attachmentsReady.map(att => {
          return <tr><td>{att.name}</td><td><Button onClick={() => deleteAttachment(att.attachmentId)}>Poista</Button></td></tr>
        })}
      </Table>
    );
  } else {
    return "Raahaa liitetiedostot tähän";
  }
}

function AttachmentTable({ attachmentsPending, attachmentsReady, postAttachments, deleteAttachment }) {
  const onDragOver = (event) => {
    console.log('onDragOver');
    event.stopPropagation();
    event.preventDefault();
  }

  const onDragEnter = (event) => {
    console.log('onDragEnter');
    event.stopPropagation();
    event.preventDefault();
  }

  const onFileDrop = (event) => {
    console.log('onFileDrop');
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer.files;
    const metadata = [];
    metadata.push(...attachmentsPending);
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      metadata.push({
        name: file.name,
        type: file.type,
        size: file.size,
        modified: file.lastModified,
        file: file
      })
    }
    postAttachments(metadata);
  }

  return (
    <div className="filedrop" onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onFileDrop}>
      <RenderTable attachmentsPending={attachmentsPending} attachmentsReady={attachmentsReady} deleteAttachment={deleteAttachment} />
    </div>
  );

}

const mapStateToProps = (state) => {
  if (state == null) {
    return {};
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAttachments: (metadata) => dispatch(postAttachments(metadata)),
    deleteAttachment: (attachmentId) => dispatch(deleteAttachment(attachmentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentTable);
