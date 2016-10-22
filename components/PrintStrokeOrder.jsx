import React from 'react'
import { Button, ButtonGroup, FormGroup, Label, Col} from 'reactstrap'

const PrintStrokeOrder = () => (
  <FormGroup row>
    <Label for="printStrokeOrder" sm={5} md={4}>打印笔顺:</Label>
    <Col sm={7} md={8}>
      <ButtonGroup id='printStrokeOrder'>
        <Button color='secondary' size='md' active>是</Button>
        <Button color='secondary' size='md'>否</Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
)

export default PrintStrokeOrder
