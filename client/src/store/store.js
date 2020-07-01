import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducer from "./combineReducers";

const initialState = {
   currentUser: {},
   queue: {
      cards: [],
      index: 0,
   },
   editableCard: {},
};

const store = createStore(combineReducer, initialState, composeWithDevTools());

export default store;
