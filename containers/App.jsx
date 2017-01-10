import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import NavigationBar from '../components/shared/NavigationBar'
import Example from '../components/shared/Example'

const App = ({ children }) => (
  <Container>
    <NavigationBar/>
    <Row style={{ marginTop: '62px' }}>{ children }</Row>
  </Container>
)

export default App
