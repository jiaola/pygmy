import React from 'react'
import { connect } from 'react-redux'
import NewChar from './NewChar'
import CharsPerRow from './CharsPerRow'
import GridsPerRow from './GridsPerRow'
import GridFormat from './GridFormat'
import PrintPinyin from './PrintPinyin'
import PrintStrokeOrder from './PrintStrokeOrder'
import EditChar from './EditChar'

import { addChar, fetchPinyin } from '../actions'
import { Container, Row, Col } from 'reactstrap'

require('../styles/screech.css')

const App = ({dispatch}) => (
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
                    var chars = e.target.value.split(/\s+/)
                    for (var i = 0, len = chars.length; i < len; i++) {
                      dispatch(addChar(chars[i]))
                    }
                    //dispatch(fetchPinyin(chars))
                    e.target.value = ''
                  }
                }}/>
            </Col>
        </Row>
        <EditChar/>
    </Container>
)

export default connect()(App)
