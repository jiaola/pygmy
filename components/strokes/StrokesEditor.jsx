import React from 'react'
import { connect } from 'react-redux'
//import StrokesSorter from './StrokesSorter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

import { requestStrokes } from '../../actions'
import NewChar from '../shared/NewChar'
import StrokesSorter from './StrokesSorter'

let createHandlers = function(dispatch) {
  let onNewChar = function(e) {
    if(e.keyCode == 13) { // return key is pressed
      var chars = e.target.value.replace(/ /g,'').split("")
      chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
      if (chars.length < 1) {
        // dispatch error message
      }
      dispatch(requestStrokes(chars[0]))
      e.target.value = ''
    }
  }
  return {
    onNewChar
  }
}

class StrokesEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (
      <Container>
        <NewChar onChange={ (e) => this.handlers.onNewChar(e) } />
        <StrokesSorter />
      </Container>
    )
  }
}

const mapStateToProps = function(state){
  return {
    strokes: state.strokes
  }
}

export default connect(mapStateToProps)(StrokesEditor)
