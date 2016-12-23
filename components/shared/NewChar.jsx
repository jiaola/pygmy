import React from 'react'
import { FormGroup, Input, Label, Col } from 'reactstrap'

const NewChar = ({ onChange }) => (
  <FormGroup row>
    <Label for='newChars' sm={2}>添加生字</Label>
    <Col sm={10}>
      <Input type="text" id='newChars' onKeyUp={ onChange } placeholder="填写生字后按输入键（Return）。"/>
    </Col>
  </FormGroup>
)

export default NewChar
