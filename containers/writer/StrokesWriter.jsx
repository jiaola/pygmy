import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import Loader from 'react-loader-advanced'

import CharsField from '../../components/shared/CharsField'
import EaselPainter from '../../components/strokes/EaselPainter'
import EaselWriter from '../../components/writer/EaselWriter'
import Alerts from '../../components/shared/Alerts'

import * as writerActions from '../../actions/writerActions'
import * as sharedActions from  '../../actions/sharedActions'
import WriterActionTypes from '../../actions/WriterActionTypes'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(sharedActions.requestChar(chars[0], WriterActionTypes.SEND_CHAR_REQUEST, WriterActionTypes.RECEIVE_CHAR_RESPONSE, WriterActionTypes.REQUEST_CHAR_FAILED, WriterActionTypes.ADD_ERROR))
    }
  }

  let onAnimateAllStrokes = function() {
    dispatch(writerActions.animateAllStrokes())
  }

  let onDeleteChars = function() {
    dispatch(writerActions.deleteChars())
  }

  let onErrorsDismiss = function() {
    dispatch(sharedActions.deleteErrors(WriterActionTypes.DELETE_ERRORS))
  }

  let onMessagesDismiss = function() {
    dispatch(sharedActions.deleteMessages(WriterActionTypes.DELETE_MESSAGES))
  }

  return {
    onAddChars,
    onAnimateAllStrokes,
    onDeleteChars,
    onErrorsDismiss,
    onMessagesDismiss
  }
}

class StrokesWriter extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch)
  }

  render() {
    return (
      <Container>
        <Row><Col><h1>写字</h1></Col></Row>
        <Row><Col><p>这个工具可以用来练习写字，或观看笔顺。填好生字后按添加键，然后描红或者按“观看笔顺”。</p></Col></Row>
        <Row><Col><Alerts type='danger' messages={ this.props.writer.get('errors') } onDismiss={ this.handlers.onErrorsDismiss }/></Col></Row>
        <Row><Col><Alerts type='info' messages={ this.props.writer.get('messages') } onDismiss={ this.handlers.onMessagesDismiss }/></Col></Row>
        <Loader show={ !this.props.writer.get('charLoaded') } message='loading'>
        <Row>
          <Col><CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars }/></Col>
        </Row>
        <Row>
          <Col><EaselWriter strokes={ this.props.writer.get('strokes') } length={ 200 }></EaselWriter></Col>
        </Row>
        </Loader>
      </Container>
    )
  }
}

const mapStateToProps = function(state){
  return {
    writer: state.writer
  }
}

export default connect(mapStateToProps)(StrokesWriter)
