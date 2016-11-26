import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import { connect } from 'react-redux'
import * as d3 from 'd3'

class StrokePainter extends React.Component {
  render() {
    var list = ReactFauxDOM.createElement('ul')

    var div = d3.select(list).append("div");
    div.html("Hello, world!");
    // d3.select(list)
    //   .selectAll('li')
    //   .data(this.props.data) // 1, 2, 3...
    //   .enter()
    //   .append('li')
    //   .text(function (d) {
    //     return d
    //   })

    return list.toReact()
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    strokes: []
  }
}

export default connect(mapStateToProps)(StrokePainter)
