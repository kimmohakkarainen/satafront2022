import React, { useState } from "react";
import { Card, Form, Badge, Table, Row, Col, Button, Modal } from "react-bootstrap";
import EditDevice from "./editDevice"


export const DeviceSummary = ({person, device }) => {
	
	return (
		<Card style={{'marginBottom':'0.5rem'}}>
			<Card.Header className="font-weight-bold form-label">{device.name}</Card.Header>
			<Card.Body>
			<Row style={{'marginBottom':'0.5rem'}}>
				<Col md="2">Sarjanumero</Col>
				<Col md="3" className="font-weight-bold" >{device.serialNumber}</Col>
				<Col md="2">Käyttöönottovuosi</Col>
				<Col md="3" className="font-weight-bold">{device.yearOfCommission}</Col>
			</Row >

			<Row style={{'marginBottom':'0.5rem'}}>
				<Col md="2">Lisätiedot</Col>
				<Col md="10"><Form.Control as="textarea" rows={3} plaintext readOnly value={device.info} /></Col>
			</Row>

			<Row>
				<Col md="2">Tägit</Col>
				<Col md="8">{device.tags.map((tag) => {
					return (
						<Badge key={tag} variant="secondary">{tag}</Badge>
					)
				
				})}</Col>
			</Row>
				 {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
		 			<Row>
		 				<Col />
						<Col md="auto"><EditDevice /></Col>
					</Row>
                }
			</Card.Body>
		</Card>
	);
}

/*
          <Table bordered>
            <thead>
              <tr key={0}>
                {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
                  <th></th>
                }
                <th>Laitteen nimi</th>
                <th>Laitteen sarjanumero</th>
                <th>Laitteen käyttöönottovuosi</th>
                <th>Laitteen tägit</th>
              </tr>
            </thead>
            <tbody id="table-device-info">
              <tr key={activeDevice.deviceId}>
                {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
                  <th><EditDevice /></th>
                }
                <td>{activeDevice.name}</td>
                <td>{activeDevice.serialNumber}</td>
                <td>{activeDevice.yearOfCommission}</td>
                <td>{activeDevice.tags.map((tag) => {
                  return (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  )
                })}</td>
              </tr>
            </tbody>
          </Table>
*/