import React, { PropTypes } from 'react';

import Stroke from './Stroke';

const Strokes = ({ strokes, color, length}) => (
    <g>{strokes.map( (stroke, index) =>
        <Stroke key={index} color={color} length={length} shape={stroke} />
        )}
    </g>
)


export default Strokes
