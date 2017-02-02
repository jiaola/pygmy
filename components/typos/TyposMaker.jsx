import React from 'react'
import update from 'immutability-helper'
import { Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-advanced'
import Immutable from 'immutable'

import CharsField from '../../components/shared/CharsField'
import StrokesPicker from '../../components/typos/StrokesPicker'
import EaselPainter from '../../components/strokes/EaselPainter'
import Network from '../../utils/network'
import { charToHex } from '../../utils'

const initialState = {
  strokes: null,
  hidden: Immutable.Set([]),
  error: null,
  loading: false,
}

class TyposMaker extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onAddChars = (chars) => {
    this.setState({ loading: true, error: null })
    let resource = `characters/${charToHex(chars[0])}`
    let data = Network().get({ resource: resource })
    data.then(this.onCharFulfilled, this.onCharRejected)
  }

  onCharFulfilled = (char) => {
    let data = char.data
    this.setState({ strokes: data, loading: false, error: null, hidden: Immutable.Set([]) })
  }

  onCharRejected = (error) => {
    this.setState({ error: error, loading: false })
  }

  onDeleteChars = (chars) => {
    this.setState(initialState)
  }

  onSelectStroke = (index) => {
    let hidden = this.state.hidden
    if (hidden.includes(index)) {
      this.setState({ hidden: hidden.delete(index) })
    } else {
      this.setState({ hidden: hidden.add(index) })
    }
  }

  hideStrokes(strokes, hidden) {
    if (strokes == null) return null
    let clone = JSON.parse(JSON.stringify(strokes))
    clone.attributes = update(clone.attributes, {stroke: {$apply: (x) => x.filter((s, i) => ( !hidden.includes(i) ))}})
    return clone
  }

  render() {
    return (
      <div>
        <Row><Col><p>这个工具可以用来生成错字的图片。填好生字后按添加键，然后在出现的笔顺中点击选择要隐藏的笔画，在右边的框中会出现错字。右键点击错字可以下载图片。</p></Col></Row>
        <Loader show={ this.state.loading } message='loading'>
          <Row>
            <Col>
              <CharsField onAddChars={ this.onAddChars } onDeleteChars={ this.onDeleteChars } error={ this.state.error } />
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <StrokesPicker strokes={ this.state.strokes } onSelectStroke={ this.onSelectStroke } picked={ this.state.hidden }/>
            </Col>
            <Col sm={4}>
              <EaselPainter strokes={ this.hideStrokes(this.state.strokes, this.state.hidden) } length={200} />
            </Col>
          </Row>
        </Loader>
      </div>
    )
  }
}

export default TyposMaker
