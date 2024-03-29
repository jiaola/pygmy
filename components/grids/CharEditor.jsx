import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, ControlLabel } from 'react-bootstrap'
import * as Utils from '../../utils'

const CharEditor = ({ char, index, onDeleteChar, onSetPinyin }) => (
  <Row key={index}>
    <Col sm={2} smOffset={1} xs={2} xsOffset={1}>
      <ControlLabel>{Utils.hexToChar(char.get('character'))}</ControlLabel>
    </Col>
    <Col sm={2} xs={3}>
      {
        char.get('pinyin').length > 1 ?
          <select value={char.get('selectedPinyin')} name={char.get('character')+'_pinyin'} id={char.get('character')+'_pinyin'} onChange={ e => onSetPinyin(index, e.target.value) }>
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
    <Col sm={2} xs={3}>
      {
        char.get('stroke_order') ?
          <span className="label label-success">有笔顺</span>
          :
          <span className="label label-danger">无笔顺</span>
      }
    </Col>
    <Col sm={5} xs={3}>
      <button type='button' className='btn btn-xs btn-default' onClick={ () => onDeleteChar(index) }>
        <span className="fa fa-remove fa-sm" aria-hidden="true"></span>
      </button>
    </Col>
  </Row>
)

CharEditor.propTypes = {
  char: PropTypes.object,
  index: PropTypes.number,
  onDeleteChar: PropTypes.func.isRequired,
  onSetPinyin: PropTypes.func.isRequired,
}

export default connect()(CharEditor)
