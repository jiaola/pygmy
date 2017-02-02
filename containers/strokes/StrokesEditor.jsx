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
import Network from '../../utils/network'
import { charToHex } from '../../utils'

const initialState = {
  strokes: null,
  error: null,
  loading: false,
}

class StrokesEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  onAddChars = (chars) => {
    this.setState({ loading: true, error: null })
    let resource = `characters/${charToHex(chars[0])}`
    let data = Network().get({ resource: resource })
    data.then(this.onCharFulfilled, this.onCharRejected)
  }

  onCharFulfilled = (char) => {
    let data = char.data
    let N = data.attributes.stroke.length
    let order = Array.apply(null, {length: N}).map(Number.call, Number)
    this.setState({ strokes: data, loading: false, error: null })
    this.props.dispatch(strokesActions.sortStrokes(order))
  }

  onCharRejected = (error) => {
    this.setState({ error: error, loading: false })
  }

  onDeleteChars = (chars) => {
    this.props.dispatch(strokesActions.deleteChars())
  }

  onSort = (order) => {
    this.props.dispatch(strokesActions.sortStrokes(order))
  }

  onSubmit = (strokes, order) => {
    this.setState(initialState)
    this.props.dispatch(strokesActions.submitSort(strokes, order))
  }

  onErrorsDismiss = () => {
    this.props.dispatch(sharedActions.deleteErrors(StrokesActionTypes.STROKES))
  }

  onMessagesDismiss = () => {
    this.props.dispatch(sharedActions.deleteMessages(StrokesActionTypes.STROKES))
  }

  render() {
    return (
      <DocumentTitle title={`笔顺编辑`}>
        <Grid>
          <Row><Col><h1>笔顺</h1><hr/></Col></Row>
          <Loader show={ this.props.strokes.get('loading') } message='Submitting'>
            <Row><Col><Alerts type='danger' messages={ this.props.strokes.get('errors') } onDismiss={ this.onErrorsDismiss }/></Col></Row>
            <Row><Col><Alerts type='info' messages={ this.props.strokes.get('messages') } onDismiss={ this.onMessagesDismiss }/></Col></Row>
            <Row><Col><p>我们的字库里很多字的笔顺不正确，需要您的帮助。请在下面填一个中文字后按“添加”，然后用鼠标将笔画的图片按正确的次序排好。提交后您编辑的笔顺将被储存。如果笔顺已经被编辑过，请核查是否正确。谢谢！</p></Col></Row>

            <Loader show={ this.state.loading } message='Loading'>
              <Row>
              <CharsField onAddChars={ this.onAddChars } onDeleteChars={ this.onDeleteChars } error={ this.state.error }/>
              <StrokesSorter strokes={this.state.strokes} onSort={this.onSort}/>
              </Row>
              <Row>
                <Col sm={12} className="text-center">
                  <Button className='center-block btn-primary btn' style={ { marginTop: '10px' }} disabled={ this.state.strokes === null } onClick={ e => this.onSubmit(this.state.strokes, this.props.strokes.get('order')) }>提交</Button>
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
