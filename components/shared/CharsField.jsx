import React, { PropTypes } from 'react'
import { FormGroup, Input, ControlLabel, Col, Button } from 'react-bootstrap'
import Immutable from 'immutable'

class CharsField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chars: ''
    }
  }

  onKeyUp = (e) => {
    if(e.keyCode == 13) { // return key is pressed
      e.preventDefault()
      let chars = this.getChars(this.state.chars)
      this.setState({ chars: '' })
      this.charsField.value = ''
      this.props.onAddChars(chars)
    }
  }

  onChange = (e) =>  {
    this.setState({ chars: e.target.value })
  }

  onClickAdd = (e) => {
    e.preventDefault()
    var chars = this.getChars(this.state.chars)
    this.charsField.value = ''
    this.props.onAddChars(chars)
  }

  onClickDelete = () => {
    this.setState({ chars: '' })
    this.props.onDeleteChars()
  }

  getChars = (chars) => {
    chars = chars.replace(/ /g,'').split("")
    chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
    return chars
  }

  hasChars = () => {
    return this.state.chars.trim() != ''
  }

  reset = () => {
    this.setState({ chars: '' })
    this.charsField.value = ''
  }

  render() {
    return (
      <div>
        <Col sm={2}><ControlLabel>添加生字</ControlLabel></Col>
        <Col sm={10}>
          <div className="input-group ">
            <input className='form-control' defaultValue={ this.state.chars } type="text" ref={(r) => this.charsField = r} onKeyUp={ this.onKeyUp } onChange={ this.onChange } placeholder="填写生字后按输入键（Return）。" />
            <div className='input-group-btn'>
                <Button onClick={ this.onClickAdd }>添加</Button>
            </div>
            <div className='input-group-btn'>
                <Button onClick={ this.onClickDelete }>清除</Button>
            </div>
          </div>
        </Col>
      </div>
    )
  }
}

CharsField.propTypes = {
  onAddChars: PropTypes.func,
  onDeleteChars: PropTypes.func
}

export default CharsField
