import React from 'react'
import DocumentTitle from 'react-document-title'

import { RegistrationForm, LoginLink } from 'react-stormpath'
import { Row, Col, Container } from 'react-bootstrap'


export default class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`注册`}>
        <Container>
          <div className="row">
            <div className="col-xs-12">
              <h1>注册</h1>
              <hr />
            </div>
          </div>
          <Row>
            <div className="Absolute-Center is-Responsive">
              <div className="col-sm-12 col-md-12">
                <RegistrationForm>
                  <div className='sp-login-form'>
                    <div data-spIf="account.created">
                      <div className="col-xs-12 col-sm-4">
                        <p className="alert alert-success" data-spIf="account.enabled">
                          你的帐户已设置。请<LoginLink>登录</LoginLink>。
                        </p>
                        <div data-spIf="!account.enabled">
                          <p className="alert alert-success">Your account has been created. Please check your email for a verification link.</p>
                          <p className="pull-right">
                            <LoginLink>Back to Login</LoginLink>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div data-spIf="!account.created">
                      <div className="form-group input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input className="form-control" type="text" id="email" name='email' placeholder="用户名（email）" required={ true }/>
                      </div>
                      <div className="form-group input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input className="form-control" id="password" type="password" name='password' placeholder="密码" required={ true }/>
                      </div>
                      <div className="form-group" key="register-button">
                        <p className="alert alert-danger" data-spIf="form.error"><span data-spBind="form.errorMessage" /></p>
                        <input type="submit" className="btn btn-def btn-block btn-primary" value="注册"/>
                      </div>
                      <div className="form-group" style={{ textAlign: 'center' }}>
                        已经注册？<LoginLink>登录</LoginLink>
                      </div>
                    </div>
                  </div>
                </RegistrationForm>
              </div>
            </div>
          </Row>

        </Container>
      </DocumentTitle>
    )
  }
}
