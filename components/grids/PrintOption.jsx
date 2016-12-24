import React, { PropTypes } from 'react'
import { Button, ButtonGroup, FormGroup, Label, Col} from 'reactstrap'

const PrintOption = ({ id, label, value, onChange }) => (
  <FormGroup row>
    <Label for={ id } sm={5} md={4}>{ label }</Label>
    <Col sm={7} md={8}>
      <ButtonGroup id={ id }>
        <Button color='secondary' size='md' active={ value } onClick={ e => { onChange(true) } }>是</Button>
        <Button color='secondary' size='md' active={ !value } onClick={ e => { onChange(false) } }>否</Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
)

PrintOption.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

export default PrintOption
