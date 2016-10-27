import React from 'react'
import { FormGroup, Input, Label, Col } from 'reactstrap'

const NewChar = ({onChange}) => (
  <FormGroup row>
    <Label for='newChars' sm={2}>添加生字</Label>
    <Col sm={10}>
      <Input type="text" id='newChars' onKeyUp={onChange} onChange={function(e){}} placeholder="请填写要打印的生字"/>
    </Col>
  </FormGroup>
)

export default NewChar
