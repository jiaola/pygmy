import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup, Label, Input } from 'reactstrap'
import { setEmail } from '../../actions'

const Email = ({ email, dispatch }) => (
  <FormGroup row>
    <Label sm={2}>邮件地址</Label>
    <Col sm={10}>
      <Input type="email" name="email" id="email" placeholder="请填写你的email地址。PDF文件会发送到你的邮箱里。" onChange={ e => {
          dispatch(setEmail(e.target.value))
        }}></Input>
    </Col>
  </FormGroup>
)

const mapStateToProps = (state) => {
  return {
    email: state.options.get('email')
  }
}

export default connect(mapStateToProps)(Email)
