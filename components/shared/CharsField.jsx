import React, { PropTypes } from 'react'
import { FormGroup, Input, Label, Col, Button } from 'reactstrap'
import Immutable from 'immutable'

class CharsField extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.hasChars = this.hasChars.bind(this)
    this.state = Immutable.Map({
      chars: ''
    })
  }

  handleKeyUp(e) {
    if(e.keyCode == 13) { // return key is pressed
      this.props.onAddChars(this.getChars(this.state.get('chars')))
      this.state = this.state.set('chars', '')
      this.charsField.value = ''
    }
  }

  handleChange(e) {
    this.state = this.state.set('chars', e.target.value)
  }

  handleAddClick() {
    var chars = this.getChars(this.state.get('chars'))
    this.props.onAddChars(chars)
    this.charsField.value = ''
  }

  handleDeleteClick() {
    this.state = this.state.set('chars', '')
    this.props.onDeleteChars()
  }

  getChars(chars) {
    chars = chars.replace(/ /g,'').split("")
    chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
    return chars
  }

  hasChars() {
    return this.state.get('chars').trim() != ''
  }

  render() {
    return (
      <FormGroup row>
        <Label sm={2}>添加生字</Label>
        <div className='col-sm-10'>
        <div className="input-group ">
        <input className='form-control' defaultValue={this.state.get('chars')} type="text" ref={(r) => this.charsField = r} onKeyUp={ this.handleKeyUp } onChange={ this.handleChange } placeholder="填写生字后按输入键（Return）。"/>
        <div className='input-group-btn'>
          <Button className='center-block' onClick={ this.handleAddClick }>添加</Button>
          <Button className='center-block' onClick={ this.handleDeleteClick }>清除</Button>
        </div>
        </div>
      </div>
      </FormGroup>
    )
  }
}

CharsField.propTypes = {
  onAddChars: PropTypes.func,
  onDeleteChars: PropTypes.func
}

export default CharsField
