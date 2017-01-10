import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import Loader from 'react-loader-advanced'

import CharsField from '../../components/shared/CharsField'
import StrokesPicker from '../../components/typos/StrokesPicker'
import EaselPainter from '../../components/strokes/EaselPainter'
import Alerts from '../../components/shared/Alerts'

import * as typosActions from '../../actions/typosActions'
import { deleteErrors, deleteMessages } from '../../actions/index'
import TyposActionTypes from '../../actions/TyposActionTypes'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(typosActions.sendTyposRequest())
      dispatch(typosActions.requestTypos(chars[0]))
    }
  }

  let onDeleteChars = function() {
    dispatch(typosActions.deleteChars())
  }

  let onSelectStroke = function(index) {
    dispatch(typosActions.selectStroke(index))
  }

  let onErrorsDismiss = function() {
    dispatch(deleteErrors(TyposActionTypes.DELETE_ERRORS))
  }

  let onMessagesDismiss = function() {
    dispatch(deleteMessages(TyposActionTypes.DELETE_MESSAGES))
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
    return update(strokes, {Stroke: {$apply: (x) => x.filter((s, i) => ( !hidden.includes(i) ))}})
  }

  render() {
    return (
      <Container>
        <Row><Col><h1>错别字</h1></Col></Row>
        <Row><Col><p>这个工具可以用来生成错字的图片。填好生字后按添加键，然后在出现的笔顺中选择要隐藏的笔顺，在右边的框中会出现错字。右键点击错字可以下载图片。</p></Col></Row>
        <Row><Col><Alerts type='danger' messages={ this.props.typos.get('errors') } onDismiss={ this.handlers.onErrorsDismiss }/></Col></Row>
        <Row><Col><Alerts type='info' messages={ this.props.typos.get('messages') } onDismiss={ this.handlers.onMessagesDismiss }/></Col></Row>
        <Loader show={ !this.props.typos.get('typosLoaded') } message='loading'>
        <Row>
          <Col><CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars }/></Col>
        </Row>
        <Row>
          <Col sm={8}><StrokesPicker strokes={ this.props.typos.get('strokes') } onSelectStroke={ this.handlers.onSelectStroke } picked={ this.props.typos.get('hidden') }/></Col>
          <Col sm={4}><EaselPainter strokes={ this.hideStrokes(this.props.typos.get('strokes'), this.props.typos.get('hidden')) } length={200} /></Col>
        </Row>
        </Loader>
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
