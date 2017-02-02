import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'

import TyposMaker from '../../components/typos/TyposMaker'
import Alerts from '../../components/shared/Alerts'

class TyposPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onErrorsDismiss = () => {
    this.props.dispatch(deleteErrors(StrokesActionTypes.TYPOS))
  }

  onMessagesDismiss = () => {
    this.props.dispatch(deleteMessages(StrokesActionTypes.TYPOS))
  }
  render() {
    return (
      <DocumentTitle title={`错字`}>
        <Grid>
          <Row><Col><h1>错别字</h1><hr/></Col></Row>
          <Row><Col><Alerts type='danger' messages={ this.props.errors } onDismiss={ this.onErrorsDismiss }/></Col></Row>
          <Row><Col><Alerts type='info' messages={ this.props.messages } onDismiss={ this.onMessagesDismiss }/></Col></Row>          <TyposMaker />
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    errors: state.strokes.get('errors'),
    messages: state.strokes.get('messages'),
  }
}

export default connect(mapStateToProps)(TyposPage)
