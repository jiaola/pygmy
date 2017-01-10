import React, { PropTypes } from 'react'
import { Alert } from 'reactstrap'

class Alerts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Alert color={ this.props.type } isOpen={ !this.props.messages.isEmpty() } toggle={ this.props.onDismiss }>
        <ul style={ { marginBottom: 0 } }>
        { this.props.messages.map((m, i) =>
          <li key={i}>{m.message}</li>
        )}
        </ul>
      </Alert>
    )
  }
}

Alerts.propTypes = {
  type: PropTypes.string,
  messages: PropTypes.object,
  onDismiss: PropTypes.func
}

export default Alerts
