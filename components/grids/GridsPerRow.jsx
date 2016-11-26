import React from 'react'
import { connect } from 'react-redux'
import { FormGroup, Input, Label } from 'reactstrap'
import { setGridsPerRow } from '../../actions'

const GridsPerRow = ({ grids_per_row, dispatch }) => (
  <FormGroup>
    <Label for='grids_per_row'>每行格数:</Label>
    <Input type='number' name='grids_per_row' id='grids_per_row' placeholder='15' value={ grids_per_row } onChange={ e => { dispatch(setGridsPerRow(e.target.value)) }}/>
    <small id="grids_per_row_help" className="form-text text-muted">每一行田字格的格数</small>
  </FormGroup>
)

const mapStateToProps = (state) => {
  return {
    grids_per_row: state.options.get('grids_per_row')
  }
}

export default connect(mapStateToProps)(GridsPerRow)
