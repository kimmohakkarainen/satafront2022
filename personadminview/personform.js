import React from "react";
import { Form } from "react-bootstrap";
import { Multiselect } from "react-widgets";

import "react-widgets/styles.css";

export function initialState(person, tags) {
  return {
    username: person == null ? null : person.username,
    usernameValid: null,
    usernameInvalid: null,
    email: person == null ? null : person.email,
    emailValid: null,
    emailInvalid: null,
    fullname: person == null ? null : person.fullname,
    fullnameValid: null,
    fullnameInvalid: null,
    allTags: tags,
    tags: person == null ? [] : person.tags
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "changeFullname":
      return {
        ...state,
        fullname: action.payload
      };
    case "changeUsername":
      return {
        ...state,
        username: action.payload
      };
    case "changeEmail":
      return {
        ...state,
        email: action.payload
      };
    case "changeTags":
      return {
        ...state,
        tags: action.payload
      };
    case "createTag":
      return {
        ...state,
        allTags: [...state.allTags, action.payload]
      };

    default:
      throw new Error();
  }
}

export default function PersonForm({ state, dispatch }) {
  return (
    <Form>
      <Form.Group controlId="fullname">
        <Form.Label>Nimi</Form.Label>
        <Form.Control
          type="text"
          value={state.fullname}
          isValid={state.fullnameValid}
          isInvalid={state.fullnameInvalid}
          onChange={(e) =>
            dispatch({ type: "changeFullname", payload: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Salasanan tulee olla vähintään 8 merkin pituinen ja sisältää isoja ja pieniä kirjaimia ja numeroita
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="username">
        <Form.Label>Käyttäjätunnus</Form.Label>
        <Form.Control
          type="text"
          value={state.username}
          isValid={state.usernameValid}
          isInvalid={state.usernameInvalid}
          onChange={(e) =>
            dispatch({ type: "changeUsername", payload: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Salasanan tulee olla vähintään 8 merkin pituinen ja sisältää isoja ja pieniä kirjaimia ja numeroita
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Sähköpostiosoite</Form.Label>
        <Form.Control
          type="text"
          value={state.email}
          isValid={state.emailValid}
          isInvalid={state.emailInvalid}
          onChange={(e) =>
            dispatch({ type: "changeEmail", payload: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Salasanan tulee olla vähintään 8 merkin pituinen ja sisältää isoja ja pieniä kirjaimia ja numeroita
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Tägit</Form.Label>
        <Multiselect
          data={state.allTags}
          value={state.tags}
          allowCreate={true}
          onCreate={(value) => dispatch({ type: "createTag", payload: value })}
          onChange={(value) => dispatch({ type: "changeTags", payload: value })}
        />
        <Form.Control.Feedback type="invalid">
          Salasanan tulee olla vähintään 8 merkin pituinen ja sisältää isoja ja pieniä kirjaimia ja numeroita
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
