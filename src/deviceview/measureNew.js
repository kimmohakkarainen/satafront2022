import React, { useState } from "react";
import { connect } from "react-redux"
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const MeasureNew = ({ setTempMeasures }) => {
  const [tableMeasures, setTableMeasures] = useState([]);
  const [booleanValue, setBooleanValue] = useState(false)
  const [tKey, setTKey] = useState(0)
  const [description, setDescription] = useState("")
  const [acceptanceLimitLow, setAcceptanceLimitLow] = useState(null)
  const [acceptanceLimitHigh, setAcceptanceLimitHigh] = useState(null)
  const [setLimitLow, setSetLimitLow] = useState(null)
  const [setLimitHigh, setSetLimitHigh] = useState(null)
  const [unit, setUnit] = useState("")
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleRemoveRow = (rowId) => {
    let tempData = []
    tableMeasures.map(data => {
      if (data.key !== rowId) {
        if (tableMeasures.length > 0) {
          tempData = [...tempData, data]
        } else {
          tempData = [data]
        }
      }
    })

    setTableMeasures(tempData)
    setTempMeasures(tempData)
  };

  const handleBooleanValue = (value) => {
    if (value === "Päällä") {
      setBooleanValue(true)
      setUnit("totuusarvo")
      setAcceptanceLimitLow(0)
      setAcceptanceLimitHigh(1)
      setSetLimitLow(0)
      setSetLimitHigh(1)
    } else {
      setBooleanValue(false)
      setUnit("")
      setAcceptanceLimitLow(null)
      setAcceptanceLimitHigh(null)
      setSetLimitLow(null)
      setSetLimitHigh(null)
    }
  }

  const resetValues = () => {
    setBooleanValue(false)
    setTKey(tKey + 1)
    setUnit("")
    setDescription("")
    setAcceptanceLimitLow(null)
    setAcceptanceLimitHigh(null)
    setSetLimitLow(null)
    setSetLimitHigh(null)

    if (document.getElementById("new-measure-form" !== null)) {
      document.getElementById("new-measure-form").reset()
    }
  }

  const handleAddMeasure = (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const tempData = {
        key: tKey,
        description: description,
        acceptanceLimitLow: acceptanceLimitLow,
        acceptanceLimitHigh: acceptanceLimitHigh,
        setLimitLow: setLimitLow,
        setLimitHigh: setLimitHigh,
        unit: unit
      }

      setTableMeasures([
        ...tableMeasures,
        tempData
      ]);

      setTempMeasures([
        ...tableMeasures,
        tempData
      ]);

      resetValues()
      setShow(false)

      setValidated(false)
      event.stopPropagation();
      return
    }

    setValidated(true)
  };


  return (
    <>
      {show ?
        <>
          <h4>Lisää mittaus</h4>
          <Form
            id="new-measure-form"
            onSubmit={e => handleAddMeasure(e)}
            noValidate
            validated={validated}
          >
            <Row>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label><b>*Ominaisuus</b></Form.Label>
                  <Form.Control
                    id="measure-description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ominaisuus ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label><b>Totuusarvo</b></Form.Label>
                  <Form.Control
                    id="measure-boolean"
                    as="select"
                    defaultValue="Ei päällä"
                    onChange={e => handleBooleanValue(e.target.value)}
                  >
                    <option value="Ei päällä">Ei päällä</option>
                    <option value="Päällä">Päällä</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label><b>{booleanValue ? "" : "*"}Mittayksikkö</b></Form.Label>
                  <Form.Control
                    id="unit"
                    type="text"
                    value={booleanValue ? "" : unit}
                    onChange={e => setUnit(e.target.value)}
                    disabled={booleanValue}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Mittayksikkö ei voi olla tyhjä
                  </Form.Control.Feedback>
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
                    id="lowReq"
                    type="number"
                    step="any"
                    value={booleanValue ? "" : acceptanceLimitLow}
                    onInput={e => setAcceptanceLimitLow(e.target.value)}
                    disabled={booleanValue}
                    max={acceptanceLimitHigh !== null ? acceptanceLimitHigh : null}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Hyväksymisraja ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">
                    {booleanValue ? "" : "*"}Hyväksymisraja (ylä)
                  </Form.Label>
                  <Form.Control
                    id="highReq"
                    type="number"
                    step="any"
                    value={booleanValue ? "" : acceptanceLimitHigh}
                    onInput={e => setAcceptanceLimitHigh(e.target.value)}
                    disabled={booleanValue}
                    min={acceptanceLimitLow !== null ? acceptanceLimitLow : null}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Hyväksymisraja ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">
                    {booleanValue ? "" : "*"}Toimenpideraja (ala)
                  </Form.Label>
                  <Form.Control
                    id="lowSet"
                    type="number"
                    step="any"
                    value={booleanValue ? "" : setLimitLow}
                    onInput={e => setSetLimitLow(e.target.value)}
                    disabled={booleanValue}
                    min={acceptanceLimitLow !== null ? acceptanceLimitLow : null}
                    max={acceptanceLimitHigh !== null ? acceptanceLimitHigh : null}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Toimenpideraja ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">
                    {booleanValue ? "" : "*"}Toimenpideraja (ylä)
                  </Form.Label>
                  <Form.Control
                    id="highSet"
                    type="number"
                    step="any"
                    value={booleanValue ? "" : setLimitHigh}
                    onInput={e => setSetLimitHigh(e.target.value)}
                    disabled={booleanValue}
                    min={acceptanceLimitLow !== null ? acceptanceLimitLow : null}
                    max={acceptanceLimitHigh !== null ? acceptanceLimitHigh : null}
                    required={show ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Toimenpideraja ei voi olla tyhjä
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Button
                  id="btn-add-measurement"
                  type="submit"
                  form="new-measure-form"
                  style={{ position: "absolute", bottom: 17 }}
                >
                  Tallenna mitattava
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  onClick={() => setShow(false)}
                  style={{ position: "absolute", bottom: 17 }}
                  variant="secondary"
                >
                  Kumoa
                </Button>
              </Col>
            </Row>
          </Form>
        </>
        :
        <>
          <Row className="mb-3">
            <Col>
              <Button id="new-measure-dialog-open" onClick={() => { setShow(true); resetValues() }}>Lisää mittaus</Button>
            </Col>
          </Row>
        </>
      }
      {(tableMeasures !== undefined && tableMeasures.length > 0) ?
        <Table bordered className="mb-4">
          <thead>
            <tr>
              <th>Ominaisuus</th>
              <th>Hyväksymisraja (ala)</th>
              <th>Hyväksymisraja (ylä)</th>
              <th>Toimenpideraja (ala)</th>
              <th>Toimenpideraja (ylä)</th>
              <th>Mittayksikkö</th>
              <th>Poista rivi</th>
            </tr>
          </thead>
          <tbody>
            {tableMeasures.length > 0
              ?
              <>
                {tableMeasures.map((row) => {
                  return (
                    <tr key={row.key}>
                      <td>{row.description}</td>
                      {row.unit !== "totuusarvo" ?
                        <>
                          <td>{row.acceptanceLimitLow}</td>
                          <td>{row.acceptanceLimitHigh}</td>
                          <td>{row.setLimitLow}</td>
                          <td>{row.setLimitHigh}</td>
                        </>
                        :
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      }
                      <td>{row.unit}</td>
                      <td style={{ textAlign: "center" }}><Button id="btn-remove-measurement" variant="danger" onClick={() => handleRemoveRow(row.key)}>X</Button></td>
                    </tr>
                  )
                })}
              </>
              :
              <tr>
                <td colSpan={7}><i>Ei määritettyjä testejä</i></td>
              </tr>
            }
          </tbody>
        </Table>
        : <></>}
    </>
  )
};

export default connect(null)(MeasureNew);