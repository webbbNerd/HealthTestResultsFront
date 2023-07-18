import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  count: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'INCREMENT':
    //   return {
    //     ...state,
    //     count: state.count + 1
    //   };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: rootReducer
  });

export default store;