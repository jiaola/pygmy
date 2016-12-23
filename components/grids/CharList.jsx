import React from 'react'
import { Container } from 'reactstrap'
import CharEditor from './CharEditor'

const CharList = ({ chars }) => (
  <Container>
    {chars.map((char, index) =>
      <CharEditor index={ index } key={ index } char={ char }/>
    )}
  </Container>
)

export default CharList
