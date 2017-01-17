import React from 'react'
import DocumentTitle from 'react-document-title'
import { ChangePasswordForm, LoginLink } from 'react-stormpath'

export default class ChangePasswordPage extends React.Component {
  render() {
    let query = this.props.location.query

    return (
      <DocumentTitle title={`Change Password`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>修改密码</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="Absolute-Center is-Responsive">
              <div className="col-xs-12">
                <ChangePasswordForm spToken={query.sptoken}>
                  <div className='sp-change-password-form'>
                    <div data-spIf="form.sent">
                      <p className="alert alert-success">你的密码已经修改。请<LoginLink>登录</LoginLink>.</p>
                    </div>
                    <div data-spIf="!form.sent">
                      <div className="form-group input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input id="spPassword" type="password" name="password" className="form-control" placeholder="新密码" required />
                      </div>
                      <div className="form-group input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input id="spConfirmPassword" type="password" name="confirmPassword" className="form-control" placeholder="新密码确认" required />
                      </div>
                      <div className="form-group">
                        <p className="alert alert-danger" data-spIf="form.error"><span data-spBind="form.errorMessage" /></p>
                        <button type="submit" className="btn btn-primary btn-def btn-block">
                          <span data-spIf="form.processing">正在设置新密码...</span>
                          <span data-spIf="!form.processing">设置新密码</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ChangePasswordForm>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
