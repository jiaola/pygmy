import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

let logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

export default applyMiddleware(thunk, logger, promiseMiddleware())(createStore)(rootReducer)
