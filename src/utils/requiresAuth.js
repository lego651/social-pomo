import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool,
      redirect: PropTypes.func.isRequired
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { authenticated } = this.props;
      // console.log('1 is called...');

      if (!authenticated) {
        // console.log('2 is called...');
        this.props.redirect();
      }
    }

    render() {
      return (
        <div>
          { this.props.authenticated ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.user.authenticated
    };
  };


  const mapDispatchToProps = (dispatch) => ({
    redirect: () => { window.location.href = '/login' }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
