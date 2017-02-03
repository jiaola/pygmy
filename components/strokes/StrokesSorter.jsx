import React, { PropTypes } from "react"
import Sortable from 'sortablejs'
import { CDN_ROOT } from '../../constants'

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
    let listItems = null
    let badge = null
    if (this.props.strokes != null) {
      if (this.props.strokes.attributes.order) {
        badge = <p><span className="label label-success">已编辑</span></p>
        listItems = this.props.strokes.attributes.order.map(function(i) {
          return (
            <img src={`${CDN_ROOT}/images/strokes/${this.props.strokes.attributes.unicode}/${i}_50.gif`} width={50} height={50} key={i} data-index={i}/>
          )
        }, this)
      } else {
        badge = <p><span className="label label-danger">未编辑</span></p>
        listItems = this.props.strokes.attributes.stroke.map(function(s, i) {
          return (
            <img src={`${CDN_ROOT}/images/strokes/${this.props.strokes.attributes.unicode}/${i}_50.gif`} width={50} height={50} key={i} data-index={i}/>
          )
        }, this)
      }
    }
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        <div>{ badge }</div>
        <div className="group">
          <div className="group-list" ref={this.sortableGroupDecorator}>
            { listItems }
          </div>
        </div>
      </div>
    )
  }
}

StrokesSorter.propTypes = {
  strokes: PropTypes.object,
  onSort: PropTypes.func,
}

export default StrokesSorter
