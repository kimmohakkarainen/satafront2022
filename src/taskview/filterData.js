import React from "react"

import { Col, Form, Row } from "react-bootstrap"
import { Multiselect } from "react-widgets";

export const FilterData = ({ tasklist, filter, setFilter }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          <b>Suodata laitteen nimen mukaisesti</b>
        </Form.Label>
        <Multiselect
          data={tasklist}
          value={filter}
          textField="name"
          filter="contains"
          onChange={filter => setFilter(filter)}
        />
      </Form.Group>
    </Form>
  )
}