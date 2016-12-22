import React, { PropTypes } from 'react';

import Stroke from './Stroke';

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

export default Strokes
