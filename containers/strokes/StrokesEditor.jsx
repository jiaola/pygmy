import React from 'react'
import { connect } from 'react-redux'
//import StrokesSorter from './StrokesSorter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import { requestStrokes } from '../../actions/strokeActions'
import CharsField from '../../components/shared/CharsField'
import StrokesSorter from '../../components/strokes/StrokesSorter'

let createHandlers = function(dispatch) {
  let onAddChars = function(chars) {
    if (chars.length < 1) {
      // dispatch error message
    } else {
      dispatch(requestStrokes(chars[0]))
    }  
  }

  let onSort = function(order) {
    console.log('onSort: ', order)
  }
  return {
    onAddChars,
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
        <CharsField onAddChars={ this.handlers.onAddChars } />
        <StrokesSorter strokes={this.props.strokes.get('strokes')} onSort={this.handlers.onSort}/>
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
