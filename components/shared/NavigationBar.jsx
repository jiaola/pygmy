import React from 'react'
import { Grid, Collapse, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated, RegisterLink } from 'react-stormpath'
import { LinkContainer } from 'react-router-bootstrap'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className="navbar-brand" to="/" activeClassName="active">中文工具<span className="sr-only">中文工具</span></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem>首页<span className="sr-only">首页</span></NavItem>
              </LinkContainer>
              <LinkContainer to="/grid">
                <NavItem>田字格<span className="sr-only">田字格</span></NavItem>
              </LinkContainer>
              <LinkContainer to="/typos">
                <NavItem>错别字<span className="sr-only">错别字</span></NavItem>
              </LinkContainer>
              <LinkContainer to="/strokes">
                <NavItem>笔顺编辑<span className="sr-only">笔顺编辑</span></NavItem>
              </LinkContainer>
              <LinkContainer to="/writer">
                <NavItem>写字<span className="sr-only">写字</span></NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/login">
                <NavItem>登录</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavigationBar
