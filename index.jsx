import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import store from './store'
import App from './containers/App'
import Home from './components/Home'
import GridPage from './containers/grids/GridPage'
import StrokesEditor from './containers/strokes/StrokesEditor'
import TyposMaker from './containers/typos/TyposMaker'
import StrokesWriter from './containers/writer/StrokesWriter'
import { ChangePasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyEmailPage } from './components/pages'

import css from './styles/style.css'

ReactGA.initialize('UA-90774941-1')
ReactStormpath.init({
  endpoints: {
    baseUri: 'https://pygmy.apps.stormpath.io'
  }
})

let logPageView = () => {
  // only log visits on production
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
}

let reactElement = document.getElementById('react')
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={ history } onUpdate={ logPageView }>
      <HomeRoute path="/" component={ App }>
        <IndexRoute component={ Home} />
        <LoginRoute path='login' component={ LoginPage } />
        <Route path='verify' component={ VerifyEmailPage } />
        <Route path='register' component={ RegisterPage } />
        <Route path='passwordReset' component={ ChangePasswordPage } />
        <Route path='forgot' component={ ResetPasswordPage } />
        <Route path="grid" component={ GridPage } />
        <Route path="strokes" component={ StrokesEditor } />
        <Route path="typos" component={ TyposMaker } />
        <Route path="writer" component={ StrokesWriter } />
      </HomeRoute>
    </Router>
  </Provider>,
  reactElement
)
