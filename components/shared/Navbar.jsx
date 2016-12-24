import React from 'react'
import { FormGroup, Input, Label, Col, Button, Nav, Container} from 'reactstrap'
import { Link, browserHistory } from 'react-router'

const Navbar = () => (
  <Nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
    <Container>
      <button className="navbar-toggler hidden-sm-up pull-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          ☰
      </button>
      <a className="navbar-brand" href="#">Navbar</a>
      <div className="collapse navbar-toggleable-xs" id="collapsingNavbar">
          <ul className="nav navbar-nav ">
              <li className="nav-item active">
                  <Link className="nav-link" to="/">Home <span className="sr-only">主页</span></Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to='/' data-toggle="collapse">田字格</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/strokes">笔顺编辑</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/about" data-target="#myModal" data-toggle="modal">关于</Link>
              </li>
          </ul>
      </div>
    </Container>
  </Nav>

)

export default Navbar
