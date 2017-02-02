import React, {PropTypes} from "react";
import { CDN_ROOT } from '../../actions'

class StrokesPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelectStroke = (e) => {
    this.props.onSelectStroke(parseInt(e.target.dataset.index))
  }

  render() {
    if (this.props.strokes == null) return null
    let order = this.props.strokes.attributes.order == null ?
      [...Array(this.props.strokes.attributes.stroke.length).keys()] :
      this.props.strokes.attributes.order.map((i) => parseInt(i))

    let listItems = order.map(function(i) {
      let style = this.props.picked.includes(i) ? { border: '1px solid red'} : {}
      return (
        <li className="list-inline-item" key={i}>
          <img src={`${CDN_ROOT}/images/strokes/${this.props.strokes.attributes.unicode}/${i}_50.gif`} width={50} height={50} key={i} data-index={i} onClick={ this.onSelectStroke } style={ style }/>
        </li>
      )
    }, this)
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
