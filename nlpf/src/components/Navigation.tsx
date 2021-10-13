import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../logo.svg';

function Navigation(props: any) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              className="App-logo"
              src="https://clipartart.com/images/country-house-clipart-2.png"
              alt=""
            />
            <p>
              SeDéloger.com
            </p>
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  /* eslint-disable-next-line */
                  props.location.pathname === '/' ? 'active' : ''
                }`}
              >
                <Link className="nav-link" to="/">
                  Accueil
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  /* eslint-disable-next-line */
                  props.location.pathname === '/about' ? 'active' : ''
                }`}
              >
                <Link className="nav-link" to="/about">
                  A propos
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  /* eslint-disable-next-line */
                  props.location.pathname === '/formsearch' ? 'active' : ''
                }`}
              >
                <Link className="nav-link" to="/formsearch">
                  Evaluation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
