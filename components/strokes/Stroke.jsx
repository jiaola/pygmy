import React, { PropTypes } from 'react'

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

export default Stroke
