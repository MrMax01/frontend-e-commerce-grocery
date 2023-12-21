import { GET_PRODUCTS } from "../actions";

const initialState = {
  content: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
