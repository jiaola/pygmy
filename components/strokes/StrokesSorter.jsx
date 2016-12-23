import * as React from "react";
import Sortable from 'sortablejs';
import { connect } from 'react-redux'
import EaselPainter from './EaselPainter'
import { API_ROOT } from '../../actions'

class StrokesSorter extends React.Component {
  constructor(props) {
    super(props);
  }

  sortableContainersDecorator(componentBackingInstance) {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        handle: ".group-title" // Restricts sort start click/touch to the specified element
      };
      Sortable.create(componentBackingInstance, options);
    }
  }

  sortableGroupDecorator(componentBackingInstance) {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: "img", // Specifies which items inside the element should be sortable
        group: "shared"
      };
      Sortable.create(componentBackingInstance, options);
    }
  }

  render() {
    console.log('strokes: ', this.props.strokes);
    var strokes = this.props.strokes.get('strokes')
    if (strokes != null) {
      var listItems = this.props.strokes.get('strokes').Stroke.map(function(s, i) {
        return (
          <img src={`${API_ROOT}/assets/strokes/${strokes.unicode.substring(2,6)}/${i}_50.gif`} width={50} height={50} key={i}/>
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


const mapStateToProps = function(state){
  return {
    strokes: state.strokes
  }
}

export default connect(mapStateToProps)(StrokesSorter)
