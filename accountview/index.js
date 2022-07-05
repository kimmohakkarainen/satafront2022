import React, { useReducer } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import PasswordForm from "./passwordform";
import { postPassword } from "../actions"

export function initialState() {
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

function reducer(state, action) {
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
        newPasswordInvalid: invalid
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

const AccountView = ({ person, persons, postPassword, error }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function createMessage(person, state) {
    return {
      personId: person.personId,
      version: person.version,
      oldpassword: state.oldPassword,
      password1: state.newPassword
    };
  }

  function submitPassword(params) {
    postPassword(params);
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title className="font-weight-bold">
                Käyttäjätiedot
              </Card.Title>
            </Col>
          </Row>
        </Card.Header>
      </Card>

      {person &&
        <div className="p-3">
          <Row>
            <Col xs={12}>
              <h3>Vaihda salasana</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <PasswordForm person={person} persons={persons} state={state} dispatch={dispatch} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => submitPassword(createMessage(person, state))}
                variant="primary"
                disabled={
                  !state.newPasswordValid ||
                  !state.newPassword2Valid ||
                  state.currentPasswordInvalid
                }
              >
                Tallenna
              </Button>
            </Col>
          </Row>
        </div>
      }
    </>
  )
};

function mapStateToProps(state) {
  return {
    persons: state.persons,
    person: state.person,
    error: state.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    postPassword: (password) => dispatch(postPassword(password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);
