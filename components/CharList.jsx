import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Label, ButtonGroup, Button, Input } from 'reactstrap'
import { deleteChar } from '../actions'

const CharList = ({ chars, dispatch }) => (
  <Container>
    {chars.map((char, index) =>
      <Row key={index}>
        <Col sm='2'><Label>{char.get('character')}</Label></Col>
        <Col sm='2'>
          <Input type='select' name={char.get('character')+'_pinyin'} id={char.get('character')+'_pinyin'}>
            { char.has('pinyin_list') ?
              char.get('pinyin_list').map(function(obj, i) {
                return <option value={obj} key={i}>{obj}</option>
              }) : ''
            }
          </Input>
        </Col>
        <Col sm='8'>
          <button type='button' className='btn btn-secondary btn-sq-sm' onClick={ e => { dispatch(deleteChar(index)) } }>
            <span className="fa fa-remove fa-sm" aria-hidden="true"></span>
          </button>
        </Col>
      </Row>
    )}
  </Container>
)

const mapStateToProps = (state) => {
  return {
    chars: state.chars
  }
}

export default connect(mapStateToProps)(CharList)
