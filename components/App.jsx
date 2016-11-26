import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

const App = ({ children }) => (
  <Container>
    <Row>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/about">About</Link>
      {' '}
      <Link to="/bar">Bar</Link>
    </Row>
    <Row>
      <button onClick={() => browserHistory.push('/about')}>Go to /about</button>
    </Row>
    <Row style={{ marginTop: '1.5em' }}>{children}</Row>
  </Container>
)

export default App
