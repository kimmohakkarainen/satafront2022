import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { clearError } from "../actions";
import CheckRights from "./checkRights";

function Menu({ clearError, person, error }) {
  useEffect(() => {
    if (error != null) {
      setTimeout(() => {
        clearError();
      }, 2000);
    }
  }, error);

  const { fullname, tags } = person == null ? { tags: [] } : person;

  return (
    <>
      <Navbar collapseOnSelect bg="light" variant="light" expand="xl">
        <Navbar.Brand>
          <img src="/img/logo.png" width="89" height="45" alt="SataDiag-logo" />{" "}
          Tieto2
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-weight-bold">
            <CheckRights tags={tags} role="Device" />

            <CheckRights tags={tags} role="Task" />

            <CheckRights tags={tags} role="Enterview" />

            <CheckRights tags={tags} role="Billing" />

            <CheckRights tags={tags} role="Content" />

            <CheckRights tags={tags} role="Doctor" />

            <CheckRights tags={tags} role="Admin" />
          </Nav>
          <Nav id="loggedUsr">
            <NavDropdown align="end" title={fullname} id="user-dropdown">
              <LinkContainer to="/password">
                <NavDropdown.Item
                  eventKey={6}
                  id="menu-password"
                  eventKey={6.1}
                >
                  Vaihda salasana
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item divider />
              <LinkContainer to="/logout">
                <NavDropdown.Item eventKey={7} id="menu-logout" eventKey={6.4}>
                  Kirjaudu ulos
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {error != null && <Alert variant="danger">{error}</Alert>}
    </>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    error: state.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
