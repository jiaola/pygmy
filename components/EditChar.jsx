import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import { deleteChar } from '../actions'

const EditChar = ({ chars, dispatch }) => (
  <Container>
    {chars.map((char, index) =>
      <Row>
        <Col>
          <span key={index}>
            {char}
          </span>
          <button type='button' className='btn btn-secondary' onClick={ e => { dispatch(deleteChar(index)) } }>
            <span className="fa fa-remove fa-lg" aria-hidden="true"/>
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
