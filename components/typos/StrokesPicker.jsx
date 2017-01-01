import React, {PropTypes} from "react";
import { connect } from 'react-redux'
import EaselPainter from '../strokes/EaselPainter'
import { API_ROOT } from '../../actions'

class StrokesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectStroke = this.handleSelectStroke.bind(this)
  }

  handleSelectStroke(e) {
    this.props.onSelectStroke(e.target.dataset.index)
  }

  render() {
    let listItems = null
    if (this.props.strokes != null) {
      if (this.props.strokes.hasOwnProperty('order')) {
        listItems = this.props.strokes.order.map(function(i) {
          let style = this.props.picked.includes(i) ? { border: '1px solid red'} : {}
          return (
            <li className="list-inline-item" key={i}>
              <img src={`${API_ROOT}/assets/strokes/${this.props.strokes.unicode.substring(2,6)}/${i}_50.gif`} width={50} height={50} key={i} data-index={i} onClick={ this.handleSelectStroke } style={ style }/>
            </li>
          )
        }, this)
      } else {
        listItems = this.props.strokes.Stroke.map(function(s, i) {
          let style = this.props.picked.includes(i) ? { border: '1px solid red'} : {}
          return (
            <li className="list-inline-item" key={i}>
              <img src={`${API_ROOT}/assets/strokes/${this.props.strokes.unicode.substring(2,6)}/${i}_50.gif`} width={50} height={50} key={i} data-index={i} onClick={ this.handleSelectStroke } style={ style }/>
            </li>
          )
        }, this)
      }
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
  strokes: PropTypes.object,
  picked: PropTypes.object,
  onSelectStroke: PropTypes.func
}

export default StrokesPicker
