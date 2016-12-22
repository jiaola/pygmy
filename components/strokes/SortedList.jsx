import React from 'react';
import { sortable } from 'react-sortable';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div {...this.props} className="list-item">{this.props.children}</div>)
  }
}

var SortableListItem = sortable(ListItem);

class SortableList extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this)
    this.state = {
      draggingIndex: null,
      data: {
        items: [
          "Gold",
          "Crimson",
          "Hotpink",
          "Blueviolet",
          "Cornflowerblue"
        ]
      }
    }
  }

  updateState(obj) {
    console.log('updateState', obj)
    this.setState(obj);
  }

  render() {
    var childProps = { className: 'myClass1' };
    var listItems = this.state.data.items.map(function(item, i) {
      return (
        <SortableListItem
          key={i}
          updateState={this.updateState}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list"
          childProps={childProps}
          >{item}</SortableListItem>
      );
    }, this);

    return (
          <div className="list">{listItems}</div>
    )
  }
}
export default SortableList
