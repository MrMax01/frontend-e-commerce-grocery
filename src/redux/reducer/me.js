import { GET_ME } from "../actions";

const initialState = {
  content: null,
};
const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ME:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default meReducer;
