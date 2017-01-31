import Formsy from 'formsy-react'
import React, {Component, PropTypes} from 'react'
import { Row, ComponentMixin } from 'formsy-react-components'
import { Button } from 'react-bootstrap'
const OptionButtonGroup = React.createClass({
  mixins: [Formsy.Mixin, ComponentMixin ],

  handleChange(e) {
    e.preventDefault()
    this.setValue(e.target.value)
  },

  render() {
    const controls = this.props.options.map((option, key) => {
        let active = (this.getValue() === option.value);
        let disabled = option.disabled || this.props.disabled;
        return (
          <Button key={ key } className="btn btn-secondary btn-md" onClick={ this.handleChange } value={ option.value } active={ active } >{ option.label }</Button>
        )
    })

    return (
      <Row {...this.props} fakeLabel={true}>
        <div className='btn-group'>{ controls }</div>
        { this.renderHelp() }
        { this.renderErrorMessage() }
      </Row>
    )
  }
})

export default OptionButtonGroup
