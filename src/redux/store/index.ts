import { applyMiddleware, compose, createStore } from "redux"

import rootReducer from "../reducers/index"
import thunk from "redux-thunk"

const composeEnhancers = compose

export const initialState = {
testRandomNumber : 0
}

const configureStore = () =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

export default configureStore
