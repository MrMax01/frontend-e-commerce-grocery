import { GET_PRODUCTS } from "../actions";

const initialState = {
  content: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log("Payload:", action.payload);
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
