import React from "react"
import { connect } from "react-redux"

import { Table } from "react-bootstrap"

const DeviceServiceEvents = ({ serviceEvents }) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Huoltomerkinnän otsikko</th>
          <th>Päiväys</th>
          <th>Kuvaus</th>
        </tr>
      </thead>
      <tbody>
        {serviceEvents.length > 0 ?
          serviceEvents.map(serviceEvent => {
            return (
              <tr>
                <td>{serviceEvent.title}</td>
                <td>{serviceEvent.date}</td>
                <td>{serviceEvent.description}</td>
              </tr>
            )
          })
        : <tr><td colSpan="3">Ei huoltomerkintöjä</td></tr>
        }
      </tbody>
    </Table>
  )
}

export default connect(null)(DeviceServiceEvents)