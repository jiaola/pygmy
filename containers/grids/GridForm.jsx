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
import Loader from 'react-loader-advanced'

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
      dispatch(actions.addChars(chars))
      //dispatch(actions.fetchPinyin(chars))
      e.target.value = ''
    }
  }

  let onSubmit = function(state) {
    dispatch(actions.submitGrid(state.grids))
  }

  let onReset = function() {
    dispatch(actions.resetGrid())
  }

  return {
    onCharsPerRowChange,
    onEmailChange,
    onFormatChange,
    onGridsPerRowChange,
    onPrintPinyinChange,
    onPrintStrokesChange,
    onNewChar,
    onSubmit,
    onReset
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
        <Loader show={ !this.props.gridsCreated } message={ 'loading' }>
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
              <Loader show={ !this.props.charsLoaded }  message={ 'loading' }>
                <NewChar onChange={ this.handlers.onNewChar }/>
                <CharList chars={ this.props.chars }/>
              </Loader>
            </Col>
        </Row>
        <Row>
          <Col>
            <Email onChange={ this.handlers.onEmailChange } value={ this.props.email }/>
          </Col>
        </Row>
        <Row>
          <Col sm={{size: 'auto', offset: 5}} >
            <Button className='center-block' onClick={ e => this.handlers.onSubmit(this.props.state) }>提交</Button>
            <Button className='center-block' onClick={ this.handlers.onReset }>取消</Button>
          </Col>
        </Row>
        </Loader>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    charsPerRow: state.grids.get('charsPerRow'),
    gridsPerRow: state.grids.get('gridsPerRow'),
    gridFormat: state.grids.get('gridFormat'),
    printPinyin: state.grids.get('printPinyin'),
    printStrokes: state.grids.get('printStrokes'),
    email: state.grids.get('email'),
    gridsCreated: state.grids.get('gridsCreated'),
    chars: state.grids.get('chars'),
    charsLoaded: state.grids.get('charsLoaded'),
    state
  }
}

export default connect(mapStateToProps)(GridForm)
