import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'
import createjs from "createjs"

class EaselPainter extends React.Component {
  constructor(props) {
    super(props)
    this.scale = this.scale.bind(this)
    this.draw = this.draw.bind(this)
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    if (this.props.strokes == null ) {
      return;
    }
    // Init CreateJS
    var canvas = ReactDOM.findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);

    var strokes = this.props.strokes.Stroke
    for (var i = 0; i < strokes.length; i++) {
      if (this.props.hStrokes.indexOf(i) < 0) { // not highlighted
        this.stage.addChild(this.drawStroke(strokes[i], this.props.color))
      }
    }
    for (var i = 0; i < this.props.hStrokes.length; i++) {
      var h = this.props.hStrokes[i]
      this.stage.addChild(this.drawStroke(strokes[h], this.props.hColor))
    }
    this.stage.update()
  }

  // draw a single stroke
  drawStroke(stroke, color) {
    var shape = new createjs.Shape()
    shape.graphics.beginFill(color)
    for (var i = 0; i < stroke.Outline.length; i++) {
      var v = stroke.Outline[i]
      if (v.name == 'MoveTo') {
        shape.graphics.moveTo(this.scale(v.x), this.scale(v.y))
      } else if (v.name == 'LineTo') {
        shape.graphics.lineTo(this.scale(v.x), this.scale(v.y))
      } else if (v.name == 'QuadTo') {
        shape.graphics.quadraticCurveTo(this.scale(v.x1), this.scale(v.y1), this.scale(v.x2), this.scale(v.y2))
      }
    }
    shape.graphics.closePath()
    return shape
  }

  scale(x) {
    return x * this.props.length / 2048.0
  }

  render() {
    return <canvas ref="canvas"
         width={this.props.length}
         height={this.props.length}></canvas>
  }
}

EaselPainter.propTypes = {
  strokes: PropTypes.object,
  length: PropTypes.number.isRequired,
  color: PropTypes.string,
  hColor: PropTypes.string,
  hStrokes: PropTypes.array
}

EaselPainter.defaultProps = {
  length: 50,
  color: 'black',
  hColor: 'red',
  hStrokes: []
}

export default EaselPainter
