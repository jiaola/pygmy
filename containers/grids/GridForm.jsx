import React from 'react'
import { connect } from 'react-redux'
//import StrokesSorter from './StrokesSorter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import { requestStrokes } from '../../actions/strokeActions'
import NewChar from '../../components/shared/NewChar'
import NumberField from '../../components/grids/NumberField'
import Email from '../../components/grids/Email'
import GridFormat from '../../components/grids/GridFormat'
import PrintOption from '../../components/grids/PrintOption'
import CharList from '../../components/grids/CharList'

import * as actions from '../../actions/gridActions'

let createHandlers = function(dispatch) {
  let onCharsPerRowChange = function(value) {
    dispatch(actions.setCharsPerRow(value))
  }

  let onEmailChange = function(value) {
    dispatch(actions.setEmail(value))
  }

  let onFormatChange = function(value) {
    dispatch(actions.setFormat(value))
  }

  let onGridsPerRowChange = function(value) {
    dispatch(actions.setGridsPerRow(value))
  }

  let onPrintPinyinChange = function(value) {
    dispatch(actions.setPrintPinyin(value))
  }

  let onPrintStrokesChange = function(value) {
    dispatch(actions.setPrintStrokes(value))
  }

  let onNewChar = function(e) {
    if(e.keyCode == 13) { // return key is pressed
      var chars = e.target.value.replace(/ /g,'').split("")
      chars = chars.filter(x => /^[\u4e00-\u9eff]$/i.exec(x) != null) // only Chinese characters
      for (var i = 0, len = chars.length; i < len; i++) {
        dispatch(actions.addChar(chars[i]))
      }
      dispatch(actions.fetchPinyin(chars))
      e.target.value = ''
    }
  }

  let onSubmit = function(state) {
    dispatch(actions.submitGrid(state.options, state.chars))
  }

  return {
    onCharsPerRowChange,
    onEmailChange,
    onFormatChange,
    onGridsPerRowChange,
    onPrintPinyinChange,
    onPrintStrokesChange,
    onNewChar,
    onSubmit
  }
}

class GridForm extends React.Component {
  constructor(props) {
    super(props)
    this.handlers = createHandlers(this.props.dispatch)
  }

  render() {
    return (
      <Container>
        <Row><Col><h1>田字格</h1></Col></Row>
        <Row>
            <Col xs='12' sm='3' md='3' lg='3'>
              <NumberField onChange={ this.handlers.onCharsPerRowChange } value={ this.props.charsPerRow } id={ 'chars_per_row' } label={ '每行生字数:' } tooltip={ '每一行生字的个数' }/>
            </Col>
            <Col xs='12' sm='3' md='3' lg='3'>
              <NumberField onChange={ this.handlers.onGridsPerRowChange } value={ this.props.gridsPerRow } id={ 'gridsPerRow' } label={ '每行格数:' } tooltip={ '每一行田字格的格数' }/>
            </Col>
            <Col xs='12' sm='6' md='6' lg='6'>
              <GridFormat onChange={ this.handlers.onFormatChange } value={ this.props.gridFormat }/>
            </Col>
        </Row>
        <Row>
            <Col xs='12' sm='6'>
              <PrintOption onChange={ this.handlers.onPrintPinyinChange } value={ this.props.printPinyin } label={ '打印拼音' } id={ 'pringPinyin' }/>
            </Col>
            <Col xs='12' sm='6'>
              <PrintOption onChange={ this.handlers.onPrintStrokesChange } value={ this.props.printStrokes } label= { '打印笔顺' } id={ 'pringStrokes' }/>
            </Col>
        </Row>
        <Row>
            <Col>
                <NewChar onChange={ this.handlers.onNewChar }/>
            </Col>
        </Row>
        <CharList chars={ this.props.chars }/>
        <Email onChange={ this.handlers.onEmailChange } value={ this.props.email }/>
        <Row>
          <Col sm={{size: 'auto', offset: 5}} >
            <Button className='center-block' onClick={ e => { this.handlers.onSubmit(this.props.state) } }>提交</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    charsPerRow: state.options.get('charsPerRow'),
    gridsPerRow: state.options.get('gridsPerRow'),
    gridFormat: state.options.get('gridFormat'),
    printPinyin: state.options.get('printPinyin'),
    printStrokes: state.options.get('printStrokes'),
    email: state.options.get('email'),
    chars: state.chars,
    state
  }
}

export default connect(mapStateToProps)(GridForm)
