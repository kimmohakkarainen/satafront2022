import React from "react";
import { Badge } from "react-bootstrap";
import moment from "moment"

export function setValueToString(test) {

	const pvm = moment(test.setStart).format("DD.MM.YYYY");

	if(test.setUnit === "MONTHS") {
		return test.setValue + " kk (alkaen " + pvm + ")";
	} else if(test.setUnit === "WEEKS") {
		return test.setValue + " viikkoa (alkaen " + pvm + ")";
	} else {
		return test.setValue + " päivää (alkaen " + pvm + ")";
	}	
}

export function reqValueToString(test) {

	if(test.reqUnit === "MONTHS") {
		return test.reqValue + " kk";
	} else if(test.reqUnit === "WEEKS") {
		return test.reqValue + " viikkoa";
	} else {
		return test.reqValue + " päivää";
	}	
}

export function tagsToString(test) {
	if(test.tags.length == 0) {
		return <i>Ei tägeja</i>;
	} else {
		return test.tags.map(tag => { 
			return <Badge key={tag} variant="secondary">{tag}</Badge>;
		});
	}	
}
