import React, { PropTypes } from 'react'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'

const Stroke = ({ shape, length, color }) => {
  return   <path d={ shape.Outline.map( s => {
        if (s.name === 'MoveTo') {
          return `M${scale(s.x, length)} ${scale(s.y, length)}`
        } else if (s.name === 'QuadTo') {
          return `Q ${scale(s.x1, length)} ${scale(s.y1, length)}, ${scale(s.x2, length)} ${scale(s.y2, length)}`
        } else if (s.name === 'LineTo') {
          return `L ${scale(s.x, length)} ${scale(s.y, length)}`
        }
        return ''
      })} fill={color}/>
}


Stroke.propTypes = {
    shape: PropTypes.object.isRequired,
    length: PropTypes.number,
    color: PropTypes.string
}

Stroke.defaultProps = {
  length: 100,
  color: 'black'
}

var scale = (x, l) => {
  return x * l / 2048.0
}

const Strokes = ({ strokes, config}) => (
    <g>{strokes.map( (stroke, index) =>
        <Stroke key={index} shape={stroke} length={config.length} color={ index === config.hIndex ? config.hColor : config.color}/>
        )}
    </g>
)

Strokes.propTypes = {
    strokes: PropTypes.array.isReqired,
    config: PropTypes.shape ({
      length: PropTypes.number.isRequired,
      color: PropTypes.string,
      hColor: PropTypes.string,
      hIndex: PropTypes.number
    })
}


const SvgPainter = ({ strokes, config }) => {
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

export default SvgPainter
