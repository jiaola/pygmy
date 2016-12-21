import React, { PropTypes } from 'react'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import Strokes from './Strokes'

const StrokesPainter = ({ strokes, color, length }) => {
  console.log('strokes', strokes.get('strokes'))
  if (strokes.get('strokes') != null) {
    console.log('draw svg')
    return   <svg width={length}
        height={length}
        ref="svg">
        <Strokes strokes={strokes.get('strokes').Stroke} color={color} length={length} />
      </svg>
  } else {
    console.log('not draw svg')
    return <div></div>
  }
}

StrokesPainter.propTypes = {
    strokes: PropTypes.object.isRequired,
    length: PropTypes.number,
    color: PropTypes.string
}

StrokesPainter.defaultProps = {
  color: 'black',
  length: 200
}

export default StrokesPainter
