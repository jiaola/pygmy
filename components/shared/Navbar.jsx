import React from 'react'
import { FormGroup, Input, Label, Col, Button, Nav, Container} from 'reactstrap'
import { Link, browserHistory } from 'react-router'

const Navbar = () => (
  <Nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
    <Container>
      <button className="navbar-toggler hidden-sm-up pull-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          ☰
      </button>
      <Link className="navbar-brand" to="/">中文工具</Link>
      <div className="collapse navbar-toggleable-xs" id="collapsingNavbar">
          <ul className="nav navbar-nav ">
              <li className="nav-item active">
                  <Link className="nav-link" to="/" activeClassName="active">Home <span className="sr-only">主页</span></Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to='/grid' activeClassName="active" data-toggle="collapse">田字格</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/typos" activeClassName="active">错别字</Link>
              </li>              
              <li className="nav-item">
                  <Link className="nav-link" to="/strokes" activeClassName="active">笔顺编辑</Link>
              </li>
          </ul>
      </div>
    </Container>
  </Nav>

)

export default Navbar
