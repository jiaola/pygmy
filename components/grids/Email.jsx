import React, { PropTypes } from 'react'
import { Row, Col, FormGroup, Label, Input } from 'reactstrap'

const Email = ({ value, onChange }) => (
  <FormGroup row>
    <Label sm={2}>邮件地址</Label>
    <Col sm={10}>
      <Input type="email" name="email" id="email" placeholder="请填写你的email地址。PDF文件会发送到你的邮箱里。" onChange={ e => { onChange(e.target.value) }} value = { value }></Input>
    </Col>
  </FormGroup>
)

Email.propTypes = {
  email: PropTypes.string,
  onChange: PropTypes.func
}

export default Email
