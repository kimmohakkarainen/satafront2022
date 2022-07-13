import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import AttachmentProcess from "./attachmentprocess";
import Menu from "./menu";
import DeviceView from "./deviceview";
/* import TaskView from "./taskview"; */
import PersonAdminView from "./personadminview";
import AddTestEvent from "./testeventview";
import LogoutView from "./logoutview";
import AccountView from "./accountview";
import EnterView from "./enterview";
/* import InvoiceView from "./invoiceview"; */
import DoctorView from "./doctorview";
import ContentmarkerView from "./contentmarkerview";
import ExaminationAdminView from "./examinationview";

import { fetchWhoAmI, fetchState } from "./actions";

/* These routes to be refactored 
        <Route exact path="/tasklist" component={TaskView} />
        <Route exact path="/billing" component={InvoiceView} />
*/

function App({ fetchWhoAmI, fetchState, person }) {
  useEffect(() => {
    fetchWhoAmI();
    setInterval(() => fetchState(), 30000);
  }, [fetchWhoAmI]);

  return (
    <BrowserRouter>
      <AttachmentProcess />
      <Menu />
      <Routes>
        <Route exact path="/" element={<DeviceView />} />
        <Route exact path="/devices" element={<consoleDeviceView />} />
        <Route exact path="/admin/rights" element={<PersonAdminView />} />
        <Route exact path="/testevent" element={<AddTestEvent />} />
        <Route exact path="/logout" element={<LogoutView />} />
        <Route exact path="/password" element={<AccountView />} />
        <Route exact path="/enterview" element={<EnterView />} />
        <Route exact path="/contentmarker" element={<ContentmarkerView />} />
        <Route exact path="/doctor" element={<DoctorView />} />
        <Route
          exact
          path="/admin/examinations"
          element={<ExaminationAdminView />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWhoAmI: () => dispatch(fetchWhoAmI()),
    fetchState: () => dispatch(fetchState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
