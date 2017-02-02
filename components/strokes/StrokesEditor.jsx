import React, { PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Loader from 'react-loader-advanced'

import CharsField from '../../components/shared/CharsField'
import StrokesSorter from '../../components/strokes/StrokesSorter'

import Network from '../../utils/network'
import { charToHex } from '../../utils'

const initialState = {
  strokes: null,
  order: [],
  error: null,
  loading: false,
}

class StrokesEditor extends React.Component {
  constructor(props) {
    super(props);
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
    let N = data.attributes.stroke.length
    let order = Array.apply(null, {length: N}).map(Number.call, Number)
    this.setState({ strokes: data, loading: false, error: null, order: order })
  }

  onCharRejected = (error) => {
    this.setState({ error: error, loading: false })
  }

  onDeleteChars = (chars) => {
    this.setState(initialState)
  }

  onSort = (order) => {
    this.setState({ order: order })
  }

  onSubmit = (strokes, order) => {
    this.setState(initialState)
    this.props.onSubmit(strokes, order)
  }

  render() {
    return (
      <div>
        <Row><Col><p>我们的字库里很多字的笔顺不正确，需要您的帮助。请在下面填一个中文字后按“添加”，然后用鼠标将笔画的图片按正确的次序排好。提交后您编辑的笔顺将被储存。如果笔顺已经被编辑过，请核查是否正确。谢谢！</p></Col></Row>
        <Loader show={ this.state.loading } message='Loading'>
          <Row>
            <CharsField onAddChars={ this.onAddChars } onDeleteChars={ this.onDeleteChars } error={ this.state.error }/>
            <StrokesSorter strokes={this.state.strokes} onSort={this.onSort}/>
          </Row>
          <Row>
            <Col sm={12} className="text-center">
              <Button className='center-block btn-primary btn' style={ { marginTop: '10px' }} disabled={ this.state.strokes === null } onClick={ e => this.onSubmit(this.state.strokes, this.state.order) }>提交</Button>
            </Col>
          </Row>
        </Loader>
      </div>
    )
  }
}

StrokesEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default StrokesEditor
