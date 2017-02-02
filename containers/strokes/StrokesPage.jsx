import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import Loader from 'react-loader-advanced'
import DocumentTitle from 'react-document-title'

import Alerts from '../../components/shared/Alerts'
import StrokesEditor from '../../components/strokes/StrokesEditor'

import { deleteErrors, deleteMessages } from '../../actions/sharedActions'
import { submitSort } from '../../actions/strokesActions'
import StrokesActionTypes from '../../actions/StrokesActionTypes'

class StrokesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (strokes, order) => {
    this.props.dispatch(submitSort(strokes, order))
  }

  onErrorsDismiss = () => {
    this.props.dispatch(deleteErrors(StrokesActionTypes.STROKES))
  }

  onMessagesDismiss = () => {
    this.props.dispatch(deleteMessages(StrokesActionTypes.STROKES))
  }

  render() {
    return (
      <DocumentTitle title={`笔顺编辑`}>
        <Grid>
          <Row><Col><h1>笔顺</h1><hr/></Col></Row>
          <Row><Col><Alerts type='danger' messages={ this.props.errors } onDismiss={ this.onErrorsDismiss }/></Col></Row>
          <Row><Col><Alerts type='info' messages={ this.props.messages } onDismiss={ this.onMessagesDismiss }/></Col></Row>
          <Loader show={ this.props.loading } message='Submitting'>
            <StrokesEditor onSubmit={ this.onSubmit }/>
          </Loader>
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    errors: state.strokes.get('errors'),
    messages: state.strokes.get('messages'),
    loading: state.strokes.get('loading'),
  }
}

export default connect(mapStateToProps)(StrokesPage)
