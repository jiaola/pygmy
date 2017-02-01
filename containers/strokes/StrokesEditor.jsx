import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, Button, Label, Input } from 'react-bootstrap'
import Loader from 'react-loader-advanced'
import DocumentTitle from 'react-document-title'

import CharsField from '../../components/shared/CharsField'
import StrokesSorter from '../../components/strokes/StrokesSorter'
import Alerts from '../../components/shared/Alerts'

import * as sharedActions from '../../actions/sharedActions'
import * as strokesActions from '../../actions/strokesActions'
import StrokesActionTypes from '../../actions/StrokesActionTypes'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(sharedActions.requestChar(chars[0], StrokesActionTypes.REQUEST_CHAR))
    }
  }

  let onDeleteChars = function(chars) {
    dispatch(strokesActions.deleteChars())
  }

  let onSort = function(order) {
    dispatch(strokesActions.sortStrokes(order))
  }

  let onSubmit = function(strokes) {
    dispatch(strokesActions.submitSort(strokes))
  }

  let onErrorsDismiss = function() {
    dispatch(sharedActions.deleteErrors(StrokesActionTypes.STROKES))
  }

  let onMessagesDismiss = function() {
    dispatch(sharedActions.deleteMessages(StrokesActionTypes.STROKES))
  }

  return {
    onAddChars,
    onDeleteChars,
    onSort,
    onSubmit,
    onErrorsDismiss,
    onMessagesDismiss
  }
}

class StrokesEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch)
  }

  render() {
    return (
      <DocumentTitle title={`笔顺编辑`}>
        <Grid>
          <Row><Col><h1>笔顺</h1><hr/></Col></Row>
          <Loader show={ this.props.strokes.get('loading') } message='Submitting'>
            <Row><Col><Alerts type='danger' messages={ this.props.strokes.get('errors') } onDismiss={ this.handlers.onErrorsDismiss }/></Col></Row>
            <Row><Col><Alerts type='info' messages={ this.props.strokes.get('messages') } onDismiss={ this.handlers.onMessagesDismiss }/></Col></Row>
            <Row><Col><p>我们的字库里很多字的笔顺不正确，需要您的帮助。请在下面填一个中文字后按“添加”，然后用鼠标将笔画的图片按正确的次序排好。提交后您编辑的笔顺将被储存。如果笔顺已经被编辑过，请核查是否正确。谢谢！</p></Col></Row>

            <Loader show={ this.props.strokes.get('loadingChar') } message='Loading'>
              <Row>
              <CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars } />
              <StrokesSorter strokes={this.props.strokes.get('strokes')} onSort={this.handlers.onSort}/>
              </Row>
              <Row>
                <Col sm={7} smOffset={5} >
                  <Button className='center-block btn-primary btn' style={ { marginTop: '10px' }} disabled={ this.props.strokes.get('strokes') === null } onClick={ e => this.handlers.onSubmit(this.props.strokes) }>提交</Button>
                </Col>
              </Row>
            </Loader>
          </Loader>
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state){
  return {
    strokes: state.strokes
  }
}

export default connect(mapStateToProps)(StrokesEditor)
