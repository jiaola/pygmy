import React from 'react'
import { FormGroup, Input, Label, Col } from 'reactstrap'

const NewChar = ({onChange}) => (
  <FormGroup row>
    <Label for='newChars' sm={2}>添加生字</Label>
    <Col sm={10}>
      <Input type="text" id='newChars' onKeyUp={onChange} placeholder="生字之间请用空格隔开" value="我 是 谁"/>
    </Col>
  </FormGroup>
)

export default NewChar
