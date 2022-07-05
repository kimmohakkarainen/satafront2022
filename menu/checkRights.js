import React from "react"
import { connect } from "react-redux"
import { Nav } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const CheckRights = ({ tags, role }) => {
  let returned = false

  const taskListRights = [
    "ROLE_ADMIN",
    "ROLE_DEVICETEST"
  ]

  const deviceRights = [
    "ROLE_ADMIN",
    "ROLE_DEVICE"
  ]

  const billingRights = [
    "ROLE_ADMIN"
  ]

  const contentRights = [
    "ROLE_ADMIN",
    "ROLE_SECRETARY"
  ]

  const enterviewRights = [
    "ROLE_ADMIN",
    "ROLE_SECRETARY"
  ]

  if (role === "Device") {
    for (let i = 0; i < tags.length; i++) {
      if (deviceRights.includes(tags[i])) {
        returned = true
        return (
          <>
            <IndexLinkContainer to="/devices">
              <Nav.Link id="menu-devices">Laitteet</Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/testevent">
              <Nav.Link id="menu-testevent">Tulokset</Nav.Link>
            </IndexLinkContainer>
          </>
        )
      }
    }
  }

  if (role === "Task") {
    for (let i = 0; i < tags.length; i++) {
      if (taskListRights.includes(tags[i])) {
        returned = true
        return (
          <IndexLinkContainer to="/tasklist">
            <Nav.Link id="menu-tasklist">Työlista</Nav.Link>
          </IndexLinkContainer>
        )
      }
    }
  }

  if (role === "Billing") {
    for (let i = 0; i < tags.length; i++) {
      if (billingRights.includes(tags[i])) {
        returned = true
        return (
          <IndexLinkContainer to="/billing">
            <Nav.Link id="menu-billing">Laskutus</Nav.Link>
          </IndexLinkContainer>
        )
      }
    }
  }

  if (role === "Content") {
    for (let i = 0; i < tags.length; i++) {
      if (contentRights.includes(tags[i])) {
        returned = true
        return (
          <IndexLinkContainer to="/contentmarker">
            <Nav.Link id="menu-contentmarker">Sisältömerkintä</Nav.Link>
          </IndexLinkContainer>
        )
      }
    }
  }

  if (role === "Enterview") {
    for (let i = 0; i < tags.length; i++) {
      if (enterviewRights.includes(tags[i])) {
        returned = true
        return (
          <>
            <IndexLinkContainer to="/enterview">
              <Nav.Link id="menu-enterview">Lausuttavat</Nav.Link>
            </IndexLinkContainer>
          </>
        )
      }
    }
  }

  if (role === "Doctor") {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "ROLE_DOCTOR") {
        returned = true
        return (
          <>
            <IndexLinkContainer to="/doctor">
              <Nav.Link id="menu-doctor">Omat lausuttavat</Nav.Link>
            </IndexLinkContainer>
          </>
        )
      }
    }
  }

  if (role === "Admin") {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "ROLE_ADMIN") {
        returned = true
        return (
          <>
            <IndexLinkContainer to="/admin/examinations">
              <Nav.Link id="menu-examinations">Tutkimukset</Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/admin/rights">
              <Nav.Link>Käyttöoikeudet</Nav.Link>
            </IndexLinkContainer>
          </>
        )
      }
    }
  }

  if (returned) {
    return true
  } else {
    return null
  }

}

export default connect(null)(CheckRights);