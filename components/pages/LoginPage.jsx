
import React from 'react'
import DocumentTitle from 'react-document-title'

import { LoginForm } from 'react-stormpath'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router'

import css from './LoginPage.css'

export default class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Login`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>登录</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="Absolute-Center is-Responsive">
              <div className="col-sm-12 col-md-12">
                <LoginForm>
                  <div className="form-group input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input className="form-control" type="text" name='username' placeholder="用户名（email）"/>
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input className="form-control" type="password" name='password' placeholder="密码"/>
                  </div>
                  <div className="form-group">
                    <p spIf="form.error">
                      <strong>Error:</strong> <span spBind="form.errorMessage" />
                    </p>
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-def btn-block btn-primary" value="登录"/>
                  </div>
                  <div className="form-group" style={{ textAlign: 'center' }}>
                    <Link to="/forgot">忘记密码</Link>
                  </div>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
