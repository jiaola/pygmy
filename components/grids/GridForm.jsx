import React, { PropTypes } from 'react'
import { Container, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap'
import { Form, Checkbox, CheckboxGroup, Input, RadioGroup, Select, File, Textarea } from 'formsy-react-components'
import Loader from 'react-loader-advanced'

import OptionButtonGroup from '../shared/OptionButtonGroup'
import CharsList from '../../containers/grids/CharsList'
import CharsField from '../../components/shared/CharsField'

const gridFormatOptions = [
  { value: 'field', label: '田字' },
  { value: 'rice', label: '米字' },
  { value: 'blank', label: '空白'},
]

const booleanOptions = [
  { value: 'true', label: '是'},
  { value: 'false', label: '否'},
]

class GridForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onAddChars = () => {

  }

  onDeleteChars = () => {

  }

  onSubmitForm = (options) => {
    let chars = this.charsList.getChars()
    this.props.submitForm(options, chars)
  }

  onResetForm = () => {
    const formsy = this.form.refs.formsy;
    formsy.reset();
    this.charsList.reset();
  }

  onKeyPress = (e) => {
      if (e.which === 13 /* Enter */) {
        e.preventDefault();
      }
  }

  render() {
    return (
      <Form
        onValidSubmit={ this.onSubmitForm }
        layout='vertical'
        validateOnSubmit={ true }
        validatePristine={ false }
        // disabled={ disabledChoice }
        ref={(form) => { this.form = form; }}
        onKeyPress={ this.onKeyPress }
      >
        <Loader show={ false } message={ 'Loading' }>
          <Row>
            <Col xs={6} sm={3}>
              <Input id='charsPerRow' type='number' name='chars_per_row' validations='isNumeric' help='每行生字的个数' label='每行生字数' layout='vertical' value='3' required/>
            </Col>
            <Col xs={6} sm={3}>
              <Input id='gridsPerRow' type='number' name='grids_per_row' validations='isNumeric' help='每行田字格格数' label='每行格数' layout='vertical' value='15' required/>
            </Col>
            <Col xs={12} sm={6}>
              <Input id='email' value='' label="电子邮箱地址"
                placeholder='请填写您的邮箱地址' help='生成的PDF文件会发送到该邮箱里' name='email' validations='isEmail' validationErrors={{
                  isEmail: 'This needs to be a valid email address.'
                }} type='text' layout="vertical" required/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={3}>
              <OptionButtonGroup name='print_pinyin' value='true' label='打印拼音' help='打印拼音' layout='vertical' options={ booleanOptions } />
            </Col>
            <Col xs={6} sm={3}>
              <OptionButtonGroup name='print_strokes' value='true' label='打印笔顺' help='打印笔顺' layout='vertical' options={ booleanOptions } />
            </Col>
            <Col xs={12} sm={6}>
              <OptionButtonGroup name='grid_format' value='field' label='生字格格式' help='生字格的格式' layout='vertical' options={ gridFormatOptions } />
            </Col>
          </Row>
          <Row>
              <Col>
                <FormGroup>
                  <CharsList ref={ (c) => { this.charsList = c } }/>
                </FormGroup>
              </Col>
          </Row>
          <Row>
            <Col xs={7} xsOffset={5}>
              <FormGroup>
                <input className="btn btn-default" onClick={this.onResetForm} type="reset" defaultValue="重设" />
                {' '}
                <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="提交" />
              </FormGroup>
            </Col>
          </Row>
        </Loader>
        <Row>
          <Col>

          </Col>
        </Row>
      </Form>
    )
  }
}

GridForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

export default GridForm
