import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { setCharsPerRow } from '../actions'

const CharsPerRow = ({ chars_per_row, dispatch }) => (
  <FormGroup>
    <Label for='chars_per_row'>每行生字数:</Label>
    <Input type='number' name='chars_per_row' id='chars_per_row' placeholder='3' value={ chars_per_row } onChange={ e => { dispatch(setCharsPerRow(e.target.value)) }}></Input>
    <small id="chars_per_row_help" className="form-text text-muted">每一行生字的个数</small>
  </FormGroup>
)

const mapStateToProps = (state) => {
  return {
    chars_per_row: state.options.get('chars_per_row')
  }
}

export default connect(mapStateToProps)(CharsPerRow)
