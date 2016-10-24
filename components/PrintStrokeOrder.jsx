import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, FormGroup, Label, Col} from 'reactstrap'
import { setStrokes} from '../actions'

const PrintStrokeOrder = ({ strokes, dispatch }) => (
  <FormGroup row>
    <Label for="printStrokeOrder" sm={5} md={4}>打印笔顺:</Label>
    <Col sm={7} md={8}>
      <ButtonGroup id='printStrokeOrder'>
        <Button color='secondary' size='md' active={strokes} onClick={ e => { dispatch(setStrokes(true)) } }>是</Button>
        <Button color='secondary' size='md' active={!strokes} onClick={ e => { dispatch(setStrokes(false)) } }>否</Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
)

const mapStateToProps = (state) => {
  return {
    strokes: state.options.get('strokes')
  }
}

export default connect(mapStateToProps)(PrintStrokeOrder)
