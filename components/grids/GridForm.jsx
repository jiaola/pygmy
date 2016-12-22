import React from 'react'
import { connect } from 'react-redux'
import NewChar from '../shared/NewChar'
import CharsPerRow from './CharsPerRow'
import GridsPerRow from './GridsPerRow'
import GridFormat from './GridFormat'
import PrintPinyin from './PrintPinyin'
import PrintStrokeOrder from './PrintStrokeOrder'
import CharList from './CharList'
import Email from './Email'
import Footer from '../../containers/Footer'

import { addChar, fetchPinyin, submitGrid } from '../../actions'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

require('../../styles/screech.css')

const GridForm = ({state, dispatch}) => (
    <Container>
        <Row><Col><h1>田字格</h1></Col></Row>
        <Row>
            <Col xs='12' sm='3' md='3' lg='3'><CharsPerRow/></Col>
            <Col xs='12' sm='3' md='3' lg='3'><GridsPerRow/></Col>
            <Col xs='12' sm='6' md='6' lg='6'><GridFormat/></Col>
        </Row>
        <Row>
            <Col xs='12' sm='6'><PrintPinyin/></Col>
            <Col xs='12' sm='6'><PrintStrokeOrder/></Col>
        </Row>
        <Row>
            <Col>
                <NewChar onChange={ e => {
                  if(e.keyCode == 13) { // return key is pressed
                    var chars = e.target.value.replace(/ /g,'').split("")
                    chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
                    for (var i = 0, len = chars.length; i < len; i++) {
                      dispatch(addChar(chars[i]))
                    }
                    dispatch(fetchPinyin(chars))
                    e.target.value = ''
                  }
                }}/>
            </Col>
        </Row>
        <CharList/>
        <Email/>
        <Row>
          <Col sm={{size: 'auto', offset: 5}} >
            <Button className='center-block' onClick={ e => {
                //chars, email, grids_per_row, chars_per_row
                dispatch(submitGrid(state))
              }}>提交</Button>
          </Col>
        </Row>
        <Footer/>
    </Container>
)

const mapStateToProps = function(state){
  return {
    state
  }
}

export default connect(mapStateToProps)(GridForm)
