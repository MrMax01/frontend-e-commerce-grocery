import { ADD_TO_CART, GET_MY_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  content: [],
};
const myCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((company) => company._id !== action.payload._id),
      };
    case GET_MY_CART:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};
export default myCartReducer;
