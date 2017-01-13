import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'
import createjs from "createjs"
import Immutable from 'immutable'

let initialState = Immutable.Map({
  character: null,
  userStrokeIndex: 0,
  strokeHints: Immutable.List([]),
  aniTrackIndex: 0,  /* index of the current animation track */
  aniStrokeIndex: 0, /* index of the current stroke index */
  aniStrokeEnd: -1,
  moveCount: 0,
  moveTotal: 0,
  beforeShowStrokeNum: 0,
  aniX: 0.0
})

let DollarRecognizer = function() {
  //
  // one built-in unistroke per gesture type
  //
  var Unistrokes = []

  this.scoreGesture = function(index, points, useProtractor) {
    points = Resample(points, NumPoints)
    var radians = IndicativeAngle(points)
    points = RotateBy(points, -radians)
    points = ScaleTo(points, SquareSize)
    points = TranslateTo(points, Origin)
    var vector = Vectorize(points) // for Protractor
    var score
    if (useProtractor) {
      score = OptimalCosineDistance(Unistrokes[index].Vector, vector)
    } else {
      score = DistanceAtBestAngle(points, Unistrokes[index], -AngleRange, +AngleRange, AnglePrecision)
    }
    return score
  };

  this.AddGesture = function(name, points)
  {
    Unistrokes.push(new Unistroke(name, points));
  };

  this.DeleteUserGestures = function()
  {
    Unistrokes = [];
  };
};

class EaselWriter extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.recognizor = new DollarRecognizer()
  }

  // helpers
  aniStroke = () => {
    return this.state.get('character').Stroke[this.state.get('aniStrokeIndex')]
  }

  componentDidMount() {
    this.draw()
    this.showAllStrokes()
  }

  componentDidUpdate() {
    this.draw()
    this.showAllStrokes()
  }

  touchStart = (event) => {

  }

  touchEnd = (event) => {

  }

  clear = () => {
    this.stage.clear()
    this.stage.removeAllChildren()
    this.recognizor.DeleteUserGestures()
    this.strokeHints = []
    this.character = null
    this.userStrokeIndex = 0
  }

  /**
   * Stops the animation
   */
  stopAnimation = () => {
    if (!createjs.Ticker.hasEventListener('tick')) return
    createjs.Ticker.removeEventListener('tick', this.animateStroke)
    this.stage.autoClear = true
    while (this.stage.getNumChildren() > this.state.get('beforeShowStrokeNum')) {
      this.stage.removeChildAt(this.stage.getNumChildren()-1)
    }
    this.stage.mask = null
    this.stage.update()
    this.stage.autoClear = false
  }

  showAllStrokes = () => {
    let character = this.props.strokes
    if (character === null) {
      return
    }
    this.showStrokes(0, character.Stroke.length-1)
  }

  /**
   * Shows strokes with stroke number from start to end
   */
  showStrokes = (start, end) => {
    let character = this.props.strokes
    if (character === null || end >= character.Stroke.length) {
      return
    }
    this.stopAnimation()
    this.state = this.state.set('aniTrackIndex', 0).set('aniStrokeEnd', end).set('aniStrokeIndex', start).set('moveCount', 0)

    this.state = this.state.set('beforeShowStrokeNum', this.stage.getNumChildren())
    createjs.Ticker.addEventListener('tick', this.animateStroke)
  }

  animateStroke = (event) => {
    let character = this.props.strokes
    if (character === null) {
      this.stopAnimation()
    }

    let aniTrackIndex = this.state.get('aniTrackIndex')
    let aniStrokeIndex = this.state.get('aniStrokeIndex')
    let tracks = character.Stroke[aniStrokeIndex].Track
    let moveCount = this.state.get('moveCount')

    if (aniTrackIndex === tracks.length - 1) { // last track
      this.state = this.state.update('aniStrokeIndex', v => v + 1).set('aniTrackIndex', 0).set('moveCount', 0)
      if (aniStrokeIndex == this.state.get('aniStrokeEnd')) { // all strokes are done
        this.stopAnimation()
      }
      return
    }

    if (aniTrackIndex === 0 && this.state.get('moveCount') === 0) { // a new stroke
      this.stage.mask = this.drawStroke(character.Stroke[aniStrokeIndex])
      this.stage.addChild(this.drawStroke(character.Stroke[aniStrokeIndex]))
      this.stage.update()
    }

    var x0 = this.scale(tracks[aniTrackIndex].x);
    var y0 = this.scale(tracks[aniTrackIndex].y);
    var x1 = this.scale(tracks[aniTrackIndex+1].x);
    var y1 = this.scale(tracks[aniTrackIndex+1].y);
    let slope = (y1-y0)/(x1-x0)
    let moveDirectionX, xInterval
    if (moveCount === 0) {
      var xTotal = Math.ceil(Math.abs(x1-x0)/(this.props.length * 0.05))
      var yTotal = Math.ceil(Math.abs(y1-y0)/(this.props.length * 0.05))
      this.state = this.state.set('aniX', x0).set('moveTotal', Math.max(xTotal, yTotal))
    }
    let moveTotal = this.state.get('moveTotal')
    let aniX = this.state.get('aniX'), aniY
    xInterval = Math.abs(x1-x0)/moveTotal
    if (xInterval != 0) {
      moveDirectionX = (x1-x0)/Math.abs(x1-x0)
      aniY = slope * (aniX-x0) + y0
    } else {
      moveDirectionX = 0
      aniY = moveCount * 200 * 0.4 * ((y1-y0)/Math.abs(y1-y0)) + y0
    }
    var circle = new createjs.Shape()
    circle.graphics.beginFill(this.props.color).drawCircle(aniX, aniY, this.scale(150))
    this.stage.addChild(circle)
    this.stage.update()
    this.state = this.state.update('aniX', v => v + xInterval * moveDirectionX)
    if (moveCount + 1 >= moveTotal) { // the last one
      this.state = this.state.set('moveCount', 0).set('aniX', x1).update('aniTrackIndex', v => v + 1)
    } else {
      this.state = this.state.update('moveCount', v => v + 1)
    }
  }

  draw = () => {
    if (this.props.strokes == null ) {
      if (this.stage != null) {
        this.stage.removeAllChildren()
        this.stage.update()
      }
      return
    }
    // Init CreateJS
    var canvas = ReactDOM.findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
    this.stage.autoClear = false
    this.stage.enableDOMEvents(true)
    createjs.Touch.enable(this.stage)
    createjs.Ticker.setFPS(16)

    this.stage.addEventListener('stagemousedown', this.touchStart)
    this.stage.addEventListener('stagemouseup', this.touchEnd)

    let character = null

    // variables for animate strokes
    let color, brushSize = 15, paintPoints = [], userStrokeStart = false

    var strokes = this.props.strokes.Stroke
    for (var i = 0; i < strokes.length; i++) {
      this.stage.addChild(this.drawStroke(strokes[i], 'black'))
    }
    this.stage.update()
  }

  // draw a single stroke
  drawStroke = (stroke, color) => {
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

  scale = (x) => {
    return x * this.props.length / 2048.0
  }

  render() {
    return <canvas ref="canvas"
         width={this.props.length}
         height={this.props.length}></canvas>
  }
}

EaselWriter.propTypes = {
  strokes: PropTypes.object,
  length: PropTypes.number.isRequired,
  color: PropTypes.string
}

EaselWriter.defaultProps = {
  length: 50,
  color: 'red'
}

export default EaselWriter
