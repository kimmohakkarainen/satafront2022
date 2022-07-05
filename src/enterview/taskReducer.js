import moment from "moment";

export function stateIsValid({
  hetu,
  sukunimi,
  tutkimus,
  tutkimusPaiva,
  esitietolomake,
  esitietolomakeExpanded
}) {
  return (
    hetu.length === 11 &&
    sukunimi.length > 1 &&
    tutkimus != null &&
    tutkimus > 0 &&
    tutkimusPaiva !== "" &&
    tutkimusPaiva !== null &&
    (esitietolomake.length > 3 || !esitietolomakeExpanded)
  );
}

export function initialState(state) {
  if (state == null) {
    return {
      hetu: "",
      hetuValid: null,
      sukunimi: "",
      sukunimiValid: null,
      tutkimus: "",
      tutkimusPaiva: null,
      tutkimusPaivaValid: null,
      vastaanottoPaiva: null,
      vastaanottoPaivaValid: null,
      esitietolomake: "",
      esitietolomakeValid: null,
      esitietolomakeExpanded: false,
      lisatiedot: "",
      laakari: ""
    };
  } else {
    return {
      ...state,
      tutkimusPaiva : state.tutkimusPaiva == null ? null : moment(state.tutkimusPaiva).toDate(),
      vastaanottoPaiva : state.vastaanottoPaiva == null ? null : moment(state.vastaanottoPaiva).toDate(),
      laakari: state.laakari != null ? state.laakari.value : "",
      hetuValid: null,
      sukunimiValid: null,
      tutkimus: state.tutkimus != null ? state.tutkimus.value : "",
      tutkimusValid: null,
      tutkimusPaivaValid: null,
      vastaanottoPaivaValid: null,
      esitietolomake: state.esitietolomake != null ? state.esitietolomake : "",
      esitietolomakeValid: state.esitietolomake != null,
      esitietolomakeExpanded:
        state.esitietolomake != null && state.esitietolomake.length > 0
    };
  }
}

export function taskReducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    case "SET_HETU":
      return {
        ...state,
        hetu: payload,
        hetuValid: payload.length === 11 ? true : false
      };

    case "SET_SUKUNIMI":
      return {
        ...state,
        sukunimi: payload,
        sukunimiValid: payload.length > 1 ? true : false
      };

    case "SET_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomake: payload,
        esitietolomakeValid: payload.length > 3 ? true : false
      };

    case "SET_LISATIEDOT":
      return {
        ...state,
        lisatiedot: payload
      };

    case "SET_LAAKARI":
      return {
        ...state,
        laakari: payload
      };

    case "SET_TUTKIMUS":
      return {
        ...state,
        tutkimus: payload,
        tutkimusValid: payload == null ? false : true
      };

    case "TOGGLE_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomakeExpanded: !state.esitietolomakeExpanded,
        esitietolomakeValid: state.esitietolomakeExpanded ? true : null,
        esitietolomake: ""
      };

    case "SET_TUTKIMUSPAIVA":
      if (payload === undefined) {
        return { ...state, tutkimusPaivaValid: null };
      } else {
        return {
          ...state,
          tutkimusPaiva: payload,
          tutkimusPaivaValid: true
        };
      }

    case "SET_VASTAANOTTOPAIVA":
      if (payload === undefined) {
        return { ...state, vastaanottoPaivaValid: null };
      } else {
        return {
          ...state,
          vastaanottoPaiva: payload,
          vastaanottoPaivaValid: true
        };
      }
    case "NOT_VALID":
      return {
        ...state,
        hetuValid: state.hetu.length === 11 ? true : false,
        sukunimiValid: state.sukunimi.length > 1 ? true : false,
        esitietolomakeValid:
          state.esitietolomake.length > 3
            ? true
            : !state.esitietolomakeExpanded,
        tutkimusPaivaValid: state.tutkimusPaiva === "" ? false : true,
        tutkimusValid: state.tutkimus === "" ? false : true
      };

    default:
      console.log(" NOT MATCHED " + action.type);
  }
}

export function handleHetu(dispatch, v) {
  dispatch({ type: "SET_HETU", payload: v.target.value });
}

export function handleSukunimi(dispatch, v) {
  dispatch({ type: "SET_SUKUNIMI", payload: v.target.value });
}

export function handleLisatiedot(dispatch, v) {
  dispatch({ type: "SET_LISATIEDOT", payload: v.target.value });
}

export function handleLaakari(dispatch, v) {
  dispatch({ type: "SET_LAAKARI", payload: v.target.value });
}

export function handleTutkimus(dispatch, v) {
  dispatch({ type: "SET_TUTKIMUS", payload: v.target.value });
}

export function handleEsitietolomake(dispatch, v) {
  dispatch({ type: "SET_ESITIETOLOMAKE", payload: v.target.value });
}

export function handleEsitietolomakeToggle(dispatch) {
  dispatch({ type: "TOGGLE_ESITIETOLOMAKE", payload: null });
}

export function handleTutkimusPaivaChange(dispatch, selectedDay) {
  dispatch({ type: "SET_TUTKIMUSPAIVA", payload: selectedDay });
}

export function handleVastaanottoPaivaChange(dispatch, selectedDay) {
  dispatch({ type: "SET_VASTAANOTTOPAIVA", payload: selectedDay });
}
