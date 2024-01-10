import { ADD_QUERY, DELETE_QUERY } from "../actions";

const initialState = {
  content: "",
};
const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUERY:
      return {
        content: action.payload,
      };
    case DELETE_QUERY:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default queryReducer;
