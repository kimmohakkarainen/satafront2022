import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  FormGroup,
  FormLabel,
  FormControl,
  FormText
} from "react-bootstrap";
import DatePicker from "react-widgets/DatePicker";
import moment from "moment";

import {
  stateIsValid,
  initialState,
  taskReducer,
  handleHetu,
  handleSukunimi,
  handleLisatiedot,
  handleLaakari,
  handleTutkimus,
  handleEsitietolomake,
  handleEsitietolomakeToggle,
  handleTutkimusPaivaChange,
  handleVastaanottoPaivaChange
} from "./taskReducer";

export default function CreateTaskModal({
  dispatch,
  examinationOptions,
  doctorOptions,
  defaultValue,
  title
}) {
  const [state, taskDispatch] = useReducer(
    taskReducer,
    initialState(defaultValue)
  );

  function handleClick() {
    if (stateIsValid(state)) {
      const vpvm = state.vastaanottoPaiva === null ? null : moment(state.vastaanottoPaiva).format('YYYY-MM-DD');
      const tpvm = state.tutkimusPaiva === null ? null : moment(state.tutkimusPaiva).format('YYYY-MM-DD');
      const params = {
        taskId: state.taskId,
        version: state.version,
        hetu: state.hetu,
        sukunimi: state.sukunimi,
        tutkimus: { value: state.tutkimus },
        tutkimusPaiva: tpvm,
        vastaanottoPaiva: vpvm,
        lisatiedot: state.lisatiedot,
        esitietolomake: state.esitietolomake,
        laakari: { value: state.laakari }
      };
      dispatch(params);
    } else {
      console.log("handleClick().NOT_VALID");
      taskDispatch({ type: "NOT_VALID" });
    }
  }

  function inputComponent(validity) {
    if (validity == null) {
      return (props) => <input class="form-control" {...props} />;
    } else if (validity) {
      return (props) => <input class="form-control is-valid" {...props} />;
    } else {
      return (props) => <input class="form-control is-invalid" {...props} />;
    }
  }

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <FormLabel>Tutkimuspäivä</FormLabel>
          <DatePicker id="input-tutkimuspvm"
            value={state.tutkimusPaiva}
            onChange={(selectedDay) => handleTutkimusPaivaChange(taskDispatch, selectedDay)}
            isValid={state.tutkimusPaivaValid}
            isInvalid={state.tutkimusPaivaValid === false}
          />
          {false && (
            <FormText className="text-muted">
              Syötä tähän tutkimuspäivä
            </FormText>
          )}
	        
        </FormGroup>
        <FormGroup>
          <FormLabel>Henkilötunnus</FormLabel>
          <FormControl
            id="input-henkilotunnus"
            type="text"
            placeholder="000000-0000"
            value={state.hetu}
            onChange={(event) => handleHetu(taskDispatch, event)}
            isValid={state.hetuValid}
            isInvalid={state.hetuValid === false}
          />
          {false && (
            <FormText className="text-muted">
              Syötä tähän henkilön sosiaaliturvatunnus
            </FormText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel>Sukunimi</FormLabel>
          <FormControl
            id="input-sukunimi"
            type="text"
            placeholder="Sukunimi"
            value={state.sukunimi}
            onChange={(event) => handleSukunimi(taskDispatch, event)}
            isValid={state.sukunimiValid}
            isInvalid={state.sukunimiValid === false}
          />
          {false && (
            <FormText className="text-muted">
              Syötä tähän henkilön sukunimi
            </FormText>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>Tutkimus</FormLabel>
          <FormControl
            id="input-tutkimus"
            as="select"
            placeholder="(Valitse)"
            value={state.tutkimus}
            onChange={(v) => handleTutkimus(taskDispatch, v)}
            isValid={state.tutkimusValid}
            isInvalid={state.tutkimusValid === false}
          >
            <option key={null} value={null} disabled={true}></option>
            {examinationOptions.map(function (option) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Vastaanottopäivä</FormLabel>
          <DatePicker id="input-vastaanottopvm"
            value={state.vastaanottoPaiva}
            onChange={(selectedDay) => handleVastaanottoPaivaChange(taskDispatch, selectedDay)}
            isValid={state.vastaanottoPaivaValid}
            isInvalid={state.vastaanottoPaivaValid === false}
          />
          {false && (
            <FormText className="text-muted">
              Syötä tähän tutkimuspäivä
            </FormText>
          )}
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup
              style={{ zIndex: 0 }}
              type="radio"
              name="options"
              defaultValue={1}
              onChange={() => handleEsitietolomakeToggle(taskDispatch)}
            >
              <ToggleButton value={1}>
                Esitietolomaketta ei ole täytetty
              </ToggleButton>
              <ToggleButton id="toggle-esitietolomake" value={2}>Esitietolomake on täytetty</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>

        {state.esitietolomakeExpanded && (
          <FormGroup>
            <FormLabel>Esitietolomakkeen tiedostonimi</FormLabel>
            <FormControl
              id="input-esitietolomake"
              type="text"
              placeholder="Esitietolomakkeen tiedostonimi"
              value={state.esitietolomake}
              onChange={(v) => handleEsitietolomake(taskDispatch, v)}
              isValid={state.esitietolomakeValid}
              isInvalid={state.esitietolomakeValid === false}
            />
            {false && (
              <FormText className="text-muted">
                Syötä esitietolomakkeen tiedostonimi
              </FormText>
            )}
          </FormGroup>
        )}

        <FormGroup>
          <FormLabel>Lisätiedot</FormLabel>
          <FormControl
            id="input-lisatiedot"
            as="textarea" rows={3}
            placeholder="Tähän mahdolliset lisätiedot"
            value={state.lisatiedot}
            onChange={(v) => handleLisatiedot(taskDispatch, v)}
          />
          {false && (
            <FormText className="text-muted">
              Syötä tähän mahdolliset lisätiedot
            </FormText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel>Lääkäri</FormLabel>
          <FormControl
            id="input-laakari"
            as="select"
            placeholder="(Valitse)"
            value={state.laakari}
            onChange={(event) => {
              handleLaakari(taskDispatch, event);
            }}
          >
            <option key={null} value={null}></option>
            {doctorOptions.map(function (option) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </FormControl>
          {false && (
            <FormText className="text-muted">
              Syötä tähän arvioiva lääkäri
            </FormText>
          )}
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-save-task" variant="primary" onClick={handleClick}>
          Talleta
        </Button>
      </Modal.Footer>
    </div >
  );
}
