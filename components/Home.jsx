import React from 'react'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import { Link, browserHistory } from 'react-router'

const Home = ({}) => (
  <Container>
    <Row>
      <Col>
        中文小工具，欢迎使用！
      </Col>
    </Row>
    <Row>
      <ul>
          <li className="nav-item">
            <Link to='/grid'>田字格</Link>
          </li>
          <li className="nav-item">
            <Link to="/strokes">笔顺编辑</Link>
          </li>
          <li className="nav-item">
            <Link to="/typos">错别字</Link>
          </li>
      </ul>
    </Row>
  </Container>
)

export default Home
