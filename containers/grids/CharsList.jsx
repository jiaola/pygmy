import React, { PropTypes } from 'react'
import { Grid, FormGroup, Col } from 'react-bootstrap'
import Immutable from 'immutable'
import Loader from 'react-loader-advanced'
import CharsField from '../../components/shared/CharsField'
import CharEditor from '../../components/grids/CharEditor'
import Network from '../../utils/network'
import { charsToQuery } from '../../utils'

let initialState = {
    chars: Immutable.List([]),
    loading: false,
    error: null,
  }

class CharList extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  onAddChars = (chars) => {
    if (chars === undefined || chars.length == 0) {
      this.setState({ error: '请填写中文字符' })
    } else {
      this.setState({ loading: true, error: null })
      let data = Network().get({ resource: 'pinyins', query: charsToQuery(chars) })
      data.then(this.onCharsFulfilled, this.onCharsRejected)
    }
  }

  onCharsFulfilled = (chars) => {
    for (var i = 0; i < chars.length; i++) {
      let char = chars[i]
      char.selectedPinyin = char.pinyin[0]
      this.setState({ chars: this.state.chars.push(Immutable.Map(char))})
    }
    this.setState({ loading: false, error: null })
  }

  onCharsRejected = (error) => {
    if (error instanceof Error) {
      this.setState({ loading: false, error: error.message })
    } else {
      this.setState({ loading: false, error: error})
    }
  }

  onDeleteChars = () => {
    this.setState({ chars: Immutable.List([]), loading: false, error: null})
  }

  onDeleteChar = (index) => {
    this.setState({ chars: this.state.chars.filter((char, i) => i !== index)})
  }

  onSetPinyin = (index, pinyin) => {
    this.setState({ chars: this.state.chars.update(index, (char) => char.set('selectedPinyin', pinyin)) })
  }

  reset = () => {
    this.setState(initialState)
    this.charsField.reset()
  }

  getChars = () => {
    return this.state.chars
  }

  render() {
    return (
      <Loader show={ this.state.loading }  message={ 'loading' }>
        <FormGroup>
          <CharsField onAddChars={ this.onAddChars } onDeleteChars={ this.onDeleteChars } ref={ (c) => { this.charsField = c } }/>
          <Col sm={10} smOffset={2}><span className="text-danger">{ this.state.error }</span></Col>
        </FormGroup>
        <Grid style={{ paddingTop: '40px' }}>
          {this.state.chars.map((char, index) =>
            <CharEditor index={ index } key={ index } char={ char } onDeleteChar={ this.onDeleteChar } onSetPinyin={ this.onSetPinyin }/>
          )}
        </Grid>
      </Loader>
    )
  }
}

export default CharList
