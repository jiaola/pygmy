import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Label, InputGroup} from 'reactstrap'
import { setFormat } from '../actions'

const CharPerRow = ({ format, dispatch }) => (
  <InputGroup>
    <Label for="gridFormat">生字格格式:</Label><br/>
    <ButtonGroup id='gridFormat'>
      <Button color='secondary' size='md' active={ format == 'field' } onClick={ e => { dispatch(setFormat('field')) }}>田字</Button>
      <Button color='secondary' size='md' active={ format == 'rice' } onClick={ e => { dispatch(setFormat('rice')) }}>米字</Button>
      <Button color='secondary' size='md' active={ format == 'blank' } onClick={ e => { dispatch(setFormat('blank')) }}>空白</Button>
    </ButtonGroup>
    <small id="wordPerRowHelp" className="form-text text-muted">生字格的格式</small>
  </InputGroup>
)

const mapStateToProps = (state) => {
  return {
    format: state.options.get('format')
  }
}

export default connect(mapStateToProps)(CharPerRow)
