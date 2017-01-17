import React from 'react'
import DocumentTitle from 'react-document-title'

import { ResetPasswordForm, LoginLink } from 'react-stormpath'

export default class ResetPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`忘记密码`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>忘记密码</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="Absolute-Center is-Responsive">
              <div className="col-sm-12 col-md-12">
                <ResetPasswordForm>
                  <div className="sp-reset-password-form">
                    <div data-spIf="form.sent">
                      <p className="alert alert-success">
                        我们已经发了重设密码的email到您的邮箱里。请查收，并点击邮件里的重设email的链接。
                      </p>
                      <p style={{ textAlign: 'center' }}>
                        <LoginLink>点击登录</LoginLink>
                      </p>
                    </div>
                    <div data-spIf="!form.sent">
                      <div className="form-group input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input className="form-control" id="spEmail" name='email' placeholder="用户名（email）" required={ true }/>
                      </div>
                      <div className="form-group" key="register-button">
                        <p className="alert alert-danger" data-spIf="form.error"><span data-spBind="form.errorMessage" /></p>
                        <input type="submit" className="btn btn-def btn-block btn-primary" value="提交重设请求"/>
                      </div>
                    </div>
                  </div>
                </ResetPasswordForm>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
