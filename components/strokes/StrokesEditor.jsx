import React from 'react'
import { connect } from 'react-redux'
import StrokesPainter from './StrokesPainter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

import { requestStrokes } from '../../actions'

const StrokesEditor = ({strokes, dispatch}) => (
  <Container>
    <FormGroup row>
      <Label for='newChars' sm={2}>添加生字</Label>
      <Col sm={10}>
        <Input type="text" id='newChars' onChange={e => {}} onKeyUp={
          e => {
            if(e.keyCode == 13) { // return key is pressed
              var chars = e.target.value.replace(/ /g,'').split("")
              chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
              if (chars.length < 1) {
                // dispatch error message
              }
              console.log(chars)
              dispatch(requestStrokes(chars[0]))
              e.target.value = ''
            }
          }} placeholder="填写生字后按输入键（Return）。" value="填"/>
      </Col>
    </FormGroup>
    <Row><StrokesPainter strokes={strokes} color={'black'} size={200}/></Row>
  </Container>
)

const mapStateToProps = function(state){
  return {
    strokes: state.strokes
  }
}

export default connect(mapStateToProps)(StrokesEditor)
