import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './containers/App'
import About from './components/About'
import GridForm from './containers/grids/GridForm'
import StrokesEditor from './containers/strokes/StrokesEditor'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

let reactElement = document.getElementById('react')
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={GridForm}/>
        <Route path="about" component={About}/>
        <Route path="strokes" component={StrokesEditor}/>
      </Route>
    </Router>
  </Provider>,
  reactElement
)
