import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const toString = (m) => {
  if (typeof m === 'string') {
    return m
  } else if (m.hasOwnProperty('message')) {
    return m.message
  } else {
    return m.toString()
  }
}

class Alerts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let element = null
    if (!this.props.messages.isEmpty()) {
      element = (
        <Alert bsStyle={ this.props.type } onDismiss={ this.props.onDismiss }>
          <ul style={ { marginBottom: 0 } }>
          { this.props.messages.map((m, i) =>
            <li key={i}>{ toString(m) }</li>
          )}
          </ul>
        </Alert>
      )
    }
    return (
      element
    )
  }
}

Alerts.propTypes = {
  type: PropTypes.string,
  messages: PropTypes.object,
  onDismiss: PropTypes.func.isRequired,
}

export default Alerts
