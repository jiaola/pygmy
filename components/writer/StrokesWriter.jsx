import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-advanced'

import CharsField from '../../components/shared/CharsField'
import EaselWriter from '../../components/writer/EaselWriter'
import { charToHex } from '../../utils'
import Network from '../../utils/network'

const initialState = {
  strokes: null,
  error: null,
  loading: false,
}

class StrokesWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  onAddChars = (chars) => {
    this.setState({ loading: true, error: null })
    let resource = `big5/${charToHex(chars[0])}`
    let data = Network().get({ resource: resource })
    data.then(this.onCharFulfilled, this.onCharRejected)
  }

  onCharFulfilled = (char) => {
    let data = char.data
    this.setState({ strokes: data, loading: false, error: null })
  }

  onCharRejected = (error) => {
    this.setState({ error: error, loading: false })
  }

  onDeleteChars = (chars) => {
    this.setState(initialState)
  }

  render() {
    return (
      <div>
        <Row><Col><p>这个工具可以用来练习写字，或观看笔顺。填好生字后按添加键，然后描红或者按“观看笔顺”。</p></Col></Row>
        <Loader show={ this.state.loading } message='loading'>
          <Row>
            <Col>
              <CharsField onAddChars={ this.onAddChars } onDeleteChars={ this.onDeleteChars } error={ this.state.error } />
            </Col>
          </Row>
          <Row>
            <Col>
              <EaselWriter strokes={ this.state.strokes } length={ 200 }></EaselWriter>
            </Col>
          </Row>
        </Loader>
      </div>
    )
  }
}

export default StrokesWriter
