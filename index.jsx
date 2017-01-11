import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './containers/App'
import Home from './components/Home'
import GridForm from './containers/grids/GridForm'
import StrokesEditor from './containers/strokes/StrokesEditor'
import TyposMaker from './containers/typos/TyposMaker'
import StrokesWriter from './containers/writer/StrokesWriter'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

let reactElement = document.getElementById('react')
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home} />
        <Route path="grid" component={ GridForm } />
        <Route path="strokes" component={ StrokesEditor } />
        <Route path="typos" component={ TyposMaker } />
        <Route path="writer" component={ StrokesWriter } />
      </Route>
    </Router>
  </Provider>,
  reactElement
)
