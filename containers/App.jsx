import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Grid, Row, Col, FormGroup, Button, Label, Input } from 'react-bootstrap'
import NavigationBar from '../components/shared/NavigationBar'

const App = ({ children }) => (
  <div>
    <NavigationBar/>
    <Grid style={{ marginTop: '62px' }}>{ children }</Grid>
  </div>
)

export default App
