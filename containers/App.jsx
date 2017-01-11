import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import NavigationBar from '../components/shared/NavigationBar'

const App = ({ children }) => (
  <div>
    <NavigationBar/>
    <div style={{ marginTop: '62px' }}>{ children }</div>
  </div>
)

export default App
