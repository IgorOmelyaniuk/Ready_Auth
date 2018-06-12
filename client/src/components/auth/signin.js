import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions/auth';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      )
    }
  }

  renderField(field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}</label>
        <input {...field.input} type={field.type} className="form-control"/>
      </fieldset>
    )
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          type="text"
          component={this.renderField}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, { signinUser })(Signin)
)