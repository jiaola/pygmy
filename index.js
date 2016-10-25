import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

let reactElement = document.getElementById('react')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    reactElement
)
