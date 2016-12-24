import React, { PropTypes } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const NumberField = ({ value, label, tooltip, id, onChange }) => (
  <FormGroup>
    <Label for={ id }>{ label }</Label>
    <Input type='number' name={ id } id={ id } value={ value } onChange={ (e) => { onChange(e.target.value) } }/>
    <small id="chars_per_row_help" className="form-text text-muted">{ tooltip }</small>
  </FormGroup>
)

NumberField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.number
}

export default NumberField
