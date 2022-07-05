
const initialState = {
  error: null,
  person: null,
  devices: [],
  tests: [],
  allTests: [],
  incidents: [],
  serviceEvents: [],
  tasklist: [],
  deviceTestEvents: [],
  testEvent: [],
  events: [],
  eventItem: null,
  activeDevice: null,
  activeTest: null,
  searchParams: '',
  testTemplate: [],
  persons: [],
  tags: [],
  ownTasks: [],
  newTasks: [],
  assignedTasks: [],
  processedTasks: [],
  examinationOptions: [],
  doctorOptions: [],
  examinations: [],
  beginDate: null,
  endDate: null,
  doctorFilter: [],
  examinationFilter: [],
  preview: [],
  markableTasks: [],
  markableTasksAll: [],
  attachmentsPending: [],
  attachmentsWaitingContent: [],
  attachmentsReady: [],
  attachmentDownloading: null
};

export default function tieto2State(state = initialState, action) {
  /* console.log(action); */
  if (action.type === "LOGOUT_SUCCEEDED") {
    return initialState;
  } else {
    const newstate = Object.assign({}, state, { error: null }, action.payload);
    return newstate;
  }
}
