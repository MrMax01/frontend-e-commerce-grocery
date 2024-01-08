import { ADD_MY_PRODUCT, GET_MY_PRODUCT, REMOVE_MY_PRODUCT } from "../actions";

const initialState = {
  content: [],
};

const myProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PRODUCT:
      return {
        content: action.payload,
      };
    case REMOVE_MY_PRODUCT:
      return {
        ...state,
        content: state.content.filter((product) => product.id !== action.payload),
      };
    case ADD_MY_PRODUCT:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    default:
      return state;
  }
};

export default myProductsReducer;
