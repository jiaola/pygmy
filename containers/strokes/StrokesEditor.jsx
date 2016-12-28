import React from 'react'
import { connect } from 'react-redux'
//import StrokesSorter from './StrokesSorter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import Loader from 'react-loader-advanced'
import { requestStrokes, receiveStrokesResponse, deleteChars, sendStrokesRequest } from '../../actions/strokesActions'
import CharsField from '../../components/shared/CharsField'
import StrokesSorter from '../../components/strokes/StrokesSorter'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(sendStrokesRequest())
      dispatch(requestStrokes(chars[0], receiveStrokesResponse))
    }
  }

  let onDeleteChars = function(chars) {
    dispatch(deleteChars())
  }

  let onSort = function(order) {
    console.log('onSort: ', order)
  }

  return {
    onAddChars,
    onDeleteChars,
    onSort
  }
}

class StrokesEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch)
  }

  render() {
    return (
      <Container>
        <Row><Col><h1>笔顺</h1></Col></Row>
        <Loader show={ !this.props.strokes.get('strokesLoaded') } message='Loading'>
          <CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars } />
          <StrokesSorter strokes={this.props.strokes.get('strokes')} onSort={this.handlers.onSort}/>
        </Loader>
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
