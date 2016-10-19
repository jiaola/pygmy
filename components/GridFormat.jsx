import React from 'react'
import { Button, ButtonGroup, FormGroup, Label, InputGroup} from 'reactstrap'

const CharPerRow = () => (
  <InputGroup>
    <Label for="gridFormat">生字格格式:</Label><br/>
    <ButtonGroup id='gridFormat'>
      <Button color='secondary' size='md' active>田字</Button>
      <Button color='secondary' size='md'>米字</Button>
      <Button color='secondary' size='md'>空白</Button>
    </ButtonGroup>
    <small id="wordPerRowHelp" className="form-text text-muted">生字格的格式</small>
  </InputGroup>
)

export default CharPerRow
