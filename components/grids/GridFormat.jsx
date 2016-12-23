import React, { PropTypes } from 'react'
import { Button, ButtonGroup, Label, InputGroup} from 'reactstrap'


const GridFormat = ({ value, onChange }) => (
  <InputGroup>
    <Label for="gridFormat">生字格格式:</Label><br/>
    <ButtonGroup id='gridFormat'>
      <Button color='secondary' size='md' active={ value == 'field' } onClick={ e => { onChange('field') }}>田字</Button>
      <Button color='secondary' size='md' active={ value == 'rice' } onClick={ e => { onChange('rice') }}>米字</Button>
      <Button color='secondary' size='md' active={ value == 'blank' } onClick={ e => { onChange('blank') }}>空白</Button>
    </ButtonGroup>
    <small id="wordPerRowHelp" className="form-text text-muted">生字格的格式</small>
  </InputGroup>
)

GridFormat.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default GridFormat
