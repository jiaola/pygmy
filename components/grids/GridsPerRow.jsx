import React, { PropTypes } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const GridsPerRow = ({ value, onChange }) => (
  <FormGroup>
    <Label for='grids_per_row'>每行格数:</Label>
    <Input type='number' name='grids_per_row' id='grids_per_row' placeholder='15' value={ value } onChange={ e => { onChange(e.target.value) }}/>
    <small id="grids_per_row_help" className="form-text text-muted">每一行田字格的格数</small>
  </FormGroup>
)

GridsPerRow.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
}

export default GridsPerRow
