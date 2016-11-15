import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import CharEditor from './CharEditor'

const CharList = ({ chars, dispatch }) => (
  <Container>
    {chars.map((char, index) =>
      <CharEditor index={index} key={index} />
    )}
  </Container>
)

const mapStateToProps = (state) => {
  return {
    chars: state.chars
  }
}

export default connect(mapStateToProps)(CharList)
