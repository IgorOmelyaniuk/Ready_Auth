import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if (this.props.auth) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign out</Link>
        </li>
      )
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign in</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign up</Link>
        </li>
      ]
    }
  }
  
  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <Link to="/feature" className="navbar-brand">Feature</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.authenticated
  }
}

export default connect(mapStateToProps, null)(Header)