import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-advanced'
import DocumentTitle from 'react-document-title'
import { submitGridForm } from '../../actions/gridActions'
import { deleteErrors, deleteMessages } from '../../actions/sharedActions'
import GridActionTypes from '../../actions/GridActionTypes'
import GridForm from '../../components/grids/GridForm'
import Alerts from '../../components/shared/Alerts'

class GridPage extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = (options, chars) => {
    this.props.dispatch(submitGridForm(options, chars))
  }

  onErrorsDismiss = () => {
    this.props.dispatch(deleteErrors(GridActionTypes.DELETE_ERRORS))
  }

  onMessagesDismiss = () => {
    this.props.dispatch(deleteMessages(GridActionTypes.DELETE_MESSAGES))
  }

  render() {
    return (
      <DocumentTitle title='田字格'>
        <Grid>
          <Row><Col><h1>田字格</h1><hr/></Col></Row>
          <Row><Col><Alerts type='danger' messages={ this.props.errors } onDismiss={ this.onErrorsDismiss }/></Col></Row>
          <Row><Col><Alerts type='info' messages={ this.props.messages } onDismiss={ this.onMessagesDismiss }/></Col></Row>
          <Loader show={ this.props.loading } message={ 'loading' }>
            <GridForm submitForm={ this.onSubmit }/>
          </Loader>
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    errors: state.grids.get('errors'),
    messages: state.grids.get('messages'),
    loading: state.grids.get('loading'),
  }
}

export default connect(mapStateToProps)(GridPage)
