import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup, Label, ButtonGroup, Button, Input } from 'reactstrap'
import { deleteChar, setCharPinyin } from '../actions'

const CharEditor = ({ char, index, dispatch }) => (
  <Row key={index}>
    <Col sm='2'><Label>{char.get('character')}</Label></Col>
    <Col sm='2'>
      <select value={char.get('pinyin')} name={char.get('character')+'_pinyin'} id={char.get('character')+'_pinyin'} onChange={ e => { dispatch(setCharPinyin(index, e.target.value)) }}>
        { char.has('pinyin_list') ?
          char.get('pinyin_list').map(function(obj, i) {
            return <option value={obj} key={i} >{obj}</option>
          }) : ''
        }
      </select>
    </Col>
    <Col sm='8'>
      <button type='button' className='btn btn-secondary btn-sq-sm' onClick={ e => { dispatch(deleteChar(index)) } }>
        <span className="fa fa-remove fa-sm" aria-hidden="true"></span>
      </button>
    </Col>
  </Row>
)

const mapStateToProps = (state, ownProps) => {
  return {
    char: state.chars.get(ownProps.index),
    index: ownProps.index
  }
}

export default connect(mapStateToProps)(CharEditor)
