import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const CharPerRow = () => (
  <FormGroup>
    <Label for='gridPerRow'>每行格数:</Label>
    <Input type='number' name='gridPerRow' id='gridPerRow' placeholder='15'></Input>
    <small id="gridPerRowHelp" className="form-text text-muted">每一行田字格的个数</small>
  </FormGroup>
)

export default CharPerRow
