import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions/auth';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message
  }
}

export default connect(mapStateToProps, { fetchMessage })(Feature);