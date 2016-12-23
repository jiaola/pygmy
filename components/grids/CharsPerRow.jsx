import React, { PropTypes } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const CharsPerRow = ({ value, onChange }) => (
  <FormGroup>
    <Label for='chars_per_row'>每行生字数:</Label>
    <Input type='number' name='chars_per_row' id='chars_per_row' placeholder='3' value={ value } onChange={ (e) => { onChange(e.target.value) } }/>
    <small id="chars_per_row_help" className="form-text text-muted">每一行生字的个数</small>
  </FormGroup>
)

CharsPerRow.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default CharsPerRow
