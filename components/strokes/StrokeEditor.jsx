import React from 'react'
import { connect } from 'react-redux'
import StrokePainter from './StrokePainter'
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap'

const StrokeEditor = ({}) => (
  <Row><StrokePainter/></Row>
)

export default StrokeEditor
