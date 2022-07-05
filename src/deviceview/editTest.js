import React, { useState } from "react"

import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  InputGroup,
  Row,
  Table
} from "react-bootstrap"
import { Multiselect } from "react-widgets";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import moment from "moment"

export const EditTest = ({ test, tags, modifyTest }) => {
  const [show, setShow] = useState(false);
  const [selectedTags, setSelectedTags] = useState(test.tags)
  const [selectedDescription, setSelectedDescription] = useState(test.description)
  const [selectedReqValue, setSelectedReqValue] = useState(test.reqValue)
  const [selectedReqUnit, setSelectedReqUnit] = useState(test.reqUnit)
  const [selectedSetValue, setSelectedSetValue] = useState(test.setValue)
  const [selectedSetUnit, setSelectedSetUnit] = useState(test.setUnit)
  const [booleanValue, setBooleanValue] = useState(false)
  const [editMeasurements, setEditMeasurements] = useState(false)
  const [tableMeasures, setTableMeasures] = useState(test.measurements)
  const [comment, setComment] = useState("")
  const [date, setDate] = useState(new Date(test.setStart))
  const [tKey, setTKey] = useState(1)
  const [firstValidated, setFirstValidated] = useState(false)
  const [secondValidated, setSecondValidated] = useState(false)
  const [tempForm, setTempForm] = useState(
    {
      key: tableMeasures.length,
      description: "",
      acceptanceLimitLow: "",
      acceptanceLimitHigh: "",
      setLimitLow: "",
      setLimitHigh: "",
      unit: ""
    }
  )

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTagCreate = (newTag) => {
    const newSelected = [...selectedTags, newTag.toUpperCase()]
    setSelectedTags(newSelected)
  }

  const handleUpdate = (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let editedTest = test
      editedTest.tags = selectedTags
      editedTest.description = selectedDescription
      editedTest.reqValue = selectedReqValue
      editedTest.reqUnit = selectedReqUnit
      editedTest.setValue = selectedSetValue
      editedTest.setUnit = selectedSetUnit
      editedTest.measurements = tableMeasures
      editedTest.comment = comment

      if (date === null || date === "") {
        setDate(new Date(test.setStart))
        editedTest.setStart = moment(test.setStart).format('YYYY-MM-DD')
      } else {
        editedTest.setStart = moment(date).format('YYYY-MM-DD')
      }
      modifyTest(editedTest)
      handleClose()
      setSelectedTags(test.tags)
      setFirstValidated(false)
      return
    }

    setFirstValidated(true)
  }

  const formatReq = (reqValue, reqUnit) => {
    if (selectedSetUnit === reqUnit) {
      return reqValue
    } else {
      if (selectedSetUnit === "DAYS") {
        if (reqUnit === "WEEKS") {
          return (reqValue * 7)
        } else if (reqUnit === "MONTHS") {
          return (reqValue * 30)
        }
      } else if (selectedSetUnit === "WEEKS") {
        if (reqUnit === "DAYS") {
          return (reqValue / 7)
        } else if (reqUnit === "MONTHS") {
          return (reqValue * 4)
        }
      } else if (selectedSetUnit === "MONTHS") {
        if (reqUnit === "DAYS") {
          return (reqValue / 30)
        } else if (reqUnit === "WEEKS") {
          return (reqValue * 4)
        }
      }
    }
  }

  const handleBooleanValue = (value) => {
    if (value === "Päällä") {
      setBooleanValue(true)
      let tempData = tempForm
      tempData.unit = "totuusarvo"
      tempData.acceptanceLimitLow = 0
      tempData.acceptanceLimitHigh = 1
      tempData.setLimitLow = 0
      tempData.setLimitHigh = 1
      setTempForm(tempData)
    } else {
      setBooleanValue(false)
    }
  }

  const handleFormChange = (value, target) => {
    let tempData = tempForm
    switch (target) {
      case "description":
        tempData.description = value
        setTempForm(tempData)
        return
      case "acceptanceLimitLow":
        tempData.acceptanceLimitLow = value
        setTempForm(tempData)
        return
      case "acceptanceLimitHigh":
        tempData.acceptanceLimitHigh = value
        setTempForm(tempData)
        return
      case "setLimitLow":
        tempData.setLimitLow = value
        setTempForm(tempData)
        return
      case "setLimitHigh":
        tempData.setLimitHigh = value
        setTempForm(tempData)
        return
      case "unit":
        tempData.unit = value
        setTempForm(tempData)
        return
    }
  }

  const handleMeasureRemove = (e) => {
    let temp = []
    tableMeasures.map(t => {
      if (e.measurementId !== undefined) {
        if (t.measurementId === e.measurementId) {
          let tempPart = t
          tempPart.disabled = true
          temp = [...temp, tempPart]
        } else {
          temp = [...temp, t]
        }
      } else {
        if (t.key === e.key) {
          let tempPart = t
          tempPart.disabled = true
          temp = [...temp, tempPart]
        } else {
          temp = [...temp, t]
        }
      }
    })
    setTableMeasures(temp)
  }

  const handleAddMeasure = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const tF = { ...tempForm, "disabled": false }
      const temp = [...tableMeasures, tF]
      setTableMeasures(temp)

      setTempForm(
        {
          key: tKey,
          description: "",
          acceptanceLimitLow: "",
          acceptanceLimitHigh: "",
          setLimitLow: "",
          setLimitHigh: "",
          unit: ""
        }
      )

      setTKey(tKey + 1)
      setComment("")
      setEditMeasurements(false)
      setBooleanValue(false)
      setSecondValidated(false)
      return
    }

    setSecondValidated(true)
  };

  const handleLimitValueChange = (e, description, type) => {
    let temp = []

    tableMeasures.map(t => {
      if (t.description === description) {
        let tempPart = t
        if (type === "setLow") {
          tempPart.setLimitLow = e.target.value
        } else if (type === "setHigh") {
          tempPart.setLimitHigh = e.target.value
        } else if (type === "accLow") {
          tempPart.acceptanceLimitLow = e.target.value
        } else if (type === "accHigh") {
          tempPart.acceptanceLimitHigh = e.target.value
        }
        temp = [...temp, tempPart]
      } else {
        temp = [...temp, t]
      }
    })

    setTableMeasures(temp)
  }

  return (
    <>
      <Button id="edit-test-btn" onClick={handleShow}>
        Muokkaa
      </Button>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Muokkaa testiä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 font-weight-bold">
            Pakolliset kentät on merkitty tähdellä (*)
          </div>
          <Form
            onSubmit={(e) => handleUpdate(e)}
            id="edit-test-first-form"
            noValidate
            validated={firstValidated}
          >
            <Row>
              <Col xs={3}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">*Testin kuvaus</Form.Label>
                  <Form.Control
                    id="test-description"
                    type="text"
                    value={selectedDescription}
                    onChange={(e) => setSelectedDescription(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Testin kuvaus ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">*Suoritustiheysvaatimus</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="reqValue-input"
                      type="number"
                      step="any"
                      placeholder={test.reqValue}
                      value={selectedReqValue}
                      onChange={(e) => setSelectedReqValue(e.target.value)}
                      required
                      min={1}
                    />
                    <Button
                      value="DAYS"
                      onClick={e => setSelectedReqUnit(e.target.value)}
                      checked={selectedReqUnit === "DAYS"}
                      variant={selectedReqUnit === "DAYS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      päivä
                    </Button>
                    <Button
                      value="WEEKS"
                      onClick={e => setSelectedReqUnit(e.target.value)}
                      checked={selectedReqUnit === "WEEKS"}
                      variant={selectedReqUnit === "WEEKS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      viikko
                    </Button>
                    <Button
                      value="MONTHS"
                      onClick={e => setSelectedReqUnit(e.target.value)}
                      check={selectedReqUnit === "MONTHS"}
                      variant={selectedReqUnit === "MONTHS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      kuukausi
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Suoritustiheysvaatimuksen tulee olla vähintään 1
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">*Suoritusväli</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="setValue-input"
                      type="number"
                      step="any"
                      placeholder={test.setValue}
                      value={selectedSetValue}
                      onChange={(e) => setSelectedSetValue(e.target.value)}
                      required
                      min={1}
                      max={formatReq(selectedReqValue, selectedReqUnit)}
                    />
                    <Button
                      value="DAYS"
                      onClick={e => setSelectedSetUnit(e.target.value)}
                      checked={selectedSetUnit === "DAYS"}
                      variant={selectedSetUnit === "DAYS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      päivä
                    </Button>
                    <Button
                      value="WEEKS"
                      onClick={e => setSelectedSetUnit(e.target.value)}
                      checked={selectedSetUnit === "WEEKS"}
                      variant={selectedSetUnit === "WEEKS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      viikko
                    </Button>
                    <Button
                      value="MONTHS"
                      onClick={e => setSelectedSetUnit(e.target.value)}
                      check={selectedSetUnit === "MONTHS"}
                      variant={selectedSetUnit === "MONTHS" ? "primary" : "outline-secondary"}
                      size="sm"
                    >
                      kuukausi
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Suoritusvälin tulee olla vähemmän tai saman verran kuin suoritustiheysvaatimus
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">Aloituspäivämäärä</Form.Label>
                  <DatePicker value={date} onChange={d => setDate(d)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label className="font-weight-bold">Testin tägit</Form.Label>
              <Multiselect
                data={tags}
                value={selectedTags}
                allowCreate={true}
                onCreate={(newTag) => handleTagCreate(newTag)}
                onChange={(setTags) => setSelectedTags(setTags)}
              />
            </Form.Group>

            <Table bordered>
              <thead>
                <tr>
                  <th>Ominaisuus</th>
                  <th>Hyväksymisraja (ala)</th>
                  <th>Hyväksymisraja (ylä)</th>
                  <th>Toimenpideraja (ala)</th>
                  <th>Toimenpideraja (ylä)</th>
                  <th>Mittayksikkö</th>
                  <th>Poista mittaus</th>
                </tr>
              </thead>
              <tbody>
                {tableMeasures.map((measurement, index) => {
                  if (measurement.disabled === false) {
                    return (
                      <tr id={`measurement-table-row-${index}`}>
                        <td>{measurement.description}</td>
                        {measurement.unit !== "totuusarvo"
                          ?
                          <>
                            <td>
                              <InputGroup>
                                <FormControl
                                  id={`measurement-table-acceptanceLimitLow-${index}`}
                                  defaultValue={measurement.acceptanceLimitLow}
                                  type="number"
                                  step="any"
                                  onChange={(e) => handleLimitValueChange(e, measurement.description, "accLow")}
                                  max={measurement.acceptanceLimitHigh}
                                  required
                                />
                              </InputGroup>
                            </td>
                            <td>
                              <InputGroup>
                                <FormControl
                                  id={`measurement-table-acceptanceLimitHigh-${index}`}
                                  defaultValue={measurement.acceptanceLimitHigh}
                                  type="number"
                                  step="any"
                                  onChange={(e) => handleLimitValueChange(e, measurement.description, "accHigh")}
                                  min={measurement.acceptanceLimitLow}
                                  required
                                />
                              </InputGroup>
                            </td>
                            <td>
                              <InputGroup>
                                <FormControl
                                  id={`measurement-table-setLimitLow-${index}`}
                                  defaultValue={measurement.setLimitLow}
                                  type="number"
                                  step="any"
                                  onChange={(e) => handleLimitValueChange(e, measurement.description, "setLow")}
                                  min={measurement.acceptanceLimitLow}
                                  max={measurement.acceptanceLimitHigh && measurement.setLimitHigh}
                                  required
                                />
                              </InputGroup>
                            </td>
                            <td>
                              <InputGroup>
                                <FormControl
                                  id={`measurement-table-setLimitHigh-${index}`}
                                  defaultValue={measurement.setLimitHigh}
                                  type="number"
                                  step="any"
                                  onChange={(e) => handleLimitValueChange(e, measurement.description, "setHigh")}
                                  min={measurement.acceptanceLimitLow && measurement.setLimitLow}
                                  max={measurement.acceptanceLimitHigh}
                                  required
                                />
                              </InputGroup>
                            </td>
                          </>
                          :
                          <>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </>}
                        <td>{measurement.unit}</td>
                        <td style={{ textAlign: "center" }} onClick={() => handleMeasureRemove(measurement)}><Button variant="danger">X</Button></td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </Table>

            {editMeasurements === false &&
              <Row className="mb-2"><Col>
                <Button onClick={() => setEditMeasurements(true)}>Lisää mittaus</Button>
              </Col></Row>
            }
          </Form>

          {editMeasurements ?
            <>
              <Form id="edit-test-second-form" onSubmit={handleAddMeasure} noValidate validated={secondValidated}>
                <Row>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Label className="font-weight-bold">
                        *Ominaisuus
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={e => handleFormChange(e.target.value, "description")}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Label className="font-weight-bold">
                        Totuusarvo
                      </Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue="Ei päällä"
                        onChange={e => handleBooleanValue(e.target.value)}
                      >
                        <option>Ei päällä</option>
                        <option>Päällä</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Label className="font-weight-bold">
                        {booleanValue ? "" : "*"}Mittayksikkö
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={e => handleFormChange(e.target.value, "unit")}
                        disabled={booleanValue}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label className="font-weight-bold">
                        {booleanValue ? "" : "*"}Hyväksymisraja (ala)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        onChange={e => handleFormChange(e.target.value, "acceptanceLimitLow")}
                        disabled={booleanValue}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label className="font-weight-bold">
                        {booleanValue ? "" : "*"}Hyväksymisraja (ylä)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        onChange={e => handleFormChange(e.target.value, "acceptanceLimitHigh")}
                        disabled={booleanValue}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label
                        className="font-weight-bold">
                        {booleanValue ? "" : "*"}Toimenpideraja (ala)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        onChange={e => handleFormChange(e.target.value, "setLimitLow")}
                        disabled={booleanValue}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label
                        className="font-weight-bold">
                        {booleanValue ? "" : "*"}Toimenpideraja (ylä)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        onChange={e => handleFormChange(e.target.value, "setLimitHigh")}
                        disabled={booleanValue}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Button
                      id="btn-add-measurement"
                      type="submit"
                      form="edit-test-second-form"
                      style={{ position: "absolute", bottom: 17 }}
                    >
                      Lisää mittaus
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <Button
                      id="btn-cancel-measurement-edit"
                      onClick={() => setEditMeasurements(false)}
                      style={{ position: "absolute", bottom: 17 }}
                    >
                      Keskeytä lisäys
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
            : <></>}

          <Row><Col>
            <Form>
              <Form.Group>
                <Form.Label><b>Kommentti muutoksista</b></Form.Label>
                <Form.Control
                  id="comment-field"
                  type="text"
                  onKeyPress={e => {
                    if (e.key === 'Enter')
                      e.preventDefault()
                  }}
                  onChange={e => setComment(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Kommentin tulee olla vähintään viisi merkkiä pitkä, jotta voit tallentaa tekemäsi muutokset.
                </Form.Text>
              </Form.Group>
              {test.comment !== null &&
                <Form.Group>
                  <Form.Text disabled><i><b>Viimeisin muutos: </b> {test.updatedBy}@{test.lastUpdated} "{test.comment}"</i></Form.Text>
                </Form.Group>
              }
            </Form>
            <Button id="submit-test-edit" type="submit" form="edit-test-first-form" disabled={comment.length < 5}>
              Tallenna
            </Button>
          </Col></Row>
        </Modal.Body >
      </Modal >
    </>
  )
}
