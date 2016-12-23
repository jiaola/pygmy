import React, {PropTypes} from "react";
import Sortable from 'sortablejs';
import { connect } from 'react-redux'
import EaselPainter from './EaselPainter'
import { API_ROOT } from '../../actions'

class StrokesSorter extends React.Component {
  constructor(props) {
    super(props);
    this.sortableGroupDecorator = this.sortableGroupDecorator.bind(this)
  }

  sortableContainersDecorator(componentBackingInstance) {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        handle: ".group-title" // Restricts sort start click/touch to the specified element
      }
      Sortable.create(componentBackingInstance, options)
    }
  }


  sortableGroupDecorator(componentBackingInstance) {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: "img", // Specifies which items inside the element should be sortable
        group: "shared",
        onSort: (e) => {
          var order = [].slice.call(e.to.children).map((img) => (parseInt(img.dataset.index)))
          if (typeof this.props.onSort === 'function') {
            this.props.onSort(order)
          }
        }
      }
      Sortable.create(componentBackingInstance, options)
    }
  }

  render() {
    if (this.props.strokes != null) {
      var listItems = this.props.strokes.Stroke.map(function(s, i) {
        return (
          <img src={`${API_ROOT}/assets/strokes/${this.props.strokes.unicode.substring(2,6)}/${i}_50.gif`} width={50} height={50} key={i} data-index={i}/>
        )
      }, this)
    }
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        <div className="group">
          <div className="group-list" ref={this.sortableGroupDecorator}>
            {listItems}
          </div>
        </div>
      </div>
    )
  }
}

StrokesSorter.propTypes = {
  strokes: PropTypes.object.isRequired,
  onSort: PropTypes.func
}

export default StrokesSorter
