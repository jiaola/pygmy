import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup, Label, ButtonGroup, Button, Input } from 'reactstrap'
import { deleteChar, setCharPinyin } from '../../actions/gridActions'
import * as Utils from '../../utils/Utils'

const CharEditor = ({ char, index, dispatch }) => (
  <Row key={index}>
    <Col sm='2' xs='3'><Label>{Utils.hexToChar(char.get('character'))}</Label></Col>
    <Col sm='2' xs='3'>
      {
        char.get('pinyin').length > 1 ?
          <select value={char.get('selectedPinyin')} name={char.get('character')+'_pinyin'} id={char.get('character')+'_pinyin'} onChange={ e => { dispatch(setCharPinyin(index, e.target.value)) }}>
            {
              char.get('pinyin').map(function(p, i) {
                return <option value={p} key={i} >{p}</option>
              })
            }
          </select>
          :
          <span>{ char.get('pinyin')[0] }</span>
      }

    </Col>
    <Col sm='2' xs='3'>
      {
        char.get('stroke_order') ?
          <span className="tag tag-success">有笔顺</span>
          :
          <span className="tag tag-danger">无笔顺</span>
      }
    </Col>
    <Col sm='6' xs='3'>
      <button type='button' className='btn btn-secondary btn-sq-sm' onClick={ e => { dispatch(deleteChar(index)) } }>
        <span className="fa fa-remove fa-sm" aria-hidden="true"></span>
      </button>
    </Col>
  </Row>
)

CharEditor.propTypes = {
  char: PropTypes.object,
  index: PropTypes.number
}

export default connect()(CharEditor)
