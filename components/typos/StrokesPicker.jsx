import React, {PropTypes} from "react";
import { connect } from 'react-redux'
import EaselPainter from '../strokes/EaselPainter'
import { API_ROOT } from '../../actions'

class StrokesPicker extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
    if (this.props.strokes != null) {
      var listItems = this.props.strokes.Stroke.map(function(s, i) {
        return (
          <li className="list-inline-item" key={i}>
            <img src={`${API_ROOT}/assets/strokes/${this.props.strokes.unicode.substring(2,6)}/${i}_50.gif`} width={50} height={50} key={i} data-index={i}/>
          </li>
        )
      }, this)
    }
    return (
      <div className="container">
        <ul className="list-inline">
          {listItems}
        </ul>
      </div>
    )
  }
}

StrokesPicker.propTypes = {
  strokes: PropTypes.object
}

export default StrokesPicker
