import React from "react";
import { Form } from "react-bootstrap";

export const initialState = () => {
  return {
    oldPassword: "",
    newPassword: "",
    newPasswordValid: null,
    newPasswordInvalid: null,
    newPassword2: "",
    newPassword2Valid: null,
    newPassword2Invalid: null
  };
}

export const reducer = (state, action) => {
  const newpass = action.payload;

  const valid =
    newpass.length > 7 &&
    /[A-Z]/.test(newpass) &&
    /[a-z]/.test(newpass) &&
    /[0-9]/.test(newpass);
  const invalid = !valid && newpass.length > 0;

  switch (action.type) {
    case "changeOldpassword":
      return {
        oldPassword: action.payload,
        newPassword: "",
        newPasswordValid: null,
        newPasswordInvalid: null,
        newPassword2: "",
        newPassword2Valid: null,
        newPassword2Invalid: null
      }
    case "changeNewPassword":
      return {
        ...state,
        newPassword: action.payload,
        newPasswordValid: valid,
        newPasswordInvalid: invalid,
      };
    case "changeNewPassword2":
      const valid2 = valid && newpass === state.newPassword;
      const invalid2 = newpass !== state.newPassword || invalid;
      return {
        ...state,
        newPassword2: action.payload,
        newPassword2Valid: valid2,
        newPassword2Invalid: invalid2
      };
    default:
      throw new Error();
  }
}

const PasswordForm = ({ person, persons, state, dispatch }) => {
  return (
    <Form>
       <Form.Group controlId="password1">
        <Form.Label>Koko nimi</Form.Label>
        <Form.Control type="text" readOnly defaultValue={person.fullname} />
      </Form.Group>
      <Form.Group controlId="currentPassword">
        <Form.Label>Nykyinen salasana</Form.Label>
        <Form.Control
          type="password"
          value={state.oldpassword}
          onChange={(e) =>
            dispatch({ type: "changeOldpassword", payload: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Annettu nykyinen salasana oli väärin
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="date">
        <Form.Label>Uusi salasana</Form.Label>
        <Form.Control
          type="password"
          value={state.newPassword}
          isValid={state.newPasswordValid}
          isInvalid={state.newPasswordInvalid}
          onChange={(e) =>
            dispatch({ type: "changeNewPassword", payload: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Salasanassa tulee olla vähintään kahdeksan merkkiä (isoja ja pieniä kirjaimia ja numeroita)
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password2">
        <Form.Label>Toista uusi salasana</Form.Label>
        <Form.Control
          type="password"
          value={state.newPassword2}
          isValid={state.newPassword2Valid}
          isInvalid={state.newPassword2Invalid}
          onChange={(e) =>
            dispatch({
              type: "changeNewPassword2",
              payload: e.target.value
            })
          }
        />
        <Form.Control.Feedback type="invalid">
          Salasanat eivät ole samoja
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default PasswordForm;