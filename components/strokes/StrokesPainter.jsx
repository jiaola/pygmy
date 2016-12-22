import React, { PropTypes } from 'react'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import Strokes from './Strokes'

const StrokesPainter = ({ strokes, config }) => {
  if (strokes.get('strokes') != null) {
    return   <svg width={config.length}
        height={config.length}
        ref="svg">
        <Strokes strokes={strokes.get('strokes').Stroke} config={config} />
      </svg>
  } else {
    return <div></div>
  }
}

Strokes.propTypes = {
    strokes: PropTypes.array.isRequired,
    config: PropTypes.shape ({
      length: PropTypes.number.isRequired,
      color: PropTypes.string,
      hColor: PropTypes.string,
      hIndex: PropTypes.number
    })
}

export default StrokesPainter
