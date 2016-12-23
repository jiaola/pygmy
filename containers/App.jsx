import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

const App = ({ children }) => (
  <Container>
    <Row>
      Links:
      {' '}
      <Link to="/">田字格</Link>
      {' '}
      <Link to="/strokes">笔顺编辑</Link>
      {' '}
      <Link to="/about">关于</Link>
    </Row>
    <Row>
      <button onClick={() => browserHistory.push('/about')}>Go to /about</button>
    </Row>
    <Row style={{ marginTop: '1.5em' }}>{ children }</Row>
  </Container>
)

export default App
