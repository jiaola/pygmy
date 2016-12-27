import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import { requestStrokes } from '../../actions/strokeActions'
import { receiveTyposResponse, selectStroke } from '../../actions/typosActions'
import CharsField from '../../components/shared/CharsField'
import StrokesPicker from '../../components/typos/StrokesPicker'
import EaselPainter from '../../components/strokes/EaselPainter'


let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(requestStrokes(chars[0], receiveTyposResponse))
    }
  }

  let onSelectStroke = function(index) {
    dispatch(selectStroke(index))
  }

  return {
    onAddChars,
    onSelectStroke
  }
}

class TyposMaker extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch)
  }

  hideStrokes(strokes, hidden) {
    if (strokes == null) return null
    return update(strokes, {Stroke: {$apply: (x) => x.filter((s, i) => ( !hidden.includes(i) ))}})
  }

  render() {
    return (
      <Container>
        <Row><Col><h1>错别字</h1></Col></Row>
        <Row>
          <Col><CharsField onAddChars={ this.handlers.onAddChars } /></Col>
        </Row>
        <Row>
          <Col sm={8}><StrokesPicker strokes={ this.props.typos.get('strokes') } onSelectStroke={ this.handlers.onSelectStroke } picked={ this.props.typos.get('hidden') }/></Col>
          <Col sm={4}><EaselPainter strokes={ this.hideStrokes(this.props.typos.get('strokes'), this.props.typos.get('hidden')) } length={200} /></Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state){
  return {
    typos: state.typos
  }
}

export default connect(mapStateToProps)(TyposMaker)
