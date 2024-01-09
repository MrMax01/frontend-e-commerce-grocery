import { GET_MY_ORDER } from "../actions";

const initialState = {
  content: [],
};
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDER:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};
export default ordersReducer;
