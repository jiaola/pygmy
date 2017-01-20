import React, {PropTypes} from "react";
import { connect } from 'react-redux'
import EaselPainter from '../strokes/EaselPainter'
import { CDN_ROOT } from '../../actions'

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
      if (this.props.strokes.attributes.hasOwnProperty('order')) {
        listItems = this.props.strokes.attributes.order.map(function(i) {
          let style = this.props.picked.includes(i) ? { border: '1px solid red'} : {}
          return (
            <li className="list-inline-item" key={i}>
              <img src={`${CDN_ROOT}/images/strokes/${this.props.strokes.attributes.unicode}/${i}_50.gif`} width={50} height={50} key={i} data-index={i} onClick={ this.handleSelectStroke } style={ style }/>
            </li>
          )
        }, this)
      } else {
        listItems = this.props.strokes.attributes.stroke.map(function(s, i) {
          let style = this.props.picked.includes(i) ? { border: '1px solid red'} : {}
          return (
            <li className="list-inline-item" key={i}>
              <img src={`${CDN_ROOT}/images/strokes/${this.props.strokes.attributes.unicode}/${i}_50.gif`} width={50} height={50} key={i} data-index={i} onClick={ this.handleSelectStroke } style={ style }/>
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
