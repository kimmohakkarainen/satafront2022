import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { postLogout } from "../actions";

function LogoutView({ postLogout }) {
	
	useEffect(() => {
		postLogout({});
	}, [postLogout]);
	
	return ( <Spinner animation="border" /> );

}

function mapStateToProps(state) {
  return {  };
}

const mapDispatchToProps = (dispatch) => {
  return {
	  postLogout: () => dispatch(postLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);
