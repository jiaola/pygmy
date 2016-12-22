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

class StrokesSorter extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this)

    this.state = {
      draggingIndex: null,
      data: {
        items: [0, 1, 2, 3, 4]
      }
    }
  }

  updateState(obj) {
    console.log('updateState', obj, this.state)
    this.setState(obj)
  }

  render() {
    var childProps = { className: 'myClass1' }
    if (this.props.strokes.get('strokes') != null) {
      var listItems = this.props.strokes.get('strokes').Stroke.map(function(s, i) {
        var config = {
          color: 'black',
          length: 50,
          hColor: 'red',
          hIndex: i
        }
        return (
          <SortableListItem
            key={i}
            updateState={this.updateState}
            items={this.state.data.items}
            draggingIndex={this.state.draggingIndex}
            sortId={i}
            outline="list"
            childProps={childProps}
            ><StrokesPainter strokes={this.props.strokes} config={config} /></SortableListItem>
        )
      }, this)
    }
    return (
      <div className="list">{listItems}</div>
    )
  }
}


const mapStateToProps = function(state){
  return {
    strokes: state.strokes
  }
}

export default connect(mapStateToProps)(StrokesSorter)
