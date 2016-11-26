import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, FormGroup, Label, Col} from 'reactstrap'
import { setPinyin } from '../../actions'

const PrintPinyin = ({ pinyin, dispatch }) => (
  <FormGroup row>
    <Label for="printPinyin" sm={5} md={4}>打印拼音:</Label>
    <Col sm={7} md={8}>
      <ButtonGroup id='printPinyin'>
        <Button color='secondary' size='md' active={ pinyin } onClick={ e => { dispatch(setPinyin(true)) } }>是</Button>
        <Button color='secondary' size='md' active={ !pinyin } onClick={ e => { dispatch(setPinyin(false)) } }>否</Button>
      </ButtonGroup>
    </Col>
  </FormGroup>
)

const mapStateToProps = (state) => {
  return {
    pinyin: state.options.get('pinyin')
  }
}

export default connect(mapStateToProps)(PrintPinyin)
