import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { postPersons, postPassword } from "../actions";
import PersonTable from "./persontable";
import PasswordModal from "./passwordmodal";
import PersonModal from "./personmodal";

function PersonAdminView({ persons, tags, postPersons, postPassword }) {
  const [editPerson, setEditPerson] = useState();
  const [newPerson, setNewPerson] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    postPersons({});
  }, [postPersons]);

  function submitPassword(params) {
    setPassword(null);
    postPassword(params);
  }

  function submitPerson(params) {
    setNewPerson(null);
    setEditPerson(null);
    postPersons(params);
  }

  return (
    <>
      {password && (
        <PasswordModal
          person={password}
          onSubmit={submitPassword}
          onClose={() => setPassword(null)}
        />
      )}
      {editPerson && (
        <PersonModal
          person={editPerson}
          tags={tags}
          onSubmit={submitPerson}
          onClose={() => setEditPerson(null)}
        />
      )}
      {newPerson && (
        <PersonModal
          person={{}}
          tags={tags}
          onSubmit={submitPerson}
          onClose={() => setNewPerson(null)}
        />
      )}
      <Card variant="primary">
        <Card.Header>
          <Card.Title className="font-weight-bold">
            Käyttäjähallinta
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <PersonTable
            persons={persons}
            onEdit={(person) => setEditPerson(person)}
            onPassword={(person) => setPassword(person)}
          />
          <Button onClick={() => setNewPerson({})}>Lisää</Button>
        </Card.Body>
      </Card>
    </>
  );
}

function mapStateToProps(state) {
  return {
    persons: state.persons,
    tags: state.tags
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    postPersons: (person) => dispatch(postPersons(person)),
    postPassword: (password) => dispatch(postPassword(password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonAdminView);
