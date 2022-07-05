import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

export default function PersonTable({ persons, onEdit, onPassword }) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>Käyttäjätunnus</th>
          <th style={{ width: "20%" }}>Sähköposti</th>
          <th style={{ width: "20%" }}>Nimi</th>
          <th style={{ width: "40%" }}>Tägit</th>
          <th style={{ width: "auto" }} />
          <th style={{ width: "auto" }} />
        </tr>
      </thead>
      <tbody>
        {persons.map((user) => {
          return (
            <tr key={user.personId}>
              <td style={{ marginBottom: "0px" }}>{user.username}</td>
              <td style={{ marginBottom: "0px" }}>{user.email}</td>
              <td style={{ marginBottom: "0px" }}>{user.fullname}</td>
              <td style={{ marginBottom: "0px" }}>
                {user.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </td>
              <td>
                <Button onClick={() => onEdit(user)}>Muokkaa</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => onPassword(user)}>
                  Salasana
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
