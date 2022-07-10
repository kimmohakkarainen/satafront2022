import React from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckRights = ({ tags, role }) => {
  let returned = false;

  const taskListRights = ["ROLE_ADMIN", "ROLE_DEVICETEST"];

  const deviceRights = ["ROLE_ADMIN", "ROLE_DEVICE"];

  const billingRights = ["ROLE_ADMIN"];

  const contentRights = ["ROLE_ADMIN", "ROLE_SECRETARY"];

  const enterviewRights = ["ROLE_ADMIN", "ROLE_SECRETARY"];

  if (role === "Device") {
    for (let i = 0; i < tags.length; i++) {
      if (deviceRights.includes(tags[i])) {
        returned = true;
        return (
          <>
            <LinkContainer to="/devices" exact>
              <Nav.Link id="menu-devices">Laitteet</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/testevent" exact>
              <Nav.Link id="menu-testevent">Tulokset</Nav.Link>
            </LinkContainer>
          </>
        );
      }
    }
  }

  if (role === "Task") {
    for (let i = 0; i < tags.length; i++) {
      if (taskListRights.includes(tags[i])) {
        returned = true;
        return (
          <LinkContainer to="/tasklist" exact>
            <Nav.Link id="menu-tasklist">Työlista</Nav.Link>
          </LinkContainer>
        );
      }
    }
  }

  if (role === "Billing") {
    for (let i = 0; i < tags.length; i++) {
      if (billingRights.includes(tags[i])) {
        returned = true;
        return (
          <LinkContainer to="/billing" exact>
            <Nav.Link id="menu-billing">Laskutus</Nav.Link>
          </LinkContainer>
        );
      }
    }
  }

  if (role === "Content") {
    for (let i = 0; i < tags.length; i++) {
      if (contentRights.includes(tags[i])) {
        returned = true;
        return (
          <LinkContainer to="/contentmarker" exact>
            <Nav.Link id="menu-contentmarker">Sisältömerkintä</Nav.Link>
          </LinkContainer>
        );
      }
    }
  }

  if (role === "Enterview") {
    for (let i = 0; i < tags.length; i++) {
      if (enterviewRights.includes(tags[i])) {
        returned = true;
        return (
          <>
            <LinkContainer to="/enterview" exact>
              <Nav.Link id="menu-enterview">Lausuttavat</Nav.Link>
            </LinkContainer>
          </>
        );
      }
    }
  }

  if (role === "Doctor") {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "ROLE_DOCTOR") {
        returned = true;
        return (
          <>
            <LinkContainer to="/doctor" exact>
              <Nav.Link id="menu-doctor">Omat lausuttavat</Nav.Link>
            </LinkContainer>
          </>
        );
      }
    }
  }

  if (role === "Admin") {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "ROLE_ADMIN") {
        returned = true;
        return (
          <>
            <LinkContainer to="/admin/examinations" exact>
              <Nav.Link id="menu-examinations">Tutkimukset</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/admin/rights" exact>
              <Nav.Link>Käyttöoikeudet</Nav.Link>
            </LinkContainer>
          </>
        );
      }
    }
  }

  if (returned) {
    return true;
  } else {
    return null;
  }
};

export default connect(null)(CheckRights);
