import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { deleteChar } from '../actions'

const EditChar = ({chars, dispatch}) => (
  <Container>
    {chars.map((char, index) =>
      <Row>
        <Col>
          <p key={index}>
            {char}
            <button onClick={ e => { dispatch(deleteChar(index)) } }>X</button>
          </p>
        </Col>
      </Row>
    )}
  </Container>
)

function mapStateToProps(chars) {
  return {
    chars
  }
}

export default connect(mapStateToProps)(EditChar)
