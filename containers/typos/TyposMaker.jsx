import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'react-bootstrap'
import Loader from 'react-loader-advanced'
import DocumentTitle from 'react-document-title'

import CharsField from '../../components/shared/CharsField'
import StrokesPicker from '../../components/typos/StrokesPicker'
import EaselPainter from '../../components/strokes/EaselPainter'
import Alerts from '../../components/shared/Alerts'

import * as typosActions from '../../actions/typosActions'
import * as sharedActions from '../../actions/sharedActions'
import TyposActionTypes from '../../actions/TyposActionTypes'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(sharedActions.requestChar(chars[0], TyposActionTypes.SEND_CHAR_REQUEST, TyposActionTypes.RECEIVE_CHAR_RESPONSE, TyposActionTypes.REQUEST_CHAR_FAILED, TyposActionTypes.ADD_ERROR))
    }
  }

  let onDeleteChars = function() {
    dispatch(typosActions.deleteChars())
  }

  let onSelectStroke = function(index) {
    dispatch(typosActions.selectStroke(index))
  }

  let onErrorsDismiss = function() {
    dispatch(sharedActions.deleteErrors(TyposActionTypes.DELETE_ERRORS))
  }

  let onMessagesDismiss = function() {
    dispatch(sharedActions.deleteMessages(TyposActionTypes.DELETE_MESSAGES))
  }

  return {
    onAddChars,
    onDeleteChars,
    onSelectStroke,
    onErrorsDismiss,
    onMessagesDismiss
  }
}

class TyposMaker extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch)
  }

  hideStrokes(strokes, hidden) {
    if (strokes == null) return null
    strokes.attributes = update(strokes.attributes, {stroke: {$apply: (x) => x.filter((s, i) => ( !hidden.includes(i) ))}})
    return strokes
  }

  render() {
    return (
      <DocumentTitle title={`错字`}>
        <Container>
          <Row><Col><h1>错别字</h1><hr/></Col></Row>
          <Row><Col><p>这个工具可以用来生成错字的图片。填好生字后按添加键，然后在出现的笔顺中点击选择要隐藏的笔画，在右边的框中会出现错字。右键点击错字可以下载图片。</p></Col></Row>
          <Row><Col><Alerts type='danger' messages={ this.props.typos.get('errors') } onDismiss={ this.handlers.onErrorsDismiss }/></Col></Row>
          <Row><Col><Alerts type='info' messages={ this.props.typos.get('messages') } onDismiss={ this.handlers.onMessagesDismiss }/></Col></Row>
          <Loader show={ !this.props.typos.get('charLoaded') } message='loading'>
          <Row>
            <Col><CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars }/></Col>
          </Row>
          <Row>
            <Col sm={8}><StrokesPicker strokes={ this.props.typos.get('strokes') } onSelectStroke={ this.handlers.onSelectStroke } picked={ this.props.typos.get('hidden') }/></Col>
            <Col sm={4}><EaselPainter strokes={ this.hideStrokes(this.props.typos.get('strokes'), this.props.typos.get('hidden')) } length={200} /></Col>
          </Row>
          </Loader>
        </Container>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state){
  return {
    typos: state.typos
  }
}

export default connect(mapStateToProps)(TyposMaker)
