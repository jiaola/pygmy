import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Label } from 'reactstrap'
import { deleteChar } from '../actions'

function string_as_unicode_escape(input) {
    function pad_four(input) {
        var l = input.length;
        if (l == 0) return '0000';
        if (l == 1) return '000' + input;
        if (l == 2) return '00' + input;
        if (l == 3) return '0' + input;
        return input;
    }
    var output = '';
    for (var i = 0, l = input.length; i < l; i++)
        output += '\\u' + pad_four(input.charCodeAt(i).toString(16));
    return output;
}

const EditChar = ({ chars, dispatch }) => (
  <Container>
    {chars.map((char, index) =>
      <Row key={index}>
        <Col sm='2'><Label>{char.get('character')}</Label></Col>
        <Col sm='2'></Col>
        <Col sm='8'>
          <button type='button' className='btn btn-secondary btn-sq-sm' onClick={ e => { dispatch(deleteChar(index)) } }>
            <span className="fa fa-remove fa-sm" aria-hidden="true"></span>
          </button>
        </Col>
      </Row>
    )}
  </Container>
)

const mapStateToProps = (state) => {
  return {
    chars: state.chars
  }
}

export default connect(mapStateToProps)(EditChar)
