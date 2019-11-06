import React from 'react';
import { Link } from 'react-router-dom';

class AuthNav extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="left">
          <Link className="logo" to='/'>
            <img src={require('./slack.jpg')} />
            IMAGE TBD
          </Link>
        </div>
        <div className="right">
          <Link className="auth-nav-link" to="/tbd">Product</Link>
          <Link className="auth-nav-link" to="/tbd">Pricing</Link>
          <Link className="auth-nav-link" to="/tbd">Support</Link>
          <Link className="auth-nav-link" to="/tbd">Create a new workspace</Link>
          <Link className="auth-nav-link" to="/tbd">Find your workspace</Link>
          <Link id="auth-signin" to='/signin'>Sign In</Link>
        </div>
      </div>
    )
  }
}

export default AuthNav;