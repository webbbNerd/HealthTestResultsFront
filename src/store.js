import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  formdata: null,
  token: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setFormData":
      return {
        ...state,
        formdata: action.payload,
      };
    case "setToken":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
