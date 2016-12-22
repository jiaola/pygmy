import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import createjs from "createjs"

class EaselPainter extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    // Init CreateJS
    var canvas = ReactDOM.findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);

    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    this.stage.addChild(circle);
    this.stage.update();
  }

  render() {
    return <canvas ref="canvas"
         width={this.props.width}
         height={this.props.height}></canvas>
  }
}

EaselPainter.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default EaselPainter
