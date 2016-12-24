import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import Navbar from '../components/shared/Navbar'

const App = ({ children }) => (
  <Container>
    <Navbar/>
    <Row style={{ marginTop: '62px' }}>{ children }</Row>
  </Container>
)

export default App
