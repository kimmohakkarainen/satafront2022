import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getAttachments, postAttachments, postMetadata, postContent } from "../actions";

function categorizeEntries(list1, list2) {
	const found = []
	const notfound = []
	list1.map(l1 => {
		const entry = list2.find(l2 => (l1.name === l2.name && l1.size === l2.size && l1.modified === l2.modified));
		if(entry != null) {
			found.push(l1);
		} else {
			notfound.push(l1)
		}
	})
	return [found, notfound];
}


const AttachmentProcess = ({
	attachmentsPending, 
	attachmentsWaitingContent, 
	attachmentsReady,
	getAttachments, 
	postAttachments,
	postMetadata, 
	postContent
}) => {

	useEffect(() => {
		getAttachments();
	}, [getAttachments]);

	
	useEffect(() => {
		const [readyAttachment, justAttachments] = categorizeEntries(attachmentsPending, attachmentsReady);
		const [common, waitingMetadata] = categorizeEntries(attachmentsPending, attachmentsWaitingContent);

		/* find attachmentsReady that is still in attachment list */
		if(readyAttachment.length > 0) {

			/* if found => remove it */
			postAttachments(justAttachments);

			/* else */
			/* find attachmentsWaitingContent not in attachmentsReady */

		} else if(attachmentsWaitingContent.length >0 ) {

			/* if found => send content */
			const w = attachmentsWaitingContent[0];
			const att = attachmentsPending.find(att => (w.name === att.name && w.size === att.size && w.modified === att.modified));
			if(att != null) {
				postContent(w.attachmentId, w.type, att.file);
			}

			/* else */	
			/* find attachment that is not yet in Waiting Content */
		} else if(waitingMetadata.length > 0 ) {
			/* if found => send metadata */
			postMetadata(waitingMetadata);
		}

	}, [attachmentsPending, attachmentsWaitingContent, attachmentsReady]);


	return null;
};

const mapStateToProps = (state) => {
	if (state == null || state.devices == null) {
		return { devices: [] };
	} else {
		return state;
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAttachments: () => dispatch(getAttachments()),
		postAttachments: (metadata) => dispatch(postAttachments(metadata)),
		postMetadata: (metadata) => dispatch(postMetadata(metadata)),
		postContent: (id, type, content) => dispatch(postContent(id, type, content))

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentProcess);
