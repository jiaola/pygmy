import React from 'react'
import { connect } from 'react-redux'
import StrokesPainter from './StrokesPainter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import { sortable } from 'react-sortable'

import { requestStrokes } from '../../actions'
import NewChar from '../shared/NewChar'

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div {...this.props} className="list-item">{this.props.children}</div>)
  }
}

var SortableListItem = sortable(ListItem)

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
    this.updateState = this.updateState.bind(this)

    this.state = {
      draggingIndex: null,
      data: this.props.strokes.get('strokes')
    }
  }

  updateState(obj) {
    this.setState(obj)
  }

  render() {
    var childProps = { className: 'myClass1' }
    if (this.props.strokes.get('strokes') != null) {
      var listItems = this.props.strokes.get('strokes').Stroke.map(function(s, i) {
        var config = {
          color: 'black',
          length: 100,
          hColor: 'red',
          hIndex: i
        }
        return (
          <SortableListItem
            key={i}
            updateState={this.updateState}
            items={this.props.strokes.get('strokes').Stroke}
            draggingIndex={this.state.draggingIndex}
            sortId={i}
            outline="list"
            childProps={childProps}
            ><StrokesPainter strokes={this.props.strokes} config={config} /></SortableListItem>
        )
      }, this)
    }
    return (
      <Container>
        <NewChar onChange={ (e) => this.handlers.onNewChar(e) } />
        <div className="list">{listItems}</div>
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
