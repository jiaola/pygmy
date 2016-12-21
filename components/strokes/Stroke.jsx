import React, { PropTypes } from 'react'

const Stroke = ({ shape, length, color }) => {
  console.log('shape:', shape)
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
    length: PropTypes.number.isRequired,
    color: PropTypes.string
}

Stroke.defaultProps = {
  color: 'black'
}

var scale = (x, l) => {
  console.log(x * l / 2048.0)
  return x * l / 2048.0
}

export default Stroke
