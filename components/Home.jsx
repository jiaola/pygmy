import React from 'react'
import { Grid, Row, Col, FormGroup, Button, Label, Input } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'

const Home = ({}) => (
  <Grid>
    <Row>
      <Col>
        <p>
        中文小工具，欢迎使用！
        </p>
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
      </Col>
    </Row>
  </Grid>
)

export default Home
