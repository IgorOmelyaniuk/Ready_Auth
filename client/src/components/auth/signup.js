import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      )
    }
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;
    return (
      <fieldset className={className}>
        <label>{field.label}</label>
        <input {...field.input} type={field.type} className="form-control"/>
        <div className="text-help">{touched ? error : ''}</div>
      </fieldset>
    )
  }

  render() {
    return (
      <div>
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
          <Field
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            component={this.renderField}
          />
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Password must match';
  }

  if (!values.email) {
    errors.email = 'Enter a email'
  }

  if (!values.password) {
      errors.password = 'Enter a password'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Enter a password'
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, { signupUser })(Signup)
)
