import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'

import Alerts from '../../components/shared/Alerts'
import { WRITER } from '../../actions/ActionTypes'
import StorkesWriter from '../../components/writer/StrokesWriter'

class WriterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onErrorsDismiss = () => {
    this.props.dispatch(deleteErrors(WRITER))
  }

  onMessagesDismiss = () => {
    this.props.dispatch(deleteMessages(WRITER))
  }

  render() {
    return (
      <DocumentTitle title={`写字`}>
        <Grid>
          <Row><Col><h1>写字</h1><hr/></Col></Row>
          <Row><Col><Alerts type='danger' messages={ this.props.writer.get('errors') } onDismiss={ this.onErrorsDismiss }/></Col></Row>
          <Row><Col><Alerts type='info' messages={ this.props.writer.get('messages') } onDismiss={ this.onMessagesDismiss }/></Col></Row>
          <StorkesWriter />
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state){
  return {
    writer: state.writer
  }
}

export default connect(mapStateToProps)(WriterPage)
