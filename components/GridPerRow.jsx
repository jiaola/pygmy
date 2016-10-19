import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const GridPerRow = () => (
  <FormGroup>
    <Label for='gridPerRow'>每行生字数:</Label>
    <Input type='number' name='wordPerRow' id='wordPerRow' placeholder='3'></Input>
    <small id="wordPerRowHelp" className="form-text text-muted">每一行打印多少个生字</small>
  </FormGroup>
)

export default GridPerRow
