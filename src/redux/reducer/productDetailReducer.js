import { GET_PRODUCT_DETAIL } from "../actions";

const initialState = {
  content: null,
};
const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return {
        content: action.payload,
      };

    default:
      return state;
  }
};

export default productDetailReducer;
