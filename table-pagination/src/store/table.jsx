import axios from "axios";

export const TABLE_DATA = 'TABLE_DATA';
export const CHECK_OCCURRENCE = 'CHECK_OCCURRENCE';
export const ALL_CHECK_OCCURRENCE = 'ALL_CHECK_OCCURRENCE';
export const TABLE_USER = 'TABLE_USER';

const initialState = {
  data: [],
  dataLen: 0,
  page: 0,
  selectData: [],
  user: [],
  userLen: 0
};

export const tableData = (data) => ({
  type: TABLE_DATA,
  data
});
export const checkOccurrence = (selected) => ({
  type: CHECK_OCCURRENCE,
  selected
});
export const allCheckOccurrence = (selected) => ({
  type: ALL_CHECK_OCCURRENCE,
  selected
});
export const tableUser = (data) => ({
  type: TABLE_USER,
  data
})

export const requestTableData = (page) => {
  return async (dispatch) => {
    axios.get(`http://localhost:8000/table`, {params: {page: page || 0 }})
    .then(response=>dispatch(tableUser(response.data)))
    .catch(error=>console.log(error))
  }
};
export const requestData = (page) => {
  return async (dispatch) => {
    axios.get(`http://localhost:8000/data`, {params: {page: page || 0 }})
    .then(response=>dispatch(tableData(response.data)))
    .catch(error=>console.log(error))
  }
}

const table_data = (state, action) => ({
  ...state,
  data: action.data.list,
  dataLen: action.data.count
});
const check_occurrence = (state, action) => ({
  ...state,
  selectData: action.selected
});
const all_checek_occurrence = (state, action) => ({
  ...state,
  selectData: action.selected
});
const table_user = (state, action) => ({
  ...state,
  user: action.data.list,
  userLen: action.data.count
})

const table = (state=initialState, action) => {
  switch (action.type) {
    case TABLE_DATA:
      return table_data(state, action);
    case CHECK_OCCURRENCE:
      return check_occurrence(state, action);
    case ALL_CHECK_OCCURRENCE:
      return all_checek_occurrence(state, action);
    case TABLE_USER:
      return table_user(state, action);
    default:
      return state;
  }
};

export default table;