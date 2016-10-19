import React from 'react'
import { Button, ButtonGroup, FormGroup, Label, Col} from 'reactstrap'

const PrintPinyin = () => (
  <FormGroup row>
    <Label for="printPinyin" sm={5} md={4}>打印拼音:</Label>
    <Col sm={7} md={8}>
      <ButtonGroup id='printPinyin'>
        <Button color='secondary' size='md' active>是</Button>
        <Button color='secondary' size='md'>否</Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
)

export default PrintPinyin
