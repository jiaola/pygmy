import React from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import { Link, browserHistory } from 'react-router'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Navbar color="dark" className="bg-inverse navbar-fixed-top navbar-dark" light>
        <Container>
          <NavbarToggler className="float-sm-right hidden-lg-up collapsed hidden-md-up" onClick={this.toggleNavbar} style={ {color: 'white'} }>☰</NavbarToggler>
          <Link className="navbar-brand" to="/" activeClassName="active">中文工具<span className="sr-only">中文工具</span></Link>
          <Collapse className="navbar-toggleable-sm" isOpen={!this.state.collapsed}>
            <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/" activeClassName="active">首页<span className="sr-only">首页</span></Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to='/grid' activeClassName="active" data-toggle="collapse">田字格<span className="sr-only">田字格</span></Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/typos" activeClassName="active">错别字<span className="sr-only">错别字</span></Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/strokes" activeClassName="active">笔顺编辑<span className="sr-only">笔顺编辑</span></Link>
              </NavItem>
              {
                // <NavItem>
                //   <Link className="nav-link" to="/writer" activeClassName="active">写字<span className="sr-only">写字</span></Link>
                // </NavItem>
              }

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavigationBar
