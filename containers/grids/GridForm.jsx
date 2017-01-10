import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'
import Loader from 'react-loader-advanced'

import CharsField from '../../components/shared/CharsField'
import NumberField from '../../components/grids/NumberField'
import Email from '../../components/grids/Email'
import GridFormat from '../../components/grids/GridFormat'
import Alerts from '../../components/shared/Alerts'
import PrintOption from '../../components/grids/PrintOption'
import CharList from '../../components/grids/CharList'

import * as actions from '../../actions/gridActions'
import { deleteErrors, deleteMessages } from '../../actions/index'
import GridActionTypes from '../../actions/GridActionTypes'

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

  let onAddChars = function(chars) {
    dispatch(actions.addChars(chars))
  }

  let onDeleteChars = function() {
    dispatch(actions.deleteChars())
  }

  let onSubmit = function(grids) {
    dispatch(actions.submitGrid(grids))
  }

  let onReset = function() {
    dispatch(actions.resetGrid())
  }

  let onErrorsDismiss = function() {
    dispatch(deleteErrors(GridActionTypes.DELETE_ERRORS))
  }

  let onMessagesDismiss = function() {
    dispatch(deleteMessages(GridActionTypes.DELETE_MESSAGES))
  }

  return {
    onCharsPerRowChange,
    onEmailChange,
    onFormatChange,
    onGridsPerRowChange,
    onPrintPinyinChange,
    onPrintStrokesChange,
    onAddChars,
    onDeleteChars,
    onSubmit,
    onReset,
    onErrorsDismiss,
    onMessagesDismiss
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
        <Row><Col><Alerts type='danger' messages={ this.props.grids.get('errors') } onDismiss={ this.handlers.onErrorsDismiss }/></Col></Row>
        <Row><Col><Alerts type='info' messages={ this.props.grids.get('messages') } onDismiss={ this.handlers.onMessagesDismiss }/></Col></Row>
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
                <CharsField onAddChars={ this.handlers.onAddChars } onDeleteChars={ this.handlers.onDeleteChars }/>
                <CharList chars={ this.props.chars } />
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
            <Button className='center-block' onClick={ e => this.handlers.onSubmit(this.props.grids) }>提交</Button>
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
    grids: state.grids
  }
}

export default connect(mapStateToProps)(GridForm)
