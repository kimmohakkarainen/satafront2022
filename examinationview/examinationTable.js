import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";

class NewExaminationRow extends Component {
  constructor(props) {
    super(props);

    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      examinationId: 0,
      name: "",
      nameValid: null,
      doctorPrice: "",
      doctorPriceValid: null,
      invoicePrice: "",
      invoicePriceValid: null,
      marker: false
    };
  }

  isValid() {
    const nameValid = this.state.name.length > 0;
    const doctorPriceValid = this.state.doctorPrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
    const invoicePriceValid = this.state.invoicePrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);

    this.setState({
      nameValid: (nameValid ? "success" : "error"),
      doctorPriceValid: (doctorPriceValid ? "success" : "error"),
      invoicePriceValid: (invoicePriceValid ? "success" : "error"),
    });

    return nameValid && doctorPriceValid && invoicePriceValid;
  }

  handleTallenna(e) {
    if (this.isValid()) {
      this.props.onTallenna(this.state);
    }
  }

  handlePeruuta(e) {
    this.props.onPeruuta(this.state);
  }

  render() {
    return (
      <tr key={0}>
        <td>
          <Form>
            <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.nameValid}>
              <Form.Control id="input-name"
                type="text"
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </td>
        <td>
          <Form>
            <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.doctorPriceValid}>
              <Form.Control id="input-doc-price"
                type="text" style={{ textAlign: "right" }}
                value={this.state.doctorPrice}
                onChange={e => {
                  this.setState({ doctorPrice: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </td>
        <td>
          <Form>
            <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.invoicePriceValid}>
              <Form.Control id="input-invoice-price"
                type="text" style={{ textAlign: "right" }}
                value={this.state.invoicePrice}
                onChange={e => {
                  this.setState({ invoicePrice: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </td>
        <td style={{ textAlign: "right" }}>
          <Form>
            <Form.Group id="checkbox-content-marker" style={{ marginBottom: "0px", display: "inline-block" }}>
              <Form.Check
                type="checkbox"
                checked={this.state.marker}
                onChange={e => {
                  this.setState({ marker: e.target.checked });
                }} />
            </Form.Group>
          </Form>
        </td>
        <td>
          <div style={{ float: "right" }}>
            <Button variant="primary" id="btn-save-examination" onClick={this.handleTallenna}>Tallenna</Button>
            <Button id="btn-cancel-examination" onClick={this.handlePeruuta}>Peruuta</Button>
          </div>
        </td>
      </tr>
    );
  }
}

class ExaminationRow extends Component {
  constructor(props) {
    super(props);

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      editing: false,
      examinationId: 0,
      version: 0,
      name: "",
      nameValid: null,
      doctorPrice: "",
      doctorPriceValid: null,
      invoicePrice: "",
      invoicePriceValid: null,
      marker: false
    };
  }

  handleMuokkaa(e) {
    this.props.onMuokkaa(this.props.user);
    this.setState({
      editing: true,
      examinationId: this.props.examination.examinationId,
      version: this.props.examination.version,
      name: this.props.examination.name,
      doctorPrice: this.props.examination.doctorPrice,
      invoicePrice: this.props.examination.invoicePrice,
      marker: this.props.examination.marker
    });
  }

  isValid() {
    const nameValid = this.state.name.length > 0;
    const doctorPriceValid = this.state.doctorPrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
    const invoicePriceValid = this.state.invoicePrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);

    this.setState({
      nameValid: (nameValid ? "success" : "error"),
      doctorPriceValid: (doctorPriceValid ? "success" : "error"),
      invoicePriceValid: (invoicePriceValid ? "success" : "error"),
    });

    return nameValid && doctorPriceValid && invoicePriceValid;
  }

  handleTallenna(e) {
    if (this.isValid()) {
      this.props.onTallenna(this.state);
      this.setState({
        editing: false
      });
    }
  }

  handlePeruuta(e) {
    this.props.onPeruuta(this.state);
    this.setState({
      editing: false
    });
  }

  render() {
    if (this.state.editing === true) {

      return (
        <tr key={this.props.examination.examinationId}>
          <td>
            <Form>
              <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.nameValid}>
                <Form.Control id="input-name"
                  type="text"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </td>
          <td>
            <Form>
              <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.doctorPriceValid}>
                <Form.Control id="input-doc-price" style={{ textAlign: "right" }}
                  type="text"
                  value={this.state.doctorPrice}
                  onChange={e => {
                    this.setState({ doctorPrice: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </td>
          <td>
            <Form>
              <Form.Group style={{ marginBottom: '0px' }} validationState={this.state.invoicePriceValid}>
                <Form.Control id="input-invoice-price" style={{ textAlign: "right" }}
                  type="text"
                  value={this.state.invoicePrice}
                  onChange={e => {
                    this.setState({ invoicePrice: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </td>
          <td style={{ textAlign: "right" }}>
            <Form>
              <Form.Group style={{ marginBottom: "0px", display: "inline-block" }}>
                <Form.Check
                  id="checkbox-content-marker"
                  type="checkbox"
                  checked={this.state.marker}
                  onChange={e => {
                    this.setState({ marker: e.target.checked });
                  }}
                />
              </Form.Group>
            </Form>
          </td>
          <td>
            <div style={{ float: "right" }}>
              <Button id="btn-save-examination" variant="primary" onClick={this.handleTallenna}>Tallenna</Button>
              <Button id="btn-cancel-examination" onClick={this.handlePeruuta}>Peruuta</Button>
            </div>
          </td>
        </tr>
      );
    } else {
      const id = 'btn-edit-' + this.props.examination.examinationId;
      return (
        <tr key={this.props.examination.examinationId}>
          <td>{this.props.examination.name}</td>
          <td style={{ textAlign: "right" }}>{this.props.examination.doctorPrice}</td>
          <td style={{ textAlign: "right" }}>{this.props.examination.invoicePrice}</td>
          <td style={{ textAlign: "right" }}>
            <Form>
              <Form.Group style={{ marginBottom: "0px", display: "inline-block" }}>
                <Form.Check 
                  type="checkbox"
                  checked={this.props.examination.marker}
                  disabled
                />
              </Form.Group>
            </Form>
          </td>
          <td>
            <div style={{ float: "right" }}>
              <Button id={id} disabled={this.props.editing} onClick={this.handleMuokkaa}>Muokkaa</Button>
            </div>
          </td>
        </tr>
      );
    }
  }
}

class ExaminationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      newRow: false
    };

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handleMuokkaaUusi = this.handleMuokkaaUusi.bind(this);
  }

  handleMuokkaa(e) {
    this.setState({
      editing: true
    });
  }

  handleMuokkaaUusi(e) {
    this.setState({
      editing: true,
      newRow: true
    });
  }

  handlePeruuta(e) {
    this.setState({
      editing: false,
      newRow: false
    });
  }

  handleTallenna(e) {
    this.setState({
      editing: false,
      newRow: false
    });
    this.props.onTallenna(e);
  }

  render() {
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th style={{ width: "55%" }} >Tutkimuksen nimi</th>
              <th style={{ textAlign: "right", width: "10%" }} >Lääkärin osuus</th>
              <th style={{ textAlign: "right", width: "10%" }} >Laskutushinta</th>
              <th style={{ textAlign: "right", width: "5%" }} >Sisältö-<br />merkittävä</th>
              <th style={{ width: "20%" }} />
            </tr>
          </thead>
          <tbody id="table-examinations">
            {this.props.examinations && this.props.examinations.map(exam => {
              return (
                <ExaminationRow
                  key={exam.examinationId}
                  examination={exam}
                  editing={this.state.editing}
                  onMuokkaa={this.handleMuokkaa}
                  onTallenna={this.handleTallenna}
                  onPeruuta={this.handlePeruuta}
                />
              );
            })}
            {this.state.newRow && (
              <NewExaminationRow
                key={0}
                onTallenna={this.handleTallenna}
                onPeruuta={this.handlePeruuta}
              />
            )}
          </tbody>
        </Table>
        <Button id="btn-new-examination" variant="primary" disabled={this.state.editing} onClick={this.handleMuokkaaUusi}>
          Luo tutkimus
        </Button>
      </div>
    );
  }
}

export default ExaminationTable;
