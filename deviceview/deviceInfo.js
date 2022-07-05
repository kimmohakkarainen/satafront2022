import React, { useState } from "react";
import { connect } from "react-redux";
import { modifyTest, deleteTest } from "../actions";

import { Badge, Table, Row, Button, Modal } from "react-bootstrap";
import moment from "moment"

import TestNew from "./testNew";
import EditDevice from "./editDevice"
import { EditTest } from "./editTest"
import IncidentModal from "../incidentview"
import DeleteTestModal from "./deleteTestModal";
import { setValueToString, reqValueToString, tagsToString } from "./deviceUtil";
import { DeviceSummary } from "./deviceSummary";

const DeviceInfo = ({ activeDevice, person, tags, modifyTest, deleteTest }) => {

  const [ testToBeDeleted, setTestToBeDeleted ] = useState(null);
  
  const handleDeleteTest = (test) => {
  	deleteTest(test);
  	setTestToBeDeleted(null);
  }
  
  
  return (
    <>
      {activeDevice !== null ? (
        <div
          style={{
            maxHeight: "70vh",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
        
        <Modal show={testToBeDeleted != null} onHide={() => setTestToBeDeleted(null)} backdrop="static">
      		<DeleteTestModal test={testToBeDeleted} dispatch={() => handleDeleteTest(testToBeDeleted)} />
  	    </Modal>
        
        <DeviceSummary person={person} device={activeDevice} />

          {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
            <TestNew />
          }

          <IncidentModal />

          {activeDevice.tests !== null && activeDevice.tests.length > 0 ? (
            <Table bordered hover>
              <thead>
                <tr key={0}>
                  {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
                    <th></th>
                  }
                  <th>Testin kuvaus</th>
                  <th>Suoritustiheysvaatimus</th>
                  <th>Suoritusväli</th>
                  <th>Testin tagit</th>
                </tr>
              </thead>
              <tbody id="table-device-tests">
                {activeDevice.tests.map((test, index) => {
                  return (
                    <tr key={test.testId}>
                      {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
                        <th><EditTest test={test} tags={tags} modifyTest={modifyTest} />
                        { test.deleteable && <Button variant="danger" onClick={ () => setTestToBeDeleted(test)} id={`test-delete-btn-${index}`} >Poista</Button> }
                        </th>
                      }
                      <td id="td-test-description">{test.description}</td>
                      <td id="td-reqvalue">{reqValueToString(test)}</td>
                      <td id="td-setvalue">{setValueToString(test)}</td>
                      <td id="td-tags">{tagsToString(test) }</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Row className="justify-content-sm-center">
              <div>
                <i>Laitteelle ei ole määritelty testejä</i>
              </div>
            </Row>
          )}
        </div>
      ) : (
        <Row className="justify-content-sm-center">
          <div>
            <i>Valitse laite vasemmalla olevasta valikosta</i>
          </div>
        </Row>
      )
      }
    </>
  );
};

const mapStateToProps = (state) => {
  if (state == null) {
    return { activeDevice: null };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyTest: (params) => dispatch(modifyTest(params)),
    deleteTest: (params) => dispatch(deleteTest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
